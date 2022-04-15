import React, { useState } from 'react';
import { MoneyCollectOutlined, BulbOutlined, FundOutlined, DollarOutlined } from '@ant-design/icons';

import CurrenciesItem from './items/CurrenciesItem';
import ExchangesItem from './items/ExchangesItem';
import NewsItem from './items/NewsItem';
import SimulatorItem from './items/SimulatroItem';

import './Features.css'

const Features = () => {

  const [item, setItem] = useState(0)

  let displayedItem
  if (item === 0) displayedItem = <CurrenciesItem />
  if (item === 1) displayedItem = <NewsItem />
  if (item === 2) displayedItem = <ExchangesItem />
  if (item === 3) displayedItem = <SimulatorItem />

  return (
    <div className="features-box">
      <h1>
          CryptoHub's Features
      </h1>
      <div className="features-menu-box">
        <div className="features-menu">
          <div className={(item === 0) ? "features-menu-item active" : "features-menu-item"} onClick={() => setItem(0)}>
            <MoneyCollectOutlined style={{ fontSize: '250%'}}/>
            <h3>Currencies</h3>
          </div>
          <div className={(item === 1) ? "features-menu-item active" : "features-menu-item"} onClick={() => setItem(1)}>
            <BulbOutlined style={{ fontSize: '250%'}}/>
            <h3>News</h3>
          </div>
          <div className={(item === 2) ? "features-menu-item active" : "features-menu-item"} onClick={() => setItem(2)}>
            <FundOutlined style={{ fontSize: '250%'}}/>
            <h3>Exchanges</h3>
          </div>
          <div className={(item === 3) ? "features-menu-item active" : "features-menu-item"} onClick={() => setItem(3)}>
            <DollarOutlined style={{ fontSize: '250%'}}/>
            <h3>Simulator</h3>
          </div>
        </div>
        {displayedItem}
      </div>
    </div>
  )
}

export default Features