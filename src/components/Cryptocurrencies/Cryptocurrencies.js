import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'

import Loader from '../Loader/Loader'

import { CloseSquareOutlined } from '@ant-design/icons'
import './Cryptocurrencies.css'

import { useGetCryptosListQuery } from '../../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching} = useGetCryptosListQuery(count)
  const [searchTerm, setSearchTerm] = useState('')
  const [cryptos, setCryptos] = useState();

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins)
    const filteredData = cryptosList?.data?.coins?.filter(coin => coin.name.toLocaleLowerCase().includes(searchTerm) || coin.symbol.toLocaleLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loader />

  return (
    <div className="currencies-box">
      {!simplified &&
        <div className="search">
            <input type="text" placeholder='Search cryptos' id="search-bar" onChange={e => setSearchTerm(e.target.value.toLocaleLowerCase())}/>
            <span 
              className="clear-btn"
              onClick={() => {
                setSearchTerm('')
                document.querySelector('#search-bar').value = ''
              }}
            >
              <CloseSquareOutlined style={{fontSize: '250%'}}/>
            </span>
          </div>
      }
      
      <div className="crypto-card-box">
        {cryptos?.map((currency) => (
          <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
            <div className="crypto-card">
              <div className="crypto-card-heading">
                <h3>
                  {currency.rank}. <font>{currency.name}</font> 
                </h3>
                <img src={currency.iconUrl} alt="coin icon" />
              </div>
              <p>{currency.symbol}</p>
              <p>Price: ${millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {millify(currency.change)}%</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Cryptocurrencies

