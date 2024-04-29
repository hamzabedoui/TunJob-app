import React, { useState } from "react";
import UserTypeSelection from "../../components/register/UserTypeSelection";
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
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "../register/Register.scss";
import { UserType, AcademicLevel, RegistrationData } from "../../types/types";
import { useDispatch } from "react-redux";
import { registerMg, registerFr } from "../../redux/features/RegisterSlice";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  const [userType, setUserType] = useState<UserType>(UserType.Freelancer);

  const handleUserTypeChange = (userType: UserType) => {
    setUserType(userType);
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let formData;
      userType === UserType.Freelancer
        ? (formData = {
            username,
            email,
            password,
            academicLevel,
            jobTitle,
            location,
          })
        : (formData = {
            username,
            email,
            password,
            company,
          });
      const response = await (userType === UserType.Freelancer
        ? dispatch(registerFr(formData))
        : dispatch(registerMg(formData)));
      console.log(userType);

      if (response.meta.requestStatus === "fulfilled") {
        navigate("/login");
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changeAcademicLevel = (event: SelectChangeEvent<string>) => {
    setAcademicLevel(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" className="register">
      <CssBaseline />
      <Box
        className="login-container"
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <UserTypeSelection onSelectUserType={handleUserTypeChange} />
        <Box component="form" onSubmit={signUp} noValidate sx={{ mt: 3 }}>
          <div className="form-container">
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                label="Username"
                autoFocus
                fullWidth
              />
            </div>
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                label="Email"
                autoFocus
                fullWidth
              />
            </div>
            <div className="infos">
              <TextField
                className="MuiInputBase-input MuiOutlinedInput-input"
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                fullWidth
              />
            </div>
            {userType === UserType.Recruiter && (
              <>
                <div className="infos">
                  <TextField
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="MuiInputBase-input"
                    label="company"
                    autoFocus
                    fullWidth
                  />
                </div>
              </>
            )}
            {userType === UserType.Freelancer && (
              <>
                <div className="infos">
                  <TextField
                    type="text"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
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
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="MuiInputBase-input"
                    label="Location"
                    autoFocus
                    fullWidth
                  />
                </div>
                <div className="infos">
                  <Select
                    value={academicLevel}
                    onChange={changeAcademicLevel}
                    name="academicLevel"
                    displayEmpty
                    required
                    className="Academic-levele-selector">
                    <MenuItem value="" disabled>
                      Select Academic Level
                    </MenuItem>
                    {Object.values(AcademicLevel).map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </>
            )}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <a
                className="MuiTypography-root MuiLink-root MuiTypography-body2 MuiLink-underlineHover MuiTypography-colorPrimary"
                href="/login">
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
