import React from 'react'

import { useState, useEffect } from "react";
import axios from 'axios';

const Display_AddProducts = ()  => {
  const [products,setproducts] = useState([])

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async() => {
    const result = await axios.get("http://localhost:3001/display_addproducts");
    setproducts(result.data);
    console.log(result.data);
  };

  const deleteUser = id => {
    axios.delete(`http://localhost:3001/display_addproducts/delete/${id}`)
    .then(response =>{
      getuser();
    });
  }

  return (
    <div>
        
    <div className='container mt-2'>
      
    <div className='row'>
    <table className="table table-bordered table-striped table-hover">

    <thead className='bg-dark text-white'>
        <th>#</th>
        <th>category</th>
        <th>product_name</th>
        <th>uom</th>
        <th>qty</th>
        <th>price</th>
        <th>image</th>
        <th>stock</th>
        <th colspan={2}> Action </th>
    </thead> 

    <tbody>
        { products.map((val,key) => {
    return(
      <tr>
        <td>{key+1}</td>
        <td>{val.category}</td>
        <td>{val.product_name}</td>
        <td>{val.uom}</td>
        <td>{val.qty}</td>
        <td>{val.price}</td>
        <td>{val.image}</td>
        <td>{val.stock}</td>
        <td><img src={`../upload/${val.image}`} alt='not found' width={100} height={100}/></td>
        <td><button className='btn btn-primary' onClick={() => deleteUser(val.id)}> Delete </button></td>
      </tr>
    )
      })}
    </tbody> 

    </table>
    </div> 

    </div>
    </div>
  )
}

export default Display_AddProducts
