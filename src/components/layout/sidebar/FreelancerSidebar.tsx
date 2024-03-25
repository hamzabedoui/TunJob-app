import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import "../sidebar/FreelancerSidebar.scss"

const SidebarContainer = styled('div')({
  width: '250px',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
});

const UserInfoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

const UserName = styled('div')({
  marginLeft: '10px',
  fontWeight: 'bold',
});

const UserAvatar = styled(Avatar)({
  marginRight: '10px',
});

const FreelancerSidebar: React.FC<{ userName: string; userAvatar?: string }> = ({ userName, userAvatar }) => {
  return (
    <SidebarContainer className="SidebarContainer"> {/* Add a className prop */}
      <UserInfoContainer className="UserInfoContainer"> {/* Add a className prop */}
        <UserAvatar alt={userName} src={userAvatar} />
        <UserName>{userName}</UserName>
      </UserInfoContainer>
      <List component="nav">
        <ListItem button component={Link} to="/dashboard/freelancer">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/freelancer/jobs">
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/freelancer/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        {/* Add more sidebar items as needed */}
      </List>
    </SidebarContainer>
  );
};

export default FreelancerSidebar;
