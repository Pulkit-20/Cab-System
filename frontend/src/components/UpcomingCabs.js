import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { format } from "date-fns"; // Import format function from date-fns

const UpcomingCabs = () => {
  const [ongoingRides, setOngoingRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/book/track");
        setOngoingRides(response.data.ongoingRides);
        setCompletedRides(response.data.completedRides);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to format the date and time
  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "yyyy-MM-dd HH:mm:ss");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ongoing Rides
      </Typography>
      {ongoingRides.map((ride, index) => (
        <Card key={index} sx={{ display: "flex", mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 140, flexShrink: 0 }}
            image={ride.cabPic}
            alt="Cab"
          />
          <CardContent>
            <Stack direction="row" spacing={2} mb={1}>
              <Typography variant="body2" color="text.secondary">
                {`${ride.startLocation} to ${ride.endLocation}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${formatDateTime(ride.startTime)} - ${formatDateTime(
                  ride.endTime
                )}`}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Passenger: {ride.passengerName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cab Name: {ride.cabType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cab Price: {ride.cabPrice}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" gutterBottom>
        Completed Rides
      </Typography>
      {completedRides.map((ride, index) => (
        <Card key={index} sx={{ display: "flex", mb: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 140, flexShrink: 0 }}
            image={ride.cabPic}
            alt="Cab"
          />
          <CardContent>
            <Stack direction="row" spacing={2} mb={1}>
              <Typography variant="body2" color="text.secondary">
                {`${ride.startLocation} to ${ride.endLocation}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${formatDateTime(ride.startTime)} - ${formatDateTime(
                  ride.endTime
                )}`}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Passenger: {ride.passengerName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cab Name: {ride.cabType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cab Price: {ride.cabPrice}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UpcomingCabs;
