import React from 'react';
import { useGetGlobalsQuery } from '../../services/cryptoApi';
import millify from 'millify';

import './Globals.css'

function Globals() {
  
  const { data, isFetching } = useGetGlobalsQuery()

  if (isFetching) return 'Loading...'

  return (
    <div className='globals-box'>
      <h3 className="globals-heading">BTC market share: <font>{millify(data?.data?.btcDominance)}%</font></h3>
      <h3 className="globals-heading">Total coins: <font>{millify(data?.data?.totalCoins)}</font></h3>
      <h3 className="globals-heading">Total markets: <font>{millify(data?.data?.totalMarkets)}</font></h3>
      <h3 className="globals-heading">Market cap: <font>${millify(data?.data?.totalMarketCap)}</font></h3>
      <h3 className="globals-heading">Traded in 24h: <font>${millify(data?.data?.total24hVolume)}</font></h3>
    </div>
  )
}

export default Globals