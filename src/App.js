import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import debounce from 'lodash/debounce';

import Watchlist from './Components/WatchList/WatchList';
import NavBar from './Components/NavBar/NavBar';
import SearchMovies from './Components/SearchMovies/SearchMovies';
import DetailedView from './Components/DetailedView/DetailedView';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log("term",term)
    setSearchTerm(term);
  };

  const dHandleSearch = debounce(handleSearch, 500);

  return (
    <Router>
      <div>
        <NavBar onSearch={dHandleSearch}/>
        <Routes>
          <Route path="/" element={<SearchMovies searchTerm={searchTerm} />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/detail-screen" element={<DetailedView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
