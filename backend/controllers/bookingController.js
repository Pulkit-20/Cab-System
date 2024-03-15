const Passenger = require("../models/passengerModel");
const Booking = require("../models/bookingModel");
const Location = require("../models/locationModel");
const Cab = require("../models/cabModel");
const CabSchedule = require("../models/cabScheduleModel");

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  peek() {
    return this.queue[0];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.sort();
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.queue.shift();
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

async function dijkstra(sourceLocationId, destinationLocationId) {
  const sourceLocation = await Location.findById(sourceLocationId);
  const destinationLocation = await Location.findById(destinationLocationId);

  if (!sourceLocation || !destinationLocation) {
    throw new Error("Source or destination location not found");
  }
  // Initialize distance map and visited set
  const distances = new Map();
  const visited = new Set();

  distances.set(sourceLocationId.toString(), 0);
  // Priority queue to keep track of nodes with minimum distance
  const queue = new PriorityQueue();
  queue.enqueue(sourceLocationId.toString(), 0);

  while (!queue.isEmpty()) {
    const { element: currentLocationId, priority: currentDistance } =
      queue.dequeue();
    const currentLocation = await Location.findById(currentLocationId);
    if (visited.has(currentLocationId)) {
      continue;
    }
    if (currentLocationId === destinationLocationId.toString()) {
      // Found the destination location, return the shortest path and total travel time
      return { shortestPath: [], totalTravelTime: currentDistance };
    }

    visited.add(currentLocationId);

    // Iterate through neighbors of the current location
    for (const neighbor of currentLocation.adjacencyList) {
      const neighborName = neighbor.adjLocationName;

      // Find the corresponding location ID for the neighbor name
      const neighborLocation = await Location.findOne({
        locationName: neighborName,
      });
      if (!neighborLocation) {
        throw new Error(`Location not found for name: ${neighborName}`);
      }
      const neighborId = neighborLocation._id.toString();

      // Calculate distance to the neighbor
      const distanceToNeighbor = currentDistance + neighbor.timeInMinutes;

      // Update distance if shorter path found
      if (
        !distances.has(neighborId) ||
        distanceToNeighbor < distances.get(neighborId)
      ) {
        distances.set(neighborId, distanceToNeighbor);
        queue.enqueue(neighborId, distanceToNeighbor);
      }
    }
  }

  throw new Error("No path found between source and destination locations");
}

// Function to calculate estimated cost based on travel time and cab pricing
function calculateEstimatedCost(travelTime, cabPricePerMinute) {
  return travelTime * cabPricePerMinute;
}

async function isCabAvailable(
  cabId,
  startTime,
  endTime,
  sourceLocationId,
  destinationLocationId
) {
  try {
    console.log("Checking cab availability...");
    console.log("Cab ID:", cabId);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Source Location ID:", sourceLocationId);
    console.log("Destination Location ID:", destinationLocationId);

    // Find all bookings of the cab that overlap with the provided time slot
    const overlappingSchedules = await CabSchedule.find({
      cabId: cabId,
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
      ],
    });

    console.log("Overlapping Schedules:", overlappingSchedules);

    if (overlappingSchedules.length > 0) {
      console.log("Cab is not available due to overlapping schedules.");
      return false; // Cab is not available due to overlapping schedules
    }

    // Find the current location of the cab
    const cabSchedule = await CabSchedule.findOne({ cabId }).sort({
      startTime: -1,
    });

    if (!cabSchedule) {
      // If no cab schedule is found, assume the cab is available
      console.log("Cab is available.");
      return true;
    }

    // Calculate the time required to reach the source location
    const travelTimeToSource = await dijkstra(
      cabSchedule.destinationLocationId,
      sourceLocationId
    );

    console.log("Travel time to source:", travelTimeToSource);

    const timeToReachSource = new Date(
      cabSchedule.endTime.getTime() + travelTimeToSource.totalTravelTime * 60000
    );

    if (timeToReachSource > startTime) {
      console.log("Cab cannot reach the source location in time.");
      return false; // Cab cannot reach the source location in time
    }

    // Calculate the time required to reach the destination location from the source location
    const travelTimeToDestination = await dijkstra(
      sourceLocationId,
      destinationLocationId
    );

    console.log("Travel time to destination:", travelTimeToDestination);

    // Calculate the end time of the journey considering travel time
    const endTimeConsideringTravel = new Date(
      endTime.getTime() + travelTimeToDestination.totalTravelTime * 60000
    );
    console.log("End time considering travel:", endTimeConsideringTravel);

    if (endTimeConsideringTravel > endTime) {
      console.log("Cab cannot reach the destination location in time.");
      return false; // Cab cannot reach the destination location in time
    }

    console.log("Cab is available.");
    return true; // Cab is available
  } catch (error) {
    console.error("Error checking cab availability:", error);
    return false; // Error occurred, consider cab as unavailable
  }
}

async function trackCabs(req, res) {
  try {
    const rides = await Booking.find({});

    // Separate ongoing and completed rides
    const ongoingRides = [];
    const completedRides = [];
    const now = new Date();

    for (const ride of rides) {
      const passenger = await Passenger.findById(ride.passengerId);
      const startLocation = await Location.findById(ride.sourceLocation);
      const endLocation = await Location.findById(ride.destinationLocation);
      const cab = await Cab.findById(ride.cabId);

      const rideInfo = {
        passengerName: passenger.name,
        startLocation: startLocation.locationName,
        endLocation: endLocation.locationName,
        startTime: ride.bookingDateTime,
        endTime: ride.endTime,
        cabType: cab.cabType,
        cabPrice: cab.cabPrice,
        cabPic: cab.cabPic,
      };

      if (ride.endTime > now) {
        ongoingRides.push(rideInfo);
      } else {
        completedRides.push(rideInfo);
      }
    }

    res.json({ ongoingRides, completedRides });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving ride information", error: err });
  }
}



// Controller function to handle booking requests
async function bookCab(req, res) {
  const {
    passengerName,
    passengerEmail,
    sourceLocationId,
    destinationLocationId,
    cabId,
    startTime,
  } = req.body;
  
  let cab = await Cab.findOne({ _id: cabId });

  const cabPricePerMinute = cab.cabPrice;
  // Parse startTime from string to a Date object
  let parsedStartTime;
  try {
    parsedStartTime = new Date(startTime);
    if (isNaN(parsedStartTime)) throw new Error("Invalid startTime format");
  } catch (error) {
    console.error("Error parsing startTime:", error);
    return res.status(400).json({ message: "Invalid startTime format" });
  }

  try {
    // Check if passenger exists, create new passenger if not
    let passenger = await Passenger.findOne({ email: passengerEmail });
    if (!passenger) {
      passenger = await Passenger.create({
        name: passengerName,
        email: passengerEmail,
      });
    }

    // Calculate the total travel time using Dijkstra's algorithm
    const { totalTravelTime } = await dijkstra(
      sourceLocationId,
      destinationLocationId
    );

    // Calculate the end time based on the start time and total travel time
    const parsedEndTime = new Date(
      parsedStartTime.getTime() + totalTravelTime * 60000
    ); // Convert total travel time to milliseconds

    // Perform availability check for the cab
    const isAvailable = await isCabAvailable(
      cabId,
      parsedStartTime,
      parsedEndTime,
      sourceLocationId,
      destinationLocationId
    );

    if (!isAvailable) {
      return res.status(400).json({
        message: "Selected cab is not available for the given time slot.",
      });
    }

    // Calculate the estimated cost based on the total travel time and cab pricing
    const estimatedCost = calculateEstimatedCost(
      totalTravelTime,
      cabPricePerMinute
    );

    // Create a new booking instance
    const newBooking = new Booking({
      passengerId: passenger._id,
      sourceLocation: sourceLocationId,
      destinationLocation: destinationLocationId,
      travelTime: totalTravelTime,
      estimatedCost,
      bookingDateTime: parsedStartTime, // Using parsedStartTime as bookingDateTime
      endTime: parsedEndTime, // Using calculated endTime
      cabId: cabId,
    });

    // Save the booking instance to the database
    await newBooking.save();

    // Update cab schedule
    const cabSchedule = new CabSchedule({
      cabId,
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      sourceLocationId,
      destinationLocationId,
    });
    await cabSchedule.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error booking cab:", error);
    res
      .status(500)
      .json({ message: "Error booking cab", error: error.message });
  }
}

module.exports = { bookCab, trackCabs };
