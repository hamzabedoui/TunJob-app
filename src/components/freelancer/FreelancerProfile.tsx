import React from "react";
import { useSelector } from "react-redux";
import { Typography, Paper, Avatar, Button } from "@mui/material";
import "../manager/ProfileStyle.scss"; // Import the SCSS file

const FreelancerProfile: React.FC<any> = ({ userName, userAvatar }: { userName: string; userAvatar?: string; }) => {
  const { userInfos } = useSelector((store: any) => store.login);
  const handleEditProfile = () => {
    console.log("edit profile");
    
  };

  return (
    <Paper elevation={3} className="manager-profile-container">
      <Typography variant="h5" className="profile-heading">Profile</Typography>
      <div className="profile-info">
      <Avatar
          alt={userName}
          src={userAvatar}
          className="UserProfileAvatar"
          sx={{ width: "8rem", height: "8rem" }} // Adjust the size here
        /> 
        <Typography variant="body1" className="info-item">
          <span className="info-label">Username:</span> {userInfos.username}
        </Typography>
        <Typography variant="body1" className="info-item">
          <span className="info-label">Email:</span> {userInfos.email}
        </Typography>
        <Typography variant="body1" className="info-item">
          <span className="info-label">User Type:</span> Freelancer
        </Typography>
        <>
          <Typography variant="body1" className="info-item">
            <span className="info-label">Job Title:</span> {userInfos.jobTitle}
          </Typography>
          <Typography variant="body1" className="info-item">
            <span className="info-label">Academic Level:</span> {userInfos.academicLevel}
          </Typography>
          <Typography variant="body1" className="info-item">
            <span className="info-label">Location:</span> {userInfos.location}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleEditProfile}>Edit Profile</Button>
        </>
      </div>
    </Paper>
  );
};

export default FreelancerProfile;
