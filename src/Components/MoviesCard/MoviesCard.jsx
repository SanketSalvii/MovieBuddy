import React, { useEffect } from "react";
import { appLevelConstants } from "../../AppLevelConstants";
import "./MoviesCard.scss";

const MoviesCard = ({ moviesData, addToWatchlist, removeFromWatchlist }) => {
  const addToWatchlistForChild = (item) => {
    console.log("add movies card", item);
    addToWatchlist(item);
  };

  const removeFromWatchlistChild = (item) => {
    console.log("remove movies card", item);
    removeFromWatchlist(item);
  };

  useEffect(() => {
    console.log("data", moviesData);
  });
  return (
    <div className="movie-card-wrapper">
      {!!!moviesData?.length ? (
        <div>{appLevelConstants.NO_RECORDS_FOUND}</div>
      ) : (
        moviesData.map((item, index) => (
          <div key={index} className="">
            <div className="movie">
              <img
                src={item.poster_path ? appLevelConstants.TMDB_IMG_URL + item.poster_path : appLevelConstants.TMDB_DEFAULT_IMG}
                className="card-img-top"
                alt={item.poster_path}
              />
              {item.watchlist ? (
                <div
                  className="circle-with-dot  saved"
                  title="Remove from watchlist"
                  onClick={() => removeFromWatchlistChild(item)}
                ></div>
              ) : (
                <div
                  className="circle-with-dot  not-saved"
                  title="Add to watchlist"
                  onClick={() => addToWatchlistForChild(item)}
                ></div>
              )}
              <div className="title">
                <span>{item.title}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MoviesCard;
