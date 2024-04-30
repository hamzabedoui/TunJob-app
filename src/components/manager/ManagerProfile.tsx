import React from "react";
import { useSelector } from "react-redux";
import { Typography, Paper, Avatar } from "@mui/material";
import { UserType } from "../../types/types";
import "../manager/ProfileStyle.scss"; // Import the SCSS file

const ManagerProfile: React.FC<any> = ({ userName, userAvatar }: { userName: string; userAvatar?: string; }) => {
  const { userInfos } = useSelector((store: any) => store.login);

  return (
    <Paper elevation={3} className="manager-profile-container">
      <Typography variant="h5" className="profile-heading">Profile</Typography>
      <div className="profile-info">
        <Avatar
          alt={userName}
          src={userAvatar}
          className="UserProfileAvatar"
          sx={{ width: "13rem", height: "13rem" }} // Adjust the size here
        /> 
        <Typography variant="body1" className="info-item">
          <span className="info-label">Username:</span> {userInfos.username}
        </Typography>
        <Typography variant="body1" className="info-item">
          <span className="info-label">Email:</span> {userInfos.email}
        </Typography>
        <Typography variant="body1" className="info-item">
          <span className="info-label">User Type:</span> Manager
        </Typography>
        <Typography variant="body1" className="info-item">
          <span className="info-label">Company:</span> {userInfos.company}
        </Typography>
      </div>
    </Paper>
  );
};

export default ManagerProfile;
