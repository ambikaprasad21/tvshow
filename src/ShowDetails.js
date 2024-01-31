import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShowDetails() {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
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

  return (
    <div>
      <h1>Show Details</h1>
      {showDetails && (
        <div>
          <h2>{showDetails.name}</h2>
          <p>{showDetails.summary}</p>
          <button onClick={handleBookTicket}>Book Ticket</button>
          <br />
          <Link to="/">Back to Show List</Link>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;
