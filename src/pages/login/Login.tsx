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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login/LoginPage.scss";
import { loginUser } from "../../redux/features/LoginSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async (e: any) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        loginUser({ email: email, password: password })
      );
      if (response.meta.requestStatus === "fulfilled") {
        console.log(response.payload.user.__t);

        const userType = response.payload.user.__t; // Assuming the response contains user type
        if (userType === "Employee") {
          navigate("/main-freelancer");
          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false, // Display a progress bar
            // transition: toast.slideDown, // Apply slide down animation
            draggable: true, // Allow users to drag the toast
            closeOnClick: false, // Do not close toast when clicked
          });
        } else if (userType === "Manager") {
          navigate("/main-manager/dashboard");
          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            // transition: toast.slideDown,
            draggable: true,
            closeOnClick: false,
          });
        } else {
          console.log("Unknown user type");
          toast.error("Login failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            // transition: toast.slideDown,
            draggable: true,
            closeOnClick: false,
          });
        }
      } else {
        console.log("Permission denied");
        toast.error("Login failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          // transition: toast.slideDown,
          draggable: true,
          closeOnClick: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signIn}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
