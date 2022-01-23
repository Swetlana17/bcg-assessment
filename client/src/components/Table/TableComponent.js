import React, { useState,useEffect } from 'react';
import './styles.css'

function TableComponent(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetch("/data").then(res=>res.json()).then(data => setData(data))
        },[])
    return(
    <div className='tableProperty'>
<h1>Table </h1>
      <table>
      <thead>
      <tr>
        <th>Policy_id</th>
        <th>Date of Purchase</th>
        <th>Customer_id</th>
        <th>Fuel</th>
        <th>VEHICLE_SEGMENT</th>
        <th>Premium</th>
        <th>bodily injury liability</th>
        <th>personal injury protection</th>
        <th> property damage liability</th>
        <th>collision</th>
        <th> comprehensive</th>
        <th>Customer_Gender</th>
        <th>Customer_Income group</th>
        <th>Customer_Region</th>
        <th>Customer_Marital_status</th>
      </tr>
      </thead>
      <tbody>
      {data.length>0 &&
        data.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.Policy_id}</td>
            <td>{val['Date of Purchase']}</td>
            <td>{val.Customer_id}</td>            
            <td>{val.Fuel}</td>
            <td>{val.VEHICLE_SEGMENT}</td>
            <td>{val.Premium}</td>            
            <td>{val['bodily injury liability']}</td>
            <td>{val[' personal injury protection']}</td>
            <td> {val[' property damage liability']}</td>
            <td>{val[' collision']}</td>
            <td> {val[' comprehensive']}</td>
            <td>{val.Customer_Gender}</td>
            <td>{val['Customer_Income group']}</td>
            <td>{val.Customer_Region}</td>
            <td>{val.Customer_Marital_status=="0"?"Unmarried":"Married"}</td>
          </tr>
         
        )
      })
    }
    </tbody>
      </table>
      </div>
    )
}

export default TableComponent;

