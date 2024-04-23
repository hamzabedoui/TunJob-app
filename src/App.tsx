import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { MainManager } from "../src/components/manager/MainManager";
import DashboardManager from "./components/manager/DashboardManager ";
import MainFreelancer from "./components/freelancer/MainFreelancer";
import FreelancerProfile from "./components/freelancer/FreelancerProfile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main-freelancer" element={<MainFreelancer />}>
            <Route
              path="/main-freelancer/profile"
              element={
                <FreelancerProfile
                  /* userType="F" */
                  username=""
                  email=""
                  jobTitle=""
                  academicLevel=""
                  location=""
                />
              }
            />
          </Route>
          <Route path="/main-manager" element={<MainManager />}>
            <Route
              path="/main-manager/dashboard"
              element={<DashboardManager />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
