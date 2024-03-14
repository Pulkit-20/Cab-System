const Booking = require("../models/bookingModel");
const Location = require('../models/locationModel');


//Dijkstra's algorithm
async function dijkstra(sourceLocationId, destinationLocationId) {
  // Retrieve source and destination locations from the database
  const sourceLocation = await Location.findById(sourceLocationId);
  const destinationLocation = await Location.findById(destinationLocationId);

  if (!sourceLocation || !destinationLocation) {
    throw new Error("Source or destination location not found");
  }

  // Initialize distance map and visited set
  const distances = new Map();
  const visited = new Set();

  // Initialize distances with Infinity except for the source node
  distances.set(sourceLocationId.toString(), 0);

  // Priority queue to keep track of nodes with minimum distance
  const queue = new PriorityQueue();
  queue.enqueue(sourceLocationId.toString(), 0);

  while (!queue.isEmpty()) {
    const [currentLocationId, currentDistance] = queue.dequeue();

    if (currentLocationId === destinationLocationId.toString()) {
      // Found the destination location, return the shortest path and total travel time
      return { shortestPath: [], totalTravelTime: currentDistance };
    }

    if (visited.has(currentLocationId)) {
      continue;
    }

    visited.add(currentLocationId);

    // Iterate through neighbors of the current location
    for (const neighbor of sourceLocation.adjacencyList) {
      const neighborId = neighbor.locationId.toString();

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

// Controller function to handle booking requests
async function bookCab(req, res) {
  const {
    passengerName,
    passengerEmail,
    sourceLocationId,
    destinationLocationId,
    cabPricePerMinute,
  } = req.body;

  try {
    // Perform Dijkstra's algorithm to find shortest path and total travel time
    const { shortestPath, totalTravelTime } = await dijkstra(
      sourceLocationId,
      destinationLocationId
    );

    // Calculate estimated cost based on travel time and cab pricing
    const estimatedCost = calculateEstimatedCost(
      totalTravelTime,
      cabPricePerMinute
    );

    // Create a new booking instance
    const newBooking = new Booking({
      passengerName,
      passengerEmail,
      sourceLocation: sourceLocationId,
      destinationLocation: destinationLocationId,
      travelTime: totalTravelTime,
      estimatedCost,
    });

    // Save the booking instance to the database
    await newBooking.save();

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

module.exports = { bookCab };
