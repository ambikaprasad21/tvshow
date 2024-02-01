import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Rating from "@mui/material/Rating";

const override = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh", // Set minimum height to 100% of the viewport height
  textAlign: "center",
  borderColor: "blue",
  marginTop: "10rem",
  marginLeft: "20rem",
};

function ShowDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShowDetails(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookTicket = () => {
    // Implement your logic for booking a movie ticket here
    // You can use local storage to store user details
    // For simplicity, let's just log a message for now
    console.log("Ticket booked for:", showDetails.name);
  };

  if (isLoading)
    return (
      <ClipLoader
        // color={color}
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  return (
    <div>
      <h1>Show Details</h1>
      {showDetails && (
        <div className="details">
          {/* <h2>{showDetails.name}</h2>
          <p>{showDetails.summary}</p>
          <button onClick={handleBookTicket}>Book Ticket</button>
          <br />
          <Link to="/">Back to Show List</Link> */}
          {/* <div className="detail-img"> */}
          <img
            className="detail-img"
            src={showDetails?.image?.original}
            alt={showDetails?.name}
          />
          {/* </div> */}
          <div className="detail-text">
            <div className="text">
              <p>
                <span className="label">Name:</span> {showDetails.name}
              </p>
              <p dangerouslySetInnerHTML={{ __html: showDetails?.summary }} />

              <p>
                <span className="label">Language:</span> {showDetails.language}
              </p>
              <p>
                <span className="label">Status:</span> {showDetails.status}
              </p>
              <p>
                <span className="label">Runtime:</span> {showDetails.runtime}{" "}
                minutes
              </p>
              <p>
                <span className="label">Rating:</span>{" "}
                {showDetails.rating.average}{" "}
                {
                  <Rating
                    name="read-only"
                    value={showDetails.rating.average}
                    precision={0.5}
                    max={10}
                    readOnly
                  />
                }
              </p>
            </div>
            <div className="cta">
              <button className="book btn">
                <a
                  href={showDetails.url}
                  // to={`show/${showDetails.url}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit" /* Inherit color from the parent */,
                    cursor: "pointer",
                  }}
                >
                  Book Show
                </a>
              </button>
              <button className="back btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;
