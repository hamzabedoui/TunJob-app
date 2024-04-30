import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { MainManager } from "../src/components/manager/MainManager";
import DashboardManager from "./components/manager/DashboardManager ";
import MainFreelancer from "./components/freelancer/MainFreelancer";
import FreelancerProfile from "./components/freelancer/FreelancerProfile";
import PostedJobs from "./components/manager/PostedJobs";
import SearchJob from "./components/freelancer/SearchJob";
import ManagerProfile from "./components/manager/ManagerProfile";

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
            <Route path="/main-freelancer/search-job" element={<SearchJob />} />
          </Route>
          <Route path="/main-manager" element={<MainManager />}>
            <Route
              path="/main-manager/dashboard"
              element={<DashboardManager />}
            />
            <Route path="/main-manager/posted-jobs" element={<PostedJobs />} />
            <Route path="/main-manager/profile" element={
                <ManagerProfile
                  /* userType="F" */
                  username=""
                  email=""
                  company=""
                />
              } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
