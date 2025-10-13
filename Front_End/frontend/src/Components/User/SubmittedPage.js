import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubmittedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appNumber = location.state?.appNumber || Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <div className="bg-white shadow p-5 rounded-4" style={{ maxWidth: "500px" }}>
        <h2 className="text-success mb-3">Application Submitted Successfully</h2>
        <h5 className="mb-3">
          Application Number: <strong>{appNumber}</strong>
        </h5>
        <p className="text-secondary">
          Please wait for further examining from the Transportation Team.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/vreg")}
        >
          Go Back to Vehicle Registration
        </button>
      </div>
    </div>
  );
};

export default SubmittedPage;
