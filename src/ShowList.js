import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setShows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!shows) return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="show-list-heading">SHOW LIST</h1>
      <div className="show-flex">
        <div className="shows">
          {shows &&
            shows.map((show) => (
              <div key={show.show.id} className="shows-card">
                <div className="show-original-img">
                  <img src={show.show?.image?.original} alt={show.show?.name} />
                </div>
                <div className="show-info">
                  <div className="show-info__detail">
                    <p>Name: {show.show?.name}</p>
                    <p>
                      Genre:{" "}
                      {`${show.show?.genres[0]}, ${show.show?.genres[1]}`}
                    </p>
                  </div>
                  <button className="more-btn">
                    <Link
                      to={`/show/${show.show.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit" /* Inherit color from the parent */,
                        cursor: "pointer",
                      }}
                    >
                      More
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ShowList;
