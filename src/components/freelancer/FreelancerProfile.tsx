import React from "react";
import { UserType, RegistrationData } from "../../types/types"; // Update the path to your types

const FreelancerProfile: React.FC<any> = ({
  username,
  email,
  /* userType, */
  jobTitle,
  academicLevel,
  location,
}) => {
  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        {/* <p>
          <strong>User Type:</strong>{" "}
          {userType === UserType.Freelancer ? "Freelancer" : "Recruiter"}
        </p> */}
        {/* {userType === UserType.Freelancer && ( */}
        <>
          <p>
            <strong>Job Title:</strong> {jobTitle}
          </p>
          <p>
            <strong>Academic Level:</strong> {academicLevel}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
        </>
        {/*  )} */}
        {/* Add additional fields based on your user data */}
      </div>
    </div>
  );
};

export default FreelancerProfile;
