import React from "react";
import { TextField, MenuItem } from "@mui/material";

const CabTypeDropdown = ({ selectedCab, setSelectedCab }) => {
  const cabTypes = [
    {
      value: "type1",
      label: "Cab Type 1",
      pricePerMinute: 0.5,
      image: "url_to_image",
    },
    {
      value: "type2",
      label: "Cab Type 2",
      pricePerMinute: 0.6,
      image: "url_to_image",
    },
  ];

  return (
    <TextField
      select
      label="Select Cab Type"
      value={selectedCab}
      onChange={(e) => setSelectedCab(e.target.value)}
      fullWidth
    >
      {cabTypes.map((cab) => (
        <MenuItem key={cab.value} value={cab.value}>
          {cab.label} - ${cab.pricePerMinute.toFixed(2)}/min
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CabTypeDropdown;
