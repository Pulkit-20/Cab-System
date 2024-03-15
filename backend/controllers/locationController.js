const Location = require("../models/locationModel");

const addLocation = async (req, res) => {
  const { locationName, adjacencyList } = req.body;

  try {
    // Find the location or create it if it doesn't exist
    let location = await Location.findOne({ locationName: locationName });

    if (!location) {
      location = await Location.create({
        locationName: locationName,
        adjacencyList: [],
      });
    }

    for (const adjacency of adjacencyList) {
      const { adjLocationName, timeInMinutes } = adjacency;

      // Find the adjacent location
      const adjacentLocation = await Location.findOne({
        locationName: adjLocationName,
      });

      if (adjacentLocation) {
        // Update adjacency list for the current location
        const existingAdjacency = location.adjacencyList.find(
          (adj) => adj.adjLocationName === adjLocationName
        );
        if (existingAdjacency) {
          existingAdjacency.timeInMinutes = timeInMinutes;
        } else {
          location.adjacencyList.push({
            adjLocationName: adjLocationName,
            timeInMinutes: timeInMinutes,
          });
        }

        // Update adjacency list for the adjacent location
        const existingAdjacentAdjacency = adjacentLocation.adjacencyList.find(
          (adj) => adj.adjLocationName === locationName
        );
        if (existingAdjacentAdjacency) {
          existingAdjacentAdjacency.timeInMinutes = timeInMinutes;
        } else {
          adjacentLocation.adjacencyList.push({
            adjLocationName: locationName,
            timeInMinutes: timeInMinutes,
          });
        }

        // Save the adjacent location
        await adjacentLocation.save();
      } else {
        console.error(`Adjacent location '${adjLocationName}' not found`);
      }
    }

    // Save the current location
    await location.save();

    res.status(201).json({ message: "Location added successfully" });
  } catch (error) {
    console.error("Error adding location:", error);
    res
      .status(500)
      .json({ message: "Error adding location", error: error.message });
  }
};

module.exports = { addLocation };
