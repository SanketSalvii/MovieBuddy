import React, { useState, useEffect } from "react";
import movieService from "../../Services/MovieService";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./SearchMovies.scss";

const SearchMovies = ({ movies }) => {
  const [tmdbmovies, setTmdbmovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (watchlist) {
      setWatchlist(watchlist);
    }
    const fetchtmdbMovies = async () => {
      const reqObj = {
        page: 1,
      };
      console.log("watchlist", watchlist);
      const tmdbData = await movieService.fetchTMDBMovies(reqObj);
      console.log("watchlist", watchlist);
      tmdbData.results.forEach((item) => {
        if (watchlist) {
          if (watchlist.some((movie) => movie.id === item.id)) {
            item.watchlist = true;
          } else {
            item.watchlist = false;
          }
        } else {
          item.watchlist = false;
        }
      });
      setTmdbmovies(tmdbData.results);
      console.log("tmdb", tmdbData);
    };
    if (tmdbmovies.length === 0) {
      fetchtmdbMovies();
    }
  }, []);

  return (
    <>
      <div className="tmdb container">
        <div className="trending-header">
          <h2 className="trending-movies">Trending Movies</h2>
        </div>
        <MoviesCard
          moviesData={tmdbmovies}
          addToWatchlist={addToWatchlist}
          removeFromWatchlist={removeFromWatchlist}
        />
      </div>
    </>
  );
};

export default SearchMovies;
