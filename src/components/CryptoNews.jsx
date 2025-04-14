import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion';

const CryptoNews = () => {

    const newsRef = useRef(null);
    const isInView = useInView(newsRef, { once: false, threshold: 0.3 });
    const controls = useAnimation()

    useEffect(() => {
      if (isInView) {
        controls.start('visible');
      } else {
        controls.start('hidden'); // 👈 hide again when out of view
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
  


    const [news, setNews] = useState([]);
    const[error, setError] = useState(null)
    const[loading, setLoading] = useState(false)

    // useEffect(() => {
    //     fetch('https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=10')
    //       .then(response => response.json())
    //       .then(data => setNews(data))
    //       .catch(err => setError(err.message));
    //   }, []);


    const baseUrl = 'https://data-api.coindesk.com/news/v1/article/list';
    const params = {"lang":"EN","limit":12};
    const url = new URL(baseUrl);
    url.search = new URLSearchParams(params).toString();



  const fetchNews = async () => {
  const options = {
      method: 'GET',
      headers:  {"Content-type":"application/json; charset=UTF-8"},
   };

      fetch(url, options)
          .then(response => response.json())
          .then(response => setNews(response.Data))
          .catch(err  => setError(err.message))
          
  }

  useEffect(() => {
    fetchNews()
  },[])

      if (error) {
        return <p className='py-20 px-10 font-bold flex justify-center items-center text-4xl h-[480px]'>Error: {error}</p>;
      }
   

      if(news){
      return (
        <motion.div
        ref={newsRef}
        variants={variants}
        initial= 'hidden'
        animate={controls}
        transition={{ duration: 0.8, delay: 0.2 }}
        
        className="max-w-6xl mx-auto px-4 py-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.ID}
              className="bg-[#003366] shadow-md rounded-2xl overflow-hidden transition transform hover:scale-110"
            >
              <img
                src={item.IMAGE_URL}
                alt={item.TITLE}
                className="w-full text-blue-500 h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg text-white font-semibold mb-2">{item.TITLE}</h2>
                <p className="text-sm text-blue-300 line-clamp-3">{item.BODY}</p>
                <a
                  href={item.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </motion.div>
      );

    } else{
      return(
        <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      )
    }
      
}

export default CryptoNews