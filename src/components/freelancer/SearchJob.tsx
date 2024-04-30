import React from "react";
import { useSelector } from "react-redux";

const SearchJob: React.FC = () => {
  const jobs = useSelector((state: any) => state.jobs);

  return (
    <div>
      <h2>Search Jobs</h2>
      {jobs.map((job: any) => (
        <div key={job.id}>
          <h3>{job.position}</h3>
          <p>Status: {job.status}</p>
          <p>Job Type: {job.jobType}</p>
          <p>Location: {job.jobLocation}</p>
          <button>Apply</button>
        </div>
      ))}
    </div>
  );
};

export default SearchJob;
