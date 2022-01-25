import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function DonutGender(){
    const [state,setState]=useState({
        options: {},
        series: [44, 55],
        labels: ['A', 'B']
      }
        )
    useEffect(()=>{
        fetch("/filter_gender").then(res=>res.json()).then(data=>{
            console.log("response is ",data)
            setState({
                options: {
                    chart: {
                      id: "chart-id"
                    }
                  },
                series: [
                data[0].Premium,data[1].Premium],
                chartOptions:{
                labels: [data[0]._id,data[1]._id]
                }
            })
        })
        
    },[])
    return(
        <div className="donut">
        <Chart options={state.options} series={state.series} type="donut" width="380" />
      </div>
    )
}