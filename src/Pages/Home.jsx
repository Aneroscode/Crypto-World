import React, { useContext, useEffect, useRef, useState } from 'react'
import { CoinContext } from '../Context/CoinContext'
import AliceCarousel from 'react-alice-carousel'
import background from '../assets/background.jpg'
import coin from '../assets/coin2.png'
import { Link } from 'react-router-dom'
import CryptoNews from '../components/CryptoNews'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ArrowBigDown, ArrowDownRight, ArrowUpRight } from 'lucide-react'


const Home = () => {

      const homeRef = useRef(null);
        const isInView = useInView(homeRef, { once: false, threshold: 0.3 });
        const controls = useAnimation()


         useEffect(() => {
              if (isInView) {
                controls.start('visible');
              } else {
                controls.start('hidden');
              }
            }, [isInView, controls])
        
        
        
            const variants = {
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut',
                },
              },
            };


    const{allCoin, currency} = useContext(CoinContext)
    const[displayCoin, setDisplayCoin] = useState([])
    const[input, setInput] = useState('')
    
    const inputFuction = (e) => {
        setInput(e.target.value)
        if(e.target.value === ''){
          setDisplayCoin(allCoin)
        }
    }

    const searchFuction = async (e) => {
        e.preventDefault()
        const data = await allCoin.filter((item) => {
          return item.name.toLowerCase().includes(input.toLowerCase())
        })

        setDisplayCoin(data)

        
    }

    const responsive = {
      0: {
        items : 1
      }, 
      512: {
        items :3
      },
    }

    

    useEffect(() => {
      setDisplayCoin(allCoin)
    },[allCoin, currency])

  return (
    

    <div className='flex  flex-col pb-28   ' >

        <div className=' flex flex-col md:px-28 px-8 py-36 gap-8  bg-cover bg-center bg-no-repeat relative' style={{backgroundImage: `url(${background})`}}>

          
          <div className='flex flex-col md:flex-row w-full gap-4  '>

            <div className="text-center md:text-left md:mt-20">
              <motion.h1
              ref={homeRef}
               initial='hidden'
               variants={variants}
               animate={controls}
               transition={{ duration: 0.8, delay: 0.2 }}
              
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                Get Real-Time Cryptocurrency Insights
              </motion.h1>
            
              <motion.p
              ref={homeRef}
               initial='hidden'
               variants={variants}
               animate={controls}
               transition={{ duration: 0.8, delay: 0.4 }}
              
              className="font-medium text-sm sm:text-base md:text-lg mt-4 sm:mt-6 text-gray-200 max-w-xl leading-relaxed">
                Your go-to platform for everything crypto — prices, charts, news, and more.
                <br className="hidden md:block" />
                <span className="text-white font-semibold">Explore the world of digital currencies</span> with confidence.
              </motion.p>
            </div>


            <div className=' w-full md:w-1/2 px-6 md:px-12 mt-10 md:mt-0 flex justify-center   '>

             <motion.img 
              initial='hidden'
              variants={variants}
              animate={controls}
              transition={{ duration: 1, delay: 0.5 }}
             
             className='w-72 sm:w-80 md:w-[22rem] lg:w-[26rem] xl:w-[30rem] object-contain  ' src={coin} alt="pic" />
            </div>

          </div>


          <AliceCarousel
               mouseTracking
               infinite
               autoPlayInterval={0}
               animationDuration={3000}
               disableDotsControls
               disableButtonsControls
                responsive={responsive}
                autoPlay
                items={  displayCoin.map((coin,i) =>{
                  return(
                    
                    <div className='bg-white/10 shadow-lg p-4 backdrop-filter backdrop-blur-md w-80 rounded-xl border border-white/20  text-white flex h-40 mt-20'>

                    <div className='w-1/2 space-y-8'>
                      <div className=' flex flex-col gap-4 items-center'>
                        <img className='w-20' src={coin.image} alt={coin.name} />
                        <p className='text-lg'>{coin.name}</p>
                      </div>
  
                     
                    </div>
  
                    <div className='w-1/2 pl-10 flex justify-center items-center '>
                    <div>
                        <p className='text-xl font-bold'> {currency.symbol} {coin.current_price}</p>
                        <p className={coin.price_change_percentage_24h>0? 'text-green-500 text-xl font-bold' : 'text-red-500 font-bold text-xl' } >
                        {Math.floor(coin.price_change_percentage_24h*100)/100} %</p>
                      </div>
                    </div>
  
                  </div>
                  )
                })}
              
              />

                
         

            <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
            
            onSubmit={searchFuction} className='flex flex-col sm:flex-row items-center sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto px-4 mt-20  '>
                <input className= 'bg-white text-[#0f52ba] py-2 px-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none pl-10 text-[16px] border-0 outline-0 w-full sm:flex-1' onChange={inputFuction} list='coinlist' value={input} required type='text' placeholder='Search crypto...'/>

                <datalist id='coinlist'>
                  {allCoin.map((item,i) =>(<option key={i} value={item.name}/>))}

                </datalist>

                <button className='bg-[#003366] text-white px-6 py-2 w-full sm:w-auto rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none border-0 cursor-pointer  hover:bg-blue-900' type='submit'>Search</button>
            </motion.form>
        </div>

        
      <div className='my-14 px-4 md:px-10'>

        <h1 className='text-4xl font-bold py-4 text-center '>Market Update</h1>

       
      </div>


      {displayCoin.slice(0, 10).map((item, i) => (
        <motion.div
          whileHover={{scale:1.02}}
          key={item.id}
          variants={variants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.05 }}
         >
          <Link
              to={`/coin/${item.id}`}
              className="grid grid-cols-1 md:grid-cols-5 gap-y-3 md:gap-4 md:px-8 px-4 py-4 border-b border-blue-900 text-white hover:bg-blue-950 transition-all duration-300"
            >
              {/* Rank */}
              <div className="flex justify-between md:block">
              <p className="text-gray-400 text-xs md:text-sm">Rank</p>
                <p className="text-sm md:text-base font-medium">{item.market_cap_rank}</p>
              </div>

              {/* Coin Info */}
              <div className="flex items-center gap-3">
                <img className="w-8 h-8 object-contain" src={item.image} alt={item.name} />
                <div>
                <p className="text-gray-400 text-xs md:text-sm">Coin</p>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-400 uppercase">({item.symbol})</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between md:block">
                <p className="text-gray-400 text-xs md:text-sm">Price</p>
                <p className="text-sm md:text-base">{currency.symbol} {item.current_price.toLocaleString()}</p>
              </div>

              {/* 24hr Change */}
              <div className="flex justify-between md:block">
                <p className="text-gray-400 text-xs md:text-sm">24h Change</p>
                <p className={`${item.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500 '} text-sm md:text-base flex items-center gap-1`}>
                {item.price_change_percentage_24h > 0 ? (
                    <ArrowUpRight size={16} />
                  ) : (
                      <ArrowDownRight size={16} />
                    )}
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                </p>
              </div>

              {/* Market Cap */}
              <div className="flex justify-between md:block">
                <p className="text-gray-400 text-xs md:text-sm">Market Cap</p>
                <p className="text-sm md:text-base">{currency.symbol} {item.market_cap.toLocaleString()}</p>
              </div>
          </Link>
       </motion.div>
))}


      <div className=' min-h-screen py-16'>
        <h1 className='text-3xl font-bold text-center mb-8'>Crypto News Update</h1>
          <CryptoNews/>
      </div>
        

    </div>
  )
}

export default Home