import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, Button } from "@mui/material";
import "./Sidebar.scss";

const RecruiterSidebar: React.FC<{
  userName: string;
  userAvatar?: string;
}> = ({ userName, userAvatar }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    console.log("Sign out");
    navigate("/login");
  };

  return (
    <div className="SidebarContainer">
      <div className="container">
        <div className="UserInfoContainer">
          <Avatar alt={userName} src={userAvatar} className="UserAvatar" />
          <div className="UserName">{userName}</div>
        </div>
        <List component="nav">
          <div className="nav-side">
            <ListItem button component={Link} to="/main-manager/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/main-manager/posted-jobs">
              <ListItemText primary="Posted Jobs" />
            </ListItem>
            <ListItem button component={Link} to="/main-manager/candidates">
              <ListItemText primary="View Candidates" />
            </ListItem>
            <ListItem button component={Link} to="/main-manager/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/main-manager/settings">
              <ListItemText primary="Settings" />
            </ListItem>
          </div>
        </List>
      </div>

      <Button fullWidth variant="outlined" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default RecruiterSidebar;
