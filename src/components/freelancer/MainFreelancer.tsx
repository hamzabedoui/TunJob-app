import React, { useEffect } from "react";
import FreelancerSidebar from "../layout/sidebar/FreelancerSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import "./MainFreelancer.scss";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/features/LoginSlice";
const MainFreelancer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfos } = useSelector((store: any) => store.login);
  useEffect(() => {
    !Cookies.get("token") && navigate("/login");
    dispatch(getUserDetails());
  }, []);
  return (
    <div className="mainfreelancer">
      <FreelancerSidebar userName={userInfos.username} />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainFreelancer;
