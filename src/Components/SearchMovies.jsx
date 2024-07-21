import React, { useState, useEffect } from 'react';

const SearchMovies = ({ movies }) => {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (title) => {
    const updatedArray = [...watchlist, title];
    setWatchlist(updatedArray);
    localStorage.setItem('watchlist', JSON.stringify(updatedArray));
  }

  const removeFromWatchlist = (title) => {
    const index = watchlist.findIndex(item => item === title);
    if (index !== -1) {
      const updatedArray = [...watchlist];
      updatedArray.splice(index, 1);
      setWatchlist(updatedArray);
      localStorage.setItem('watchlist', JSON.stringify(updatedArray));
    }
  }

  useEffect(() => {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist));
    }
  }, []);

  return (
    <>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '5rem', marginBottom: '2rem', justifyContent: 'space-evenly' }}>
        {movies.map((movie, index) => (
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
        ))}
      </div>
    </>
  );
};

export default SearchMovies;
