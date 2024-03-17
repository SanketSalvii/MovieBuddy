import React, { useEffect, useState } from 'react';
import SearchMovies from './SearchMovies';
import { useLocation, NavLink } from 'react-router-dom';
import movieService from '../Services/MovieService';

const NavBar = () => {
  const [movies, setMovies] = useState([]);
  const [allmovies, setAllmovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [value, setValue] = useState("");
  const [isFound, setIsFound] = useState(true);
  const location = useLocation();
  const { pathname, search, hash } = location;

  const getQuery = (e) => {
    const searchTitle = e.target.value.toLowerCase();
    setValue(searchTitle);
    setIsFound(true);

    if (searchTitle.length > 0) {
      const filteredMovies = allmovies.filter(movie => movie.title.toLowerCase().includes(searchTitle));
      setFoundMovies(filteredMovies);
      setIsFound(filteredMovies.length > 0);
    } else {
      setFoundMovies([]);
    }
  }

  useEffect(() => {
    async function fetchMovies() {
      const data = await movieService.fetchMovies();
      if (movies.length === 0) {
        setMovies(data.slice(0, 21));
        setAllmovies(data)
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', position: 'fixed', zIndex: '1', width: '100%', top: '0' }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="">Movies.Com</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/watchlist">My Watchlist</NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search Movies" aria-label="Search" value={value} onChange={getQuery} />
            </form>
          </div>
        </div>
      </nav>
      {pathname === '/' ? (
        isFound ? <SearchMovies movies={foundMovies.length > 0 ? foundMovies : movies} /> : <p style={{ margin: '5rem' }}>No records found</p>
      ) : (
        ''
      )}

    </>
  );
};

export default NavBar;
