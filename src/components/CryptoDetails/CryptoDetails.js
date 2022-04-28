import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Interweave } from 'interweave';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Loader from '../Loader/Loader'
import LineChart from '../LineChart/LineChart';


import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoHistoryQuery, useGetCryptoDetailsQuery } from '../../services/cryptoApi'

import './CryptoDetails.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('24h');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Daily Change', value: ` ${cryptoDetails?.change && millify(cryptoDetails?.change)}%`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high (daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ]

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <div className='details-box'>
      <div className="details-heading">
        <h1><img src={cryptoDetails?.iconUrl} alt="coin icon" className="icon"/> {cryptoDetails.name} ({cryptoDetails.symbol}) Price</h1>
        <h3>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</h3>
      </div>
      <div className="details-chart-box">
        <label htmlFor="timeperiod">Select Timeperiod</label>
        {/* <select defaultValue="24h" name="timeperiod" id="time" onChange={(e) => setTimeperiod(e.target.value)}>
          {time.map((date) => <option key={date}>{date}</option>)}
        </select> */}
        <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails?.name} />
      </div>
      <div className="stats-box">
        <div className="details-stats">
          <div className="stats-heading">
            <h3>{cryptoDetails.name} Value Statistics</h3>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </div>
          {stats.map(({ icon, title, value }) => {
            return (
              <div className="coin-stats">
                <div className="coin-stats-name">
                  <p>{icon}</p>
                  <h4>{title}</h4>
                </div>
                <h2>{value}</h2>
              </div>
            )
          })}
        </div>
        <div className="other-stats">
          <div className="stats-heading">
            <h3>Other Statistics</h3>
            <p>An overview showing the stats of other cryptos</p>
          </div>
          {genericStats.map(({ icon, title, value }) => {
            return(
              <div className="coin-stats">
                <div className="coin-stats-name">
                  <p>{icon}</p>
                  <h4>{title}</h4>
                </div>
                <h2>{value}</h2>
              </div>
            )
          })}
        </div>
      </div>
      <div className="details-desc">
        <div className="desc">
          <h2>What is <img src={cryptoDetails?.iconUrl} alt="coin icon" className="icon"/>{cryptoDetails.name}?</h2>
          <Interweave content={cryptoDetails.description} className="coin-desc"/>
        </div>
        <div className="coin-links">
          <h2>Links</h2>
          {cryptoDetails?.links?.map((link) => {
            return (
              <div className="coin-link">
                <h4>{link.type}</h4>
                <a href={link.url}>{link.name}</a>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default CryptoDetails
