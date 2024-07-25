import React, { useState, useEffect } from "react";
import movieService from "../../Services/MovieService";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./SearchMovies.scss";

const SearchMovies = ({ searchTerm }) => {
  const [tmdbmovies, setTmdbmovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (item) => {
    item.watchlist = true;
    if (!watchlist.find((movie) => movie.id === item.id)) {
      const updatedArray = [...watchlist, item];
      setWatchlist(updatedArray);
      localStorage.setItem("watchlist", JSON.stringify(updatedArray));
    } else {
      console.log("already present in watclist");
    }
  };

  const removeFromWatchlist = (item) => {
    item.watchlist = false;
    const index = watchlist.findIndex((movie) => item.id === movie.id);
    if (index !== -1) {
      const updatedArray = [...watchlist];
      updatedArray.splice(index, 1);
      setWatchlist(updatedArray);
      localStorage.setItem("watchlist", JSON.stringify(updatedArray));
    } else {
      console.log("Not in watchlist");
    }
  };

  useEffect(() => {
    console.log("movies",searchTerm)
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const watchlistDict = watchlist?.reduce((map,movie)=>{
      map[movie.id] = movie;
      return map;
    },{})
    if (watchlist) {
      setWatchlist(watchlist);
    }
    const fetchtmdbMovies = async () => {
      const reqObj = {
        page: 1,
      };
      const tmdbData = await movieService.fetchTMDBMovies(reqObj);
      tmdbData.results.forEach((item) => {
        if (watchlistDict) {
          if (watchlistDict[item.id]) {
            item.watchlist = true;
          } else {
            item.watchlist = false;
          }
        } else {
          item.watchlist = false;
        }
      });
      setTmdbmovies(tmdbData.results);
    };
    const fetchSearchedMovies = async () => {
      const searchData = await movieService.searchMovies({ searchTitle: searchTerm });
      searchData.results.forEach((item) => {
          if (watchlistDict && watchlistDict[item.id]) {
            item.watchlist = true;
          } else {
            item.watchlist = false;
          }
      });
      setTmdbmovies(searchData.results);
    };
    if (searchTerm) {
      fetchSearchedMovies();
    } else {
      fetchtmdbMovies();
    }
  }, [searchTerm]);

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
