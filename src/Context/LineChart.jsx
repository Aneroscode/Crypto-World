import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'





const LineChart = (historyData) => {

    const [data, setData] = useState([['Date','Prices']])

    useEffect(() =>{
        let dataCopy = [['Date', 'Prices']]
        if(historyData.historyData.prices){
            historyData.historyData.prices.map((item) =>{
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            
            setData(dataCopy)

            
        }

        
    },[historyData])

    
    const options = {
        chart: {
          title: "Price History (Last 10 Days)",
          subtitle: 'Based on selected currency'
        },
        backgroundColor: 'transparent',
        colors: ["#0f52ba"],
        lineWidth: 4,
        pointSize: 6,
        curveType: "function",
        legend: { position: "none" },

        hAxis: {
          textStyle: { color: "#ffffff", fontSize: 12 },
          gridlines: { color: "#e0e0e0" },
        },

        vAxis: {
          textStyle: { color: "#ffffff", fontSize: 12 },
          gridlines: { color: "#f0f0f0" },
        },

        tooltip: {
          textStyle: { color: "#0f52ba", fontSize: 14 },
          showColorCode: true,
        },  
      };

  return (
    <Chart
        chartType='LineChart'
        data={data}
        height= '100%'
        legendToggle
        options={options}
    
    />
  )
}

export default LineChart