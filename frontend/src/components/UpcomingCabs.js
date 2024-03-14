import React from "react";
import { Tabs, Tab } from "@mui/material";

const UpcomingCabs = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Upcoming" />
        <Tab label="Ongoing" />
      </Tabs>
      {/* Render appropriate upcoming/ongoing cabs based on selected tab */}
      {/* Implement using Material-UI Cards or List components */}
    </div>
  );
};

export default UpcomingCabs;
