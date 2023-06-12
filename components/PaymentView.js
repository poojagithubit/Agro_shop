import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

const PaymentView = () => {
    //let tot=0;
    const [PaymentData, setPaymentData] = useState([])
    useEffect(() => { 
    getPayment();  
    });
      
    const getPayment = async() => {
        const result = await axios.get(`http://localhost:3001/paymentview`);
        setPaymentData(result.data);
        console.log(result.data);
          };
    
  return (
    <div>
      <div className='container-fluid mt-2'>

         <div className='row'>
            <h1> Payment Report </h1>
            <table className='table table-bordered table-hover mt-2'>
               <thead className='table-primary'>
                 <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Payment Date </th>
                    <th>Paid Amount </th>
                    <th>Transaction No </th>
                 </tr>
               </thead>

               <tbody>
               {
                 
                 PaymentData.map((data,index) => {

                     //let tot=0
                     // tot=tot+data.paid_amount
                      //console.log("total="+tot)
                    //grand_total=grand_total+data.paid_amount;
                    //console.log(grand_total)

                  //   tot = <div className='text-primary fs-4 fw-bold'> {tot}  </div>
                return(<tr key={data.id}>
                    <td>{index+1}</td>
                    <td><a href={`viewcustomers/${data.userid}`}>{data.id}  </a> </td>
                    <td>{data.payment_date}</td>
                    <td>{data.paid_amount} </td>
                    <td>{data.Transaction_no} </td>
                    <td></td>
                    
                </tr>)
             })

               
              
                    
              }
              
                 <tr className='bg-primary p-3 text-white'>
                    <td>Grand Total</td>
                    <td></td>
                    <td></td>
                    {/* <td className='bg-success text-white'>nnn</td> */}
                    <td>{PaymentData.reduce((total, item)=>total+(item.paid_amount),0)}</td>
                    <td></td>
                 </tr>
              
                
                </tbody> 
            </table>
         </div>
      </div>
    </div>
  )
}

export default PaymentView
