import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import { HomePage } from './pages/HomePage.jsx';
import { CurrenciesPage } from './pages/CurrenciesPage.jsx';
import { ExchangesPage } from './pages/ExchangesPage.jsx';
import { NewsPage } from './pages/NewsPage.jsx';
import { SimulatorPage } from './pages/SimulatorPage.jsx';
import CryptoDetailsPage from './pages/CryptoDetailsPage.jsx'

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/currencies' element={<CurrenciesPage />} />
          <Route path='/exchanges' element={<ExchangesPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/crypto/:coinId' element={<CryptoDetailsPage />} />
          <Route path='/simulator' element={<SimulatorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
