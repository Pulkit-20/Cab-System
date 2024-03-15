import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { Avatar, ListItemAvatar } from "@mui/material";

const CabTypeDropdown = ({ selectedCab, setSelectedCab }) => {
  const [cabTypes, setCabTypes] = useState([]);

  useEffect(() => {
    const fetchCabTypes = async () => {
      try {
        const response = await axios.get("/cab");
        if (Array.isArray(response.data)) {
          setCabTypes(response.data);
        } else {
          console.error("Invalid cab types data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cab types:", error);
      }
    };

    fetchCabTypes();
  }, []);

  return (
    <TextField
      select
      label="Select Cab Type"
      value={selectedCab}
      onChange={(e) => setSelectedCab(e.target.value)}
      fullWidth
    >
      {cabTypes.map((cab) => (
        <MenuItem key={cab._id} value={cab._id}>
          <ListItemAvatar>
            <Avatar alt={cab.cabType} src={cab.cabPic} />
          </ListItemAvatar>
          {cab.cabType} - ₹{cab.cabPrice.toFixed(2)}/min
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CabTypeDropdown;
