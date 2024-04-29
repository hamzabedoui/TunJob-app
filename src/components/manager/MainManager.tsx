import React, { useEffect } from "react";
import {
  Outlet,
  BrowserRouter as Router,
  Route,
  useNavigate,
} from "react-router-dom";
import RecruiterSidebar from "../layout/sidebar/RecruiterSidebar";
import "./MainManager.scss";
import Cookies from "js-cookie";
import { getUserDetails } from "../../redux/features/LoginSlice";
import { useDispatch, useSelector } from "react-redux";

export const MainManager: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfos } = useSelector((store: any) => store.login);
  useEffect(() => {
    !Cookies.get("token") && navigate("/login");
    dispatch(getUserDetails());
  }, []);

  return (
    <div className="mainmanager">
      <RecruiterSidebar userName={userInfos?.username} />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};
