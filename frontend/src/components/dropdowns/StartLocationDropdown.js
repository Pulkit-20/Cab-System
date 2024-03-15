import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";

const StartLocationDropdown = ({ startLocation, setStartLocation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/location");
        if (Array.isArray(response.data)) {
          setLocations(response.data);
        } else {
          console.error("Invalid locations data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <TextField
      select
      label="Select Start Location"
      value={startLocation}
      onChange={(e) => setStartLocation(e.target.value)}
      fullWidth
    >
      {locations.map((location) => (
        <MenuItem key={location._id} value={location._id}>
          {location.locationName}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default StartLocationDropdown;
