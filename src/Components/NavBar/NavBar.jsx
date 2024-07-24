import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import movieService from '../../Services/MovieService';
import './NavBar.scss';

const NavBar = ( {onSearch} ) => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [value, setValue] = useState("");
  const [isFound, setIsFound] = useState(true);

  const getQuery = async (e) => {
    const searchTitle = e.target.value.toLowerCase();
    // searchText(searchTitle)
    onSearch(searchTitle)
    setValue(searchTitle);
    setIsFound(true);

    if (searchTitle.length > 0) {
      // const filteredMovies = allmovies.filter(movie => movie.title.toLowerCase().includes(searchTitle));
      // const filteredMovies = await movieService.searchMovies({ searchTitle });
      // console.log("filtered Movies",filteredMovies)
      // setFoundMovies(filteredMovies.results);
      // setIsFound(filteredMovies?.results.length > 0);
    } else {
      setFoundMovies([]);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
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
    </>
  );
};

export default NavBar;
