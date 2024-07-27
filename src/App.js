import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch}/>
        <Routes>
          <Route path="/" element={<SearchMovies searchTerm={searchTerm} />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/detailscreen" element={<DetailedView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
