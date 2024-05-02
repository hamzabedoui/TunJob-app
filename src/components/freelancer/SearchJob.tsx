import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/features/JobSlice";
import Job from "../job/Job";
import { Button, Modal } from "@mui/material";
import Application from "../application/Application";

const SearchJob: React.FC = () => {
  const { allJobs } = useSelector((state: any) => state.job);
  const dispatch = useDispatch();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const handleApply = (jobId: string) => {
    console.log(jobId);

    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Search Jobs</h2>
      <div className="jobs-list">
        {allJobs.map((job: any) => (
          <div key={job._id}>
            <Job
              status={job.status}
              position={job.position}
              jobType={job.jobType}
              jobLocation={job.jobLocation}
              manager={job.manager.username}
            />
            <Button
              variant="contained"
              className="save-input"
              onClick={() => {
                handleApply(job._id);
              }}>
              Apply
            </Button>
          </div>
        ))}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Application jobId={selectedJobId} />
      </Modal>
    </div>
  );
};

export default SearchJob;
