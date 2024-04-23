import React from "react";
import { Outlet, BrowserRouter as Router, Route } from "react-router-dom";
import RecruiterSidebar from "../layout/sidebar/RecruiterSidebar";

import DashboardManager from "../manager/DashboardManager ";
import "./MainManager.scss";

export const MainManager: React.FC = () => {
  return (
    <div className="mainmanager">
      <RecruiterSidebar userName="John Doe" />
      <div className="main-container">
        {/* <DashboardManager /> */}
        <Outlet />
      </div>
    </div>
  );
};
