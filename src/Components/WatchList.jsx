// src/components/Watchlist.js
import React, { useState, useEffect } from 'react';
import data from './data.json';
import movieService from '../Services/MovieService';



const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tmdbmovies, setTmdbmovies] = useState([]);

  const removeFromWatchlist = (title) => {
    const index = watchlist.findIndex(item => item === title);
    if (index !== -1) {
      const updatedArray = [...watchlist];
      updatedArray.splice(index, 1);
      setWatchlist(updatedArray);
      localStorage.setItem('watchlist', JSON.stringify(updatedArray));
    }
  }

  const addToWatchlist = (title) => {
    const updatedArray = [...watchlist, title];
    setWatchlist(updatedArray);
    localStorage.setItem('watchlist', JSON.stringify(updatedArray));
  }

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));

    }
    async function fetchMovies() {
      console.log("--->")
      const data = await movieService.fetchMovies();
      setMovies(data)
      console.log("stired",storedWatchlist)
      const watchlistDetails = data.filter(value => storedWatchlist?.includes(value.title))
      setMovies(watchlistDetails);
      const reqObj = {
        page : 1
      }
      const tmdbData = await movieService.fetchTMDBMovies(reqObj)
      setTmdbmovies(tmdbData)
      console.log("tmdb",tmdbData)
    }
    if (movies.length === 0) {
      fetchMovies();
    }
  }, []);

  return (
    <>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '5rem', marginBottom: '2rem', justifyContent: 'space-evenly' }}>
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
      </div>
      <div className="container">

      </div>
    </>
  );
};

export default WatchList;
