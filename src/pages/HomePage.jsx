import React from 'react';
import { Link } from 'react-router-dom'

import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import CallToAction from '../components/CallToAction/CallToAction';
import Globals from '../components/Globals/Globals'
import Cryptocurrencies from '../components/Cryptocurrencies/Cryptocurrencies';
import Exchanges from '../components/Exchanges/Exchanges';
import News from '../components/News/News';

const HomePage = () => {

  return (
    <>
      <Hero />
      <Features />
      <Globals />
      <div className="home-title">
        <h2>Top Exchanges</h2>
        <Link to='/exchanges'>Show more</Link>
      </div>
      <Exchanges simplified />
      <div className="home-title">
        <h2>Top 10 Cryptos</h2>
        <Link to='/currencies'>Show more</Link>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-title">
        <h2>Freshest News</h2>
        <Link to='/news'>Show more</Link>
      </div>
      <News simplified />
      <CallToAction />
    </>
  )
}

export default HomePage