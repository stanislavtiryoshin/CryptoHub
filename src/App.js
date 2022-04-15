import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';

import { Home } from './components/pages/Home.js';
import { Currencies } from './components/pages/Currencies.js';
import { Exchanges } from './components/pages/Exchanges.js';
import { News } from './components/pages/News.js';
import { Simulator } from './components/pages/Simulator.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/currencies' element={<Currencies />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/news' element={<News />} />
          <Route path='/simulator' element={<Simulator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
