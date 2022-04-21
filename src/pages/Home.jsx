import React from 'react';
import { Link } from 'react-router-dom'

import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import CallToAction from '../components/CallToAction/CallToAction';
import Footer from '../components/Footer/Footer';
import Globals from '../components/Globals/Globals'
import Cryptocurrencies from '../components/Cryptocurrencies/Cryptocurrencies';
import News from '../components/News/News';

export const Home = () => {

  return (
    <>
      <Hero />
      <Globals />
      <div className="home-title">
        <h2>Top 10 Cryptos</h2>
        <Link to='/currencies'>Show more</Link>
      </div>
      <Cryptocurrencies />
      <div className="home-title">
        <h2>Freshest news</h2>
        <Link to='/currencies'>Show more</Link>
      </div>
      <News />
      <Features />
      <CallToAction />
      <Footer />
    </>
  )
}

