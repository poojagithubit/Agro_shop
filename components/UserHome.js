import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

const UserHome = () => {
    const getuseremail=localStorage.getItem('user')
    //const utype=localStorage.getItem('log')
    const [ProductList, setProductList] = useState([])
    //const utype=localStorage.getItem('log')

    useEffect(() => { 
        getProducts();   
      }, []);
  
      const getProducts = async() => {
        const result = await axios.get("http://localhost:3001/productview");
        setProductList(result.data);
        console.log(result.data);
      };

  return (
    <div>
      <div className='container-fluid bg-warning mt-3 p-3'>
        <div className='row'>
            <h1 className='text-white'>Organic Agro Products</h1>
            <p><button className='btn btn-warning text-white'> Welcome: {getuseremail} </button></p>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row mt-2'>
            <h3 className='text-danger'>Agro Products</h3>
            <div className="divider py-1 bg-success"></div>
             {
                 ProductList.map((data,index) => {
            return(<div className='col-lg-3 mt-2' key={data.id}>
                <h5> {data.product_name}</h5>
                <p> <img src={`../upload/${data.image}`} alt='not found' width={200} height={200}></img></p>
                <p> ₹ {data.price}/-</p>
               
                <p> <button className='btn btn-danger text-white' style={{width:"200px",fontSize:"18px"}}><a href={`/sendorder/${data.id}`} style={{textDecoration:"none",color:"white"}}> Buy </a> </button></p>
            </div>)
            }
                 )}
           
        </div>
     </div>
    </div>
  )
}

export default UserHome
