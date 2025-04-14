import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../Context/CoinContext'
import parse from 'html-react-parser'

const Infos = () => {

    const{coinId} = useParams()
    const{allCoin, currency, error} = useContext(CoinContext)
    const[coinData, setCoinData] = useState()




    const fetchCoinData = async () => {
      const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KnzmnR5AQmhiXqJb9wAtW625'}
      };
      
      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
        .then(respone => respone.json())
        .then(respone => setCoinData(respone))
        .catch(err => console.error(err));
    }

    useEffect(() =>{
      fetchCoinData()
    },[])

    if (error) {
      return <p className='py-20 px-10 font-bold flex justify-center items-center text-4xl h-[480px]'>Error: {error}</p>;
    }

      if(coinData){
        return (
         <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-center">
              <img src={coinData.image.large} alt={`${coinData.name} logo`} className="w-24 h-24"  />
            </div>

            <div>
              <div>
                <h1 className="text-2xl font-bold mb-4">What is {coinData.name}?</h1>
                <p className='prose max-w-none'>{parse(coinData.description.en || <p>No description available</p>)}</p>
              </div>
            </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl shadow">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Current Price</h3>
                <p className="text-xl font-semibold text-blue-400">{currency.symbol} {coinData.market_data.current_price.usd.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Market Cap</h3>
                <p className="text-xl text-blue-400 font-semibold">{currency.symbol} {coinData.market_data.market_cap.usd.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">24h Change</h3>
                <p
                  className={`text-xl font-semibold  ${
                   coinData. market_data.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Circulating Supply</h3>
                <p className="text-xl text-blue-400 font-semibold">{coinData.market_data.circulating_supply.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700">Total Supply</h3>
                <p className="text-xl text-blue-400 font-semibold">
                  {coinData.market_data.total_supply ? coinData.market_data.total_supply.toLocaleString() : 'N/A'}
                </p>
              </div>
              </div>
             </div>
        )
      }else{ return(
        <div className='h-screen flex items-center justify-center'>
        <div className="flex justify-center items-center h-full">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    </div> 
      )

      }
 
}

export default Infos