import React, { useContext, useState } from 'react'
import { CoinContext } from '../Context/CoinContext'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {

  const {setCurrency} = useContext (CoinContext) 

  const [menuOpen, setMenuOpen] = useState(false);

  const currencyHandler = (e) => {
        switch (e.target.value){
            case'usd': {
              setCurrency({name: 'usd' , Symbol: '$'})
              break
            }

            case 'eur': {
              setCurrency({ name: 'eur', symbol: '€' });
              break;
            }
            case 'inr': {
              setCurrency({ name: 'inr', symbol: '₹' });
              break;
            }

            default : {
              setCurrency({name : 'usd', Symbol: '$'})
            }
        }
        
    }
  

  return (
    

    <nav className="bg-blue-950 text-white">
    <div className="flex items-center justify-between py-6 md:px-28 px-6">
      
      <Link to="/">
        <h3 className="font-bold text-2xl">CRYPTO-WORLD</h3>
      </Link>

      
      <ul className="hidden md:flex items-center gap-8">
        <li><Link to="/" className="hover:border-b-2 pb-1">Home</Link></li>
        <li className="hover:border-b-2 pb-1 "><Link to='/cryptos'>Coins</Link></li>
        
      </ul>

      
      <div className="hidden md:flex items-center gap-6">
        <select
        
          onChange={currencyHandler}
          className="px-5 py-1 border border-white rounded-xl " >
          <option className='text-blue-700' value="usd">USD</option>
          <option className='text-blue-700' value="eur">EUR</option>
          <option className='text-blue-700' value="inr">INR</option>
          
        </select>

       
      </div>

     
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>

    
    {menuOpen && (
      <ul className="md:hidden px-6 pb-6 space-y-4 cursor-pointer bg-blue-950">
        <li className='hover:text-white/70'><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li className='hover:text-white/70'><Link to='/cryptos' onClick={() => setMenuOpen(false)}>Coins</Link></li>
      
        <li>
          <select
          
            onChange={currencyHandler}
            className="w-full px-4 py-2 border border-white rounded-xl text-blue-700"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
        </li>
        <li>
         
        </li>
      </ul>
    )}
  </nav>
  )
}

export default Navbar