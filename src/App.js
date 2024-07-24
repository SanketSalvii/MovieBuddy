import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Watchlist from './Components/WatchList/WatchList';
import NavBar from './Components/NavBar/NavBar';
import SearchMovies from './Components/SearchMovies/SearchMovies';


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    console.log("term",term)
    setSearchTerm(term);
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch}/>
        <Routes>
          <Route path="/" element={<SearchMovies searchTerm={searchTerm} />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
