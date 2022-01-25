import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import CircularProgress from '@mui/material/CircularProgress';
export function ChartComponent(props) {
    const [fetchedData,setFetchedData] = useState([]);
    const [loading,setLoading]=useState(true);
    const [state,setState]=useState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
          }
        },
        series: [
          {
            name: "Premium",
            data: [10,10,10,10,10,10,10,10,10,10,10,10]
          }
        ]
    })
    useEffect(async()=>{
     await fetch(`/filter/${props.region}`).then(res=>res.json()).then(data => 
      {
        data.sort((a,b)=>{return a._id-b._id})
        let temp=new Array(12).fill(0)
        for(let i of data){
          temp[parseInt(i._id) -1]=i.Premium
        }
        setState({
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            }
          },
          series: [
            {
              name: "Premium",
              data: temp
            }
          ]
        })
        console.log(state)
        setLoading(false);
      })
    setLoading(false)
    },[state.series.data,props])
    return (
     
        <div className="mixed-chart">
        {loading ? (
          <CircularProgress />):(
        <Chart
           style= {{width:"100%"}}
          options={state.options}
          series={state.series}
          type="bar"
          width="900"
        />)}
      </div>
  )
  }
