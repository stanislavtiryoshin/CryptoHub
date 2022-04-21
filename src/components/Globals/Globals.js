import React from 'react';
import { useGetGlobalsQuery } from '../../services/cryptoApi';
import millify from 'millify';

import './Globals.css'

function Globals() {
  
  const { data, isFetching } = useGetGlobalsQuery()

  if (isFetching) return 'Loading...'

  return (
    <div className='globals-box'>
      <h3 className="globals-heading">Bitcoin market share: <font>{millify(data.bitcoin_dominance_percentage)}%</font></h3>
      <h3 className="globals-heading">Total coins: <font>{millify(data.cryptocurrencies_number)}</font></h3>
      <h3 className="globals-heading">Market cap: <font>{millify(data.market_cap_ath_value)}</font></h3>
      <h3 className="globals-heading">Traded in 24h: <font>{millify(data.volume_24h_usd)}</font></h3>
    </div>
  )
}

export default Globals