import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CoinContext } from '../Context/CoinContext'
import { Line } from 'react-chartjs-2'
import LineChart from '../Context/LineChart'






const Coin = () => {

  const{coinId} = useParams()

  const[coinData, setCoinData] = useState()

  const[historyData, setHistoryData] = useState()

  const[days, setDays] = useState(1)

  const[loading, setLoading] =useState(true)

  const[error, setError] = useState(null)

  const {currency} = useContext(CoinContext)

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KnzmnR5AQmhiXqJb9wAtW625'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(respone => respone.json())
      .then(respone => setCoinData(respone))
      .catch(err => setError(err.message));
  }

  console.log(coinData)

  const fetchHistoryData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KnzmnR5AQmhiXqJb9wAtW625'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(respone => respone.json())
      .then(respone => setHistoryData(respone))
      .catch(err => setError(err.message));
  }

  useEffect(() =>{
    fetchCoinData()
    fetchHistoryData()
  },[currency])


 

  if (error) {
    return <p className='py-20 px-10 font-bold flex justify-center items-center text-4xl h-[480px]'>Error: {error}</p>;
  }


  

  if(coinData, historyData){
    return (
      <div className=' w-[100%] flex flex-col md:flex md:flex-row mb-10 py-10' >
        <div className=' md:flex md:items-center gap-3  md:border-r-2 md:w-[30%] w-[100%] flex items-center flex-col justify-center '>
          <div className='md:flex md:flex-col gap-5 '>
            <img className='md:w-56 w-56' src={coinData.image.large} alt="" />
            <p className='text-4xl text-center'><b>{coinData.name} ({coinData.symbol.toUpperCase()}) </b></p>
          </div>
          <div className='px-6 space-y-2'>
            <p className='w-[100%]   text-justify'>{coinData.description.en.split('. ')[0]}</p>
            <Link  to={`/infos/${coinData.id}`} className='py-2  px-7 bg-white/10 rounded-xl hover:bg-white/20 '>
              More...
            </Link>
          </div>

          <div  className='mr-16 mt-5 text-start '>
            <p className='text-lg font-bold'>Rank: {coinData.market_cap_rank}</p>
            <p className='text-lg font-bold'>Current Price: {currency.symbol}{coinData.market_data.current_price.usd.toLocaleString()}</p>

            <p className='text-lg font-bold'>Market Cap: {currency.symbol}{coinData.market_data.market_cap.usd.toLocaleString()} </p>
          </div>

        </div>

        <div className='md:w-[70%] md:flex md:flex-col w-[100%]  p-[40px] mt-[25px] ' >
         

          <LineChart historyData ={historyData}/>
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

export default Coin