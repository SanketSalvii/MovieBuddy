import React, { useState, useEffect } from "react";
import movieService from "../Services/MovieService";
import MoviesCard from "./MoviesCard";

const SearchMovies = ({ movies }) => {
  const [tmdbmovies, setTmdbmovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (title) => {
    const updatedArray = [...watchlist, title];
    setWatchlist(updatedArray);
    localStorage.setItem("watchlist", JSON.stringify(updatedArray));
  };

  const removeFromWatchlist = (title) => {
    const index = watchlist.findIndex((item) => item === title);
    if (index !== -1) {
      const updatedArray = [...watchlist];
      updatedArray.splice(index, 1);
      setWatchlist(updatedArray);
      localStorage.setItem("watchlist", JSON.stringify(updatedArray));
    }
  };

  useEffect(() => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist));
    }
    const fetchtmdbMovies = async () => {
      const reqObj = {
        page: 1,
      };
      const tmdbData = await movieService.fetchTMDBMovies(reqObj);
      setTmdbmovies(tmdbData.results);
      console.log("tmdb", tmdbData);
    };
    if (tmdbmovies.length === 0) {
      fetchtmdbMovies();
    }
  }, []);

  return (
    <>
      <div className="tmdb container"
        style={{
          marginTop: "5rem",
        }}>
        <div className="trending-header"
          style={{
            textAlign: "left",
          }}>
          <h2 style={{fontSize:"22px",fontFamily:"ui-monospace"}}>Trending Movies</h2>
        </div>
          <MoviesCard moviesData={tmdbmovies}/>
      </div>
    </>
  );
};

export default SearchMovies;
