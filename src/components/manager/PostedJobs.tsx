import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../redux/features/JobSlice";
import Job from "../job/Job";
import { Button, Typography, TextField } from "@mui/material";
import "../manager/PostedJobs.scss";
import { deleteJob, editJob } from "../../redux/features/JobSlice";

const PostedJobs: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((store: any) => store.job);
  
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const [editJobId, setEditJobId] = useState("");
  const [editedJobDetails, setEditedJobDetails] = useState({
    status: "",
    position: "",
    jobType: "",
    jobLocation: "",});

  const handleDelete = (jobId: string) => {
    dispatch(deleteJob(jobId));
    console.log("Deleting job with ID:", jobId);
  };

  const handleEdit = (jobId: string, jobDetails: any) => {
    setEditJobId(jobId);
    setEditedJobDetails(jobDetails);
  };

  const handleSaveEdit = () => {
    dispatch(editJob({ jobId: editJobId, updatedDetails: editedJobDetails }));
    setEditJobId("");
    setEditedJobDetails({
      status: "",
      position: "",
      jobType: "",
      jobLocation: "",
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="posted-jobs-container">
      <Typography variant="h2">Posted Jobs</Typography>
      <div className="jobs-list">
        {jobs?.length > 0 &&
          jobs?.map((job: any) => (
            <div key={job._id} className="job">
              {editJobId === job._id ? (
                <>
                  <div className="job-input">
                  <TextField
                    name="status"
                    label="Status"
                    value={editedJobDetails.status}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="position"
                    label="Position"
                    value={editedJobDetails.position}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="jobType"
                    label="Job Type"
                    value={editedJobDetails.jobType}
                    onChange={handleInputChange}
                  />
                  <TextField
                    name="jobLocation"
                    label="Job Location"
                    value={editedJobDetails.jobLocation}
                    onChange={handleInputChange}
                  />
                    <Button onClick={handleSaveEdit} className="save-input">Save</Button>
                    </div>
                </>  
              ) : (
                <>
                  <Job
                    status={job.status}
                    position={job.position}
                    jobType={job.jobType}
                    jobLocation={job.jobLocation}
                  />
                  <div className="buttons-container">
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleEdit(job._id, job)}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostedJobs;
