import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../redux/features/JobSlice";
import Job from "../job/Job";

const PostedJobs: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((store: any) => store.job);
  useEffect(() => {
    dispatch(getJobs());
  }, []);
  /* console.log(jobs); */

  return (
    <div>
      {jobs?.length > 0 &&
        jobs?.map((job: any) => (
          <div key={job._id} className="job">
            <Job
              status={job.status}
              position={job.position}
              jobType={job.jobType}
              jobLocation={job.jobLocation}
            />
          </div>
        ))}
    </div>
  );
};

export default PostedJobs;
