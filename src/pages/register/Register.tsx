import React, { useState } from "react";
import UserTypeSelection from "../../components/UserTypeSelection"; // Import UserTypeSelection component
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import "../register/Register.scss";
import { UserType } from "../../types/types";

interface RegistrationData {
  userType: UserType;
  username: string;
  email: string;
  password: string;
  jobTitle?: string;
  academicLevel?: string; // Corrected spelling here
  location?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    userType: UserType.Freelancer,
    username: "",
    email: "",
    password: "",
    jobTitle: "",
    academicLevel: "", // Corrected spelling here
    location: "",
  });

  const handleUserTypeChange = (userType: UserType) => {
    setFormData({ ...formData, userType });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send data to server
    console.log(formData);
  };

  const renderFreelancerRegistration = () => (
    <>
      <div className="infos">
        <TextField
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="MuiInputBase-input"
          label="Job Title"
          autoFocus
          fullWidth
        />
      </div>
      <div className="infos">
        <TextField
          type="text"
          name="academicLevel" // Corrected name here
          value={formData.academicLevel} // Corrected name here
          onChange={handleChange}
          required
          className="MuiInputBase-input"
          label="Academic Level"
          autoFocus
          fullWidth
        />
      </div>
      <div className="infos">
        <TextField
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="MuiInputBase-input"
          label="Location"
          autoFocus
          fullWidth
        />
      </div>
    </>
  );

  return (
    <Container component="main" maxWidth="xs" className="register">
      <CssBaseline />
      <Box
        className="login-container" // Apply the same class as login page container
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <UserTypeSelection onSelectUserType={handleUserTypeChange} />{" "}
        {/* Include UserTypeSelection component */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <div className="form-container">
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input" // Apply necessary input classes from LoginPage.scss
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                label="Username" // Corrected label here
                autoFocus
                fullWidth
              />
            </div>
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input" // Apply necessary input classes from LoginPage.scss
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                label="Email"
                autoFocus
                fullWidth
              />
            </div>
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input" // Apply necessary input classes from LoginPage.scss
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoFocus
                fullWidth
              />
            </div>
            {formData.userType === UserType.Freelancer &&
              renderFreelancerRegistration()}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* Apply necessary link classes from LoginPage.scss */}
              <a
                className="MuiTypography-root MuiLink-root MuiTypography-body2 MuiLink-underlineHover MuiTypography-colorPrimary"
                href="/login"
              >
                Already have an account? Sign in
              </a>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
