import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Snackbar,
} from "@mui/material";
import CabTypeDropdown from "./CabTypeDropdown";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StartLocationDropdown from "./dropdowns/StartLocationDropdown";
import dayjs from "dayjs";
import EndLocationDropdown from "./dropdowns/EndLocationDropdown";

const BookingCab = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schedule, setSchedule] = useState("");
  const [date, setDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedCab, setSelectedCab] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBookingSubmit = async () => {
    if (!name || !email || !startLocation || !endLocation || !selectedCab) {
      setErrorMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("Email is not valid.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passengerName: name,
          passengerEmail: email,
          sourceLocationId: startLocation,
          destinationLocationId: endLocation,
          cabId: selectedCab,
          startTime: date, // Example: current time
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book cab.");
      }

      // Reset form fields on successful booking
      setName("");
      setEmail("");
      setSchedule("now");
      setStartLocation("");
      setEndLocation("");
      setSelectedCab("");

      setOpenSnackbar(true);
      setErrorMessage("Booking successful.");
    } catch (error) {
      console.error("Error booking cab:", error);
      setOpenSnackbar(true);
      setErrorMessage("Failed to book cab.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate.toDate());
    console.log(newDate.toDate());
  }

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
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <MenuItem value="later" disabled={true}>Schedule for Later(Coming Soon)</MenuItem>
        </TextField>
      </Grid>
      {schedule === "later" && (
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Controlled picker"
                value={date}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      )}
      <Grid item xs={12}>
        <StartLocationDropdown
          startLocation={startLocation}
          setStartLocation={setStartLocation}
        />
      </Grid>
      <Grid item xs={12}>
        <EndLocationDropdown
          endLocation={endLocation}
          setEndLocation={setEndLocation}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Typography variant="body2">{errorMessage}</Typography>
      </Snackbar>
    </Grid>
  );
};

export default BookingCab;
