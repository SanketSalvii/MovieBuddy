import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Watchlist from './Components/WatchList';
import NavBar from './Components/NavBar';


function App() {

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
