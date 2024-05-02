import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Avatar, Button } from "@mui/material";
import "./Sidebar.scss";
import FreelancerProfile from "../../freelancer/FreelancerProfile";

const FreelancerSidebar: React.FC<{
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
            <ListItem button component={Link} to="/main-freelancer/search-jobs">
              <ListItemText primary="Search Jobs" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/main-freelancer/applications">
              <ListItemText primary="View Applications" />
            </ListItem>
            <ListItem button component={Link} to="/main-freelancer/saved-jobs">
              <ListItemText primary="Saved Jobs" />
            </ListItem>
            <ListItem button component={Link} to="/main-freelancer/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
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

export default FreelancerSidebar;
