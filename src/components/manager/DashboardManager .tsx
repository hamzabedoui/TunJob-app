import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const DashboardManager: React.FC = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
  });

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
    // Here you can handle form submission, e.g., send data to server
    console.log('Job details:', jobDetails);
    // Reset form fields
    setJobDetails({
      title: '',
      description: '',
      requirements: '',
      location: '',
      salary: '',
    });
  };

  return (
    <div>
      <Typography variant="h5">Create Job Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          value={jobDetails.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          label="Description"
          value={jobDetails.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <TextField
          name="requirements"
          label="Requirements"
          value={jobDetails.requirements}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <TextField
          name="location"
          label="Location"
          value={jobDetails.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="salary"
          label="Salary"
          value={jobDetails.salary}
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
