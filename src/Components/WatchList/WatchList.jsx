// src/components/Watchlist.js
import React, { useState, useEffect } from "react";
import data from "../data.json";
import movieService from "../../Services/MovieService";
import "./WatchList.scss";
import "../MoviesCard/MoviesCard";
import MoviesCard from "../MoviesCard/MoviesCard";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToWatchlist = (item) => {
    item.watchlist = true;
    console.log("watchlist", item);
    console.log("watchlist", watchlist);
    if (!watchlist.find((movie) => movie.id === item.id)) {
      const updatedArray = [...watchlist, item];
      setWatchlist(updatedArray);
      localStorage.setItem("watchlist", JSON.stringify(updatedArray));
    } else {
      console.log("already present in watclist");
    }
  };

  const removeFromWatchlist = (item) => {
    console.log("item", item);
    item.watchlist = false;
    const index = watchlist.findIndex((movie) => item.id === movie.id);
    console.log("watchlist", watchlist);
    console.log("index", index);
    if (index !== -1) {
      const updatedArray = [...watchlist];
      updatedArray.splice(index, 1);
      setWatchlist(updatedArray);
      localStorage.setItem("watchlist", JSON.stringify(updatedArray));
      console.log("updatedArray", updatedArray);
    } else {
      console.log("Not in watchlist");
    }
  };
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
    async function fetchMovies() {
      console.log("--->");
      setMovies(JSON.parse(storedWatchlist));
    }
    if (movies.length === 0) {
      fetchMovies();
    }
  }, []);

  return (
    <>
      {/* <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '5rem', marginBottom: '2rem', justifyContent: 'space-evenly' }}>
        {watchlist.length === 0 ? 'No Watchlist Data' :
          (movies.map((movie, index) => (
            <div key={index} className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{movie.title ?? '-'}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Director : {movie.director !== '' ? movie.director : '-'}</h6>
                <p className="card-text">{movie.description ?? '-'}</p>
                <div className="extra-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="card-text">Release Year:{movie.release_year ?? '-'}</span>
                  <span className="card-text">Rating:{movie.rating ?? '-'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  {
                    watchlist.includes(movie.title) ?
                      <a onClick={() => removeFromWatchlist(movie.title)} className="btn btn-outline-secondary" style={{ color: 'black' }}>Remove From watchlist</a> :
                      <a onClick={() => addToWatchlist(movie.title)} className="btn btn-primary">Add to watchlist</a>
                  }
                </div>
              </div>
            </div>
          )))}
      </div> */}
      <div className="watchlist container">
        <div className="watchlist-header">
          <h2 className="watchlist-movies">My Watchlist</h2>
        </div>
        <MoviesCard
          moviesData={movies}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      </div>
    </>
  );
};

export default WatchList;
