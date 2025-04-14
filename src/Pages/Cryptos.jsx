import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../Context/CoinContext'
import { Link } from 'react-router-dom'

const Cryptos = () => {

     const{allCoin, currency, error} = useContext(CoinContext)
     const[token, setToken] = useState([])
    
   
   useEffect ( () => {
        setToken(allCoin)
   },[allCoin, currency])

   if (error) {
    return <p className='py-20 px-10 font-bold flex justify-center items-center text-4xl h-[480px]'>Error: {error}</p>;
  }
   
    return (
        <div>
            <div className='grid grid-cols-2 sm:grid-col-3 md:grid-col-4 lg:grid-cols-5 gap-6 mt-6 px-6'>
            {
                token.map((item,i) =>{
                    return(
                        <Link to={`/coin/${item.id}`}  key={i}  className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:scale-105 text-center"
                        >

                            <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 mx-auto mb-3"
                                />

                            <h2 className="text-white font-semibold text-lg">{item.name}</h2>
                            <p className="text-gray-300 text-sm uppercase mt-1">{item.symbol}</p>

                            <p className="mt-2 text-blue-300 font-medium">
                               {currency.symbol} {item.current_price?.toLocaleString() ?? 'N/A'}
                            </p>

                            <div className="mt-3">
                                <button className="mt-2 text-sm text-blue-500 hover:underline">
                                View More →
                                </button>
                            </div>
                        
    
                       </Link>
                    )
                }
                  
                   
                   
                   
                   
                )
            }
            </div>
        </div>
    )
   
            
  
}

export default Cryptos