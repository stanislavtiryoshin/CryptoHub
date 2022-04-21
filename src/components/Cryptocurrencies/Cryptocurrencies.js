import React from 'react'
import millify from 'millify'
import './Cryptocurrencies.css'

import { useGetCryptosListQuery } from '../../services/cryptoApi'

function Cryptocurrencies() {

  const { data: cryptosList, isFetching} = useGetCryptosListQuery();

  if (isFetching) return 'Loading...'

  console.log(cryptosList[1])

  return (
    <>
      <div className="crypto-card-box">
        {cryptosList.slice(0, 10).map((currency) => (
          <div className="crypto-card" key={currency.id}>
            <h3 className="crypto-card-heading">
              {currency.rank}. <font>{currency.name}</font>
            </h3>
            <p>Price: ${millify(currency.quotes.USD.price)}</p>
            <p>Market Cap: {millify(currency.quotes.USD.market_cap)}</p>
            <p>Daily Change: {millify(currency.quotes.USD.percent_change_24h)}%</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Cryptocurrencies

