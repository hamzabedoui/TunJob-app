import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import main from "../../assets/img/hiring-concept-illustration_114360-532.avif";
import "../landing/Landing.scss";

const Landing: React.FC = () => {
  return (
    <React.Fragment>
      <div className="page">
        <nav>
          <h1>TunJob</h1>
        </nav>
        <div className="main">
          <div className="info">
            <h1>
              job <span>Matching</span> app
            </h1>
            <p>
              <span>TunJob </span>
              is a cutting-edge job matching application designed to streamline
              the job search process for both job seekers and recruiters.
              Utilizing advanced algorithms and user-provided data, JobMatch
              recommends the most suitable job opportunities to job seekers
              while assisting recruiters in finding the best candidates for
              their open positions.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-hero">
                Register
              </Link>
              <Link to="/login" className="btn btn-hero">
                Login
              </Link>
            </div>
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
