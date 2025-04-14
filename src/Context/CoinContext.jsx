import axios from "axios";
import { createContext, use, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const[error, setError] = useState(null)
    const[currency, setCurrency] = useState({
        name:'usd',
        Symbol: '$'
    })

        const fetchCoin = async () => {
        
            const options =  {
                method: 'GET',
                headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-KnzmnR5AQmhiXqJb9wAtW625'}
              };
              
              fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
                .then(response => response.json())
                .then(response => setAllCoin(response))
                .catch(err => setError(err.message));
                
         }

    useEffect(() => {
        fetchCoin()
    },[currency])
         
         
            
    const contextValue =  {
        allCoin, currency, setCurrency, error
    }

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

}

export default CoinContextProvider