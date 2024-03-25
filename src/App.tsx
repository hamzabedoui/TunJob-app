import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import FreelancerSidebar from "./components/layout/sidebar/FreelancerSidebar";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="dashboard-freelancer" element={<FreelancerSidebar userName="hamza"/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
