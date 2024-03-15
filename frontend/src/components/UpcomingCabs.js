import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const UpcomingCabs = () => {
  const [ongoingRides, setOngoingRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/book/track");
        setOngoingRides(response.data.ongoingRides);
        setCompletedRides(response.data.completedRides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ongoing Rides
      </Typography>
      {ongoingRides.map((ride, index) => (
        <Card key={index} sx={{ border: "2px solid blue", mb: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Cab Timing: {ride.bookingDateTime} - {ride.endTime}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" gutterBottom>
        Completed Rides
      </Typography>
      {completedRides.map((ride, index) => (
        <Card key={index} sx={{ border: "2px solid green", mb: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Cab Timing: {ride.bookingDateTime} - {ride.endTime}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UpcomingCabs;
