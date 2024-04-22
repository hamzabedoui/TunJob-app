import React from "react";
import { Outlet, BrowserRouter as Router, Route } from "react-router-dom";
import RecruiterSidebar from "../layout/sidebar/RecruiterSidebar";

import DashboardManager from "../manager/DashboardManager ";

export const MainManager: React.FC = () => {
    return (
        <div className="mainmanager">
            <div>
                <RecruiterSidebar userName="John Doe" /> {/* Pass the user name */}
            </div>
            <div className="main-container">
                <DashboardManager />
                <Outlet />
            </div>
        </div>
     
  );
};


