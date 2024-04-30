import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../redux/features/JobSlice";
import Job from "../job/Job";
import { Button, Typography } from "@mui/material";
import "../manager/PostedJobs.scss";


const PostedJobs: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((store: any) => store.job);
  
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleDelete = (jobId: string) => {
    // Dispatch action to delete job with given jobId
    console.log("Deleting job with ID:", jobId);
  };

  const handleEdit = (jobId: string) => {
    // Dispatch action to navigate to job edit page with given jobId
    console.log("Editing job with ID:", jobId);
  };

  return (
    <div className="posted-jobs-container">
      <Typography variant="h2">Posted Jobs</Typography>
      <div className="jobs-list">
        {jobs?.length > 0 &&
          jobs?.map((job: any) => (
            <div key={job._id} className="job">
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
                  onClick={() => handleEdit(job._id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostedJobs;
