import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

import { Home } from './pages/Home.jsx';
import { Currencies } from './pages/Currencies.jsx';
import { Exchanges } from './pages/Exchanges.jsx';
import { News } from './pages/News.jsx';
import { Simulator } from './pages/Simulator.jsx';

import './App.css';

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
