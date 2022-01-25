import React, { useEffect, useState } from "react";
import DonutChart from 'react-donut-chart';

export default function DonutGender(){
    const [state,setState]=useState(
        [
            {
              label: 'Male',
              value: 25,
            },
            {
              label: 'Female',
              value: 75,
            },
          ]
        )
    useEffect(()=>{
        fetch("/filter_gender").then(res=>res.json()).then(data=>{
            console.log("response is ",data)
            setState([{
                    label: data[0]._id,
                    value: data[0].Premium,
                  },
                  {
                    label: data[1]._id,
                    value: data[1].Premium,
                  }]
            )
        })
        
    },[])
    return(
        <div className="donut">
        <DonutChart
        height="350"
        width="480"
  data={state}
/>;
      </div>
    )
}

