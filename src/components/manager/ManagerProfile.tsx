import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper, Typography, Avatar, Button, TextField } from "@mui/material";
import { updateUserProfile, resetProfileEditState } from "../../redux/features/ProfileEditSlice";
import "../manager/ProfileStyle.scss";

const ManagerProfile: React.FC<any> = ({ userName, userAvatar }: { userName: string; userAvatar?: string; }) => {
  const { userInfos } = useSelector((store: any) => store.login);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: userInfos.username,
    email: userInfos.email,
    company: userInfos.company
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Dispatch the action to update the profile with the editedProfile data
    // dispatch(updateUserProfile(editedProfile));
    setIsEditing(false); // Set isEditing back to false after saving
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  // Reset the profile edit state when the component unmounts
  React.useEffect(() => {
    return () => {
      dispatch(resetProfileEditState());
    };
  }, [dispatch]);

  return (
    <Paper elevation={3} className="manager-profile-container">
      <Typography variant="h5" className="profile-heading">Profile</Typography>
      <div className="profile-info">
        <Avatar
          alt={userName}
          src={userAvatar}
          className="UserProfileAvatar"
          sx={{ width: "13rem", height: "13rem" }}
        />
        {isEditing ? (
          <>
            <TextField
              name="username"
              label="Username"
              value={editedProfile.username}
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Email"
              value={editedProfile.email}
              onChange={handleInputChange}
            />
            <TextField
              name="company"
              label="Company"
              value={editedProfile.company}
              onChange={handleInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>Save Profile</Button>
          </>
        ) : (
          <>
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
            <Button variant="contained" color="primary" onClick={handleEditProfile}>Edit Profile</Button>
          </>
        )}
      </div>
    </Paper>
  );
};

export default ManagerProfile;
