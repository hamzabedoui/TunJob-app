import React from "react";
import FreelancerSidebar from "../layout/sidebar/FreelancerSidebar";
import { Outlet } from "react-router-dom";
import "./MainFreelancer.scss";
const MainFreelancer = () => {
  return (
    <div className="mainfreelancer">
      <FreelancerSidebar userName="hamza" />
      <div className="main-container">
        {/* <DashboardManager /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainFreelancer;
