import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import CabTypeDropdown from "./CabTypeDropdown";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StartLocationDropdown from "./dropdowns/StartLocationDropdown";
// import dayjs from "dayjs";
import EndLocationDropdown from "./dropdowns/EndLocationDropdown";
import LinearProgress from "@mui/material/LinearProgress";

const BookingCab = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [schedule, setSchedule] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [selectedCab, setSelectedCab] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    if (!name || !email || !startLocation || !endLocation || !selectedCab) {
      setIsSubmitting(false);
      setErrorMessage("Please fill in all fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (!email.includes("@")) {
      setIsSubmitting(false);
      setErrorMessage("Email is not valid.");
      setSnackbarSeverity("error");
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
        }),
      });

      if (!response.ok) {
        setIsSubmitting(false);
        throw new Error("Failed to book cab.");
      }

      // Reset form fields on successful booking
      setName("");
      setEmail("");
      setSchedule("now");
      setStartLocation("");
      setEndLocation("");
      setSelectedCab("");
      setIsSubmitting(false);

      const message = `Dear ${name},

        Your booking has been confirmed. Here are the details of your cab:

        Passenger Name: ${name}

        Thank you for choosing our cab service. If you have any further questions or need assistance, feel free to contact us.

        Best regards,
        CritX Cab Services
        `;
      const emailResponse = await fetch("/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail: email,
          subject: "Booking Confirmation",
          message: message,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email.");
      }
      setOpenSnackbar(true);
      setErrorMessage("Booking successful.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error booking cab:", error);
      setOpenSnackbar(true);
      setErrorMessage("This Cab is not available for now.");
      setSnackbarSeverity("error");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <MenuItem value="later" disabled={true}>
            Schedule for Later(Coming Soon)
          </MenuItem>
        </TextField>
      </Grid>
      {
        schedule === "later"
        // <Grid item xs={12}>
        //   <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <DemoContainer components={["DateTimePicker"]}>
        //       <DateTimePicker
        //         label="Controlled picker"
        //         value={date}
        //         onChange={handleDateChange}
        //       />
        //     </DemoContainer>
        //   </LocalizationProvider>
        // </Grid>
      }
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
        autoHideDuration={8000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      {isSubmitting && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
    </Grid>
  );
};

export default BookingCab;
