import React, { useEffect } from "react";
import { appLevelConstants } from "../AppLevelConstants";

const MoviesCard = ({moviesData}) => {

    const addToWatchlist = (title) => {
        // const updatedArray = [...watchlist, title];
        // setWatchlist(updatedArray);
        // localStorage.setItem("watchlist", JSON.stringify(updatedArray));
      };

    useEffect(()=>{
        console.log("data",moviesData)
    })
    return(
        <div
        className="movie-card-wrapper"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
          marginBottom: "2rem",
          justifyContent: "space-evenly",
          fontFamily: "ui-monospace",
        }}
      >
        {moviesData.length === 0 ? (
          <div>{appLevelConstants.NO_RECORDS_FOUND}</div>
        ) : (
          moviesData.map((item, index) => (
            <div key={index} className="" style={{}}>
              <div
                className="movie"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  cursor:"pointer"
                }}
              >
                <img
                  src={appLevelConstants.TMDB_IMG_URL + item.poster_path}
                  className="card-img-top"
                  alt={item.poster_path}
                  style={{ width: "12rem", height: "18rem", borderRadius:"1rem" }}
                />
                <div
                  className="circle-with-dot"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    backgroundImage: `url('../images/saved.svg')`,
                    position: "absolute",
                    opacity: "70%",
                    right: "8px",
                    top: "8px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => addToWatchlist(item)}
                ></div>
                <div
                  className="title"
                  style={{
                    width: "12rem",
                    whiteSpace: "break-spaces",
                    wordBreak: "break-word",
                  }}
                >
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )
}

export default MoviesCard;