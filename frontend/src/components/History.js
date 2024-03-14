import React from "react";
import { Typography, Tabs, Tab } from "@mui/material";

const History = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Typography variant="h5">Booking History</Typography>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Completed" />
        <Tab label="Cancelled" />
      </Tabs>
      {/* Render appropriate history based on selected tab */}
      {/* Implement using Material-UI Table or Card components */}
    </div>
  );
};

export default History;
