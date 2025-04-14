
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Coin from './Pages/Coin'
import Footer from './components/footer'
import Infos from './Pages/Infos'
import Cryptos from './Pages/Cryptos'


function App() {
 
  return (
   <div className='min-h-screen text-white bg-linear-to-b from-[#003366] to-[#040911] '>
     
     <Navbar/>
      
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/coin/:coinId' element={<Coin/>}></Route>
      <Route path='/infos/:coinId' element={<Infos/>}/>
      <Route path='/cryptos' element={<Cryptos/>}/>
     </Routes>

     <Footer/>

   </div>
  )
}

export default App
