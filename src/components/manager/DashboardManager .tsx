import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/features/JobSlice"; // Import the createJob action

const DashboardManager: React.FC = () => {
  const [jobDetails, setJobDetails] = useState({
    status: "",
    position: "",
    jobType: "",
    jobLocation: "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createJob(jobDetails));
  };

  return (
    <div>
      <Typography variant="h5">Create Job Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="status"
          label="Status"
          value={jobDetails.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="position"
          label="Position"
          value={jobDetails.position}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="jobType"
          label="Job Type"
          value={jobDetails.jobType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="jobLocation"
          label="Job Location"
          value={jobDetails.jobLocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default DashboardManager;
