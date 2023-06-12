import { useState, useEffect } from "react";
import axios from 'axios';

const Display_CustomerOrder = ()  => {
  const [orders,setorders] = useState([])

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async() => {
    const result = await axios.get("http://localhost:3001/display_customerorder");
    setorders(result.data);
    console.log(result.data);
  };

  const deleteUser = id => {
    axios.delete(`http://localhost:3001/display_customerorder/delete/${id}`)
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
        <th>userid</th>
        <th>product_name</th>
        <th>qty</th>
        <th>price</th>
        <th>total</th>
        <th>order_date</th>
        <th>order_time</th>
        <th>payment_status</th>
        <th>order_status</th>
        <th>p_id</th>
        <th colspan={2}> Action </th>
    </thead> 

    <tbody>
        { orders.map((val,key) => {
    return(
      <tr>
        <td>{key+1}</td>
        <td>{val.userid}</td>
        <td>{val.product_name}</td>
        <td>{val.qty}</td>
        <td>{val.price}</td>
        <td>{val.total}</td>
        <td>{val.order_date}</td>
        <td>{val.order_time}</td>
        <td>{val.payment_status}</td>
        <td>{val.order_status}</td>
        <td>{val.p_id}</td>
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

export default Display_CustomerOrder
