import * as React from "react";
import { Box, Tab, Typography } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import BookingCab from "./BookingCab";
import UpcomingCabs from "./UpcomingCabs";
import EditCabs from "./EditCabs";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        marginBottom: "40px",
        marginTop: "20px",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        marginBottom="10px"
        sx={{ color: "purple", fontFamily: "Comic Sans MS, sans-serif" }}
      >
        Cab-System
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Book Cab" value="1" />
            <Tab label="Track Cabs" value="2" />
            <Tab label="Cabs" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BookingCab />
        </TabPanel>
        <TabPanel value="2">
          <UpcomingCabs />
        </TabPanel>
        <TabPanel value="3">
          <EditCabs />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
