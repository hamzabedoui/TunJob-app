import React from "react";
import { Paper, Typography } from "@mui/material";
import { JobDetails } from "../../types/types";

const Job: React.FC<JobDetails> = (props) => {
  return (
    <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
      <Typography variant="h6" style={{ marginBottom: "8px" }}>
        Status: {props.status}
      </Typography>
      <Typography variant="body1">Position: {props.position}</Typography>
      <Typography variant="body1">Type: {props.jobType}</Typography>
      <Typography variant="body1">Location: {props.jobLocation}</Typography>
      {props.manager ? (
        <Typography variant="body1">Manager: {props.manager}</Typography>
      ) : (
        ""
      )}
    </Paper>
  );
};

export default Job;
