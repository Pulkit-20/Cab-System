import React, { useState } from "react";
import { TextField, Button, Grid, Typography, MenuItem } from "@mui/material";
import CabTypeDropdown from "./CabTypeDropdown";

const BookingCab = () => {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("now");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedCab, setSelectedCab] = useState("");

  const handleBookingSubmit = () => {
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Book a Cab</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          label="Schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          fullWidth
        >
          <MenuItem value="now">Book Now</MenuItem>
          <MenuItem value="later">Schedule for Later</MenuItem>
        </TextField>
      </Grid>
      {schedule === "later" && (
        <Grid item xs={12}>
          {/* Date and time picker for scheduling */}
          {/* Implement using Material-UI DatePicker and TimePicker */}
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          label="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <CabTypeDropdown
          selectedCab={selectedCab}
          setSelectedCab={setSelectedCab}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookingSubmit}
        >
          Book Cab
        </Button>
      </Grid>
    </Grid>
  );
};

export default BookingCab;
