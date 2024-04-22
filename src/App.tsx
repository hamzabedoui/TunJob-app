import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import FreelancerSidebar from "./components/layout/sidebar/FreelancerSidebar";
import RecruiterSidebar from "./components/layout/sidebar/RecruiterSidebar";
import { RegistrationData, UserType } from "./types/types";
import { MainManager } from "../src/components/manager/MainManager"
import DashboardManager from "./components/manager/DashboardManager ";
import MainFreelancer from "./components/freelancer/MainFreelancer";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainFreelancer" element={<MainFreelancer/>} />
          <Route path="/mainManager" element={<MainManager />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
