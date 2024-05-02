// Application.tsx

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createApplication } from "../../redux/features/ApplicationSlice";
import "./Application.scss"; // Import the Sass file

interface ApplicationProps {
  jobId: string | null;
}

const Application: React.FC<ApplicationProps> = ({ jobId }) => {
  const dispatch = useDispatch();
  const [coverLetter, setCoverLetter] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createApplication({ coverLetter, startDate, job: jobId }));
    setCoverLetter("");
    setStartDate("");
  };

  return (
    <div className="modal">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Cover Letter"
          multiline
          rows={4}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained">
          Submit Application
        </Button>
      </form>
    </div>
  );
};

export default Application;
