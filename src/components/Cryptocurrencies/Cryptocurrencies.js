import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'

import { CloseSquareOutlined } from '@ant-design/icons'
import './Cryptocurrencies.css'

import { useGetCryptosListQuery } from '../../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  let count = simplified ? 10 : 100
  const { data: cryptosList, isFetching} = useGetCryptosListQuery(count)
  const [cryptos, setCryptos] = useState()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredData = cryptosList?.filter(coin => coin.name.toLocaleLowerCase().includes(searchTerm) || coin.symbol.toLocaleLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return 'Loading...'

  console.log(cryptosList)

  return (
    <>
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
          <Link to="/" key={currency.id}>
            <div className="crypto-card">
              <div className="crypto-card-heading">
                <h3>
                  {currency.rank}. <font>{currency.name}</font> 
                </h3>
                <h3>{currency.symbol}</h3>
              </div>
              <p>Price: ${millify(currency.quotes.USD.price)}</p>
              <p>Market Cap: {millify(currency.quotes.USD.market_cap)}</p>
              <p>Daily Change: {millify(currency.quotes.USD.percent_change_24h)}%</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Cryptocurrencies

