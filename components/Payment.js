import React, { useState } from 'react'
import axios from 'axios'

const Payment = () => {
    const initialValues = {userid:"",	orderid:"",paid_amount:"",payment_date:"",Transaction_no:""}
    const [formValues,setFormvalues] = useState(initialValues)
  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormvalues({ ...formValues,[name]:value});
        console.log(formValues)
        //console.log(formValues.name)
    }

    const FormPayment=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/payment",{
        paymentdata:formValues    
        
        }).then((response)=>{
            console.log(response);
            alert("Thank you for Registration")
            window.location="http://localhost:3000/login"           
        })

        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div>
      
      <div className='container'>
            <div className='row'>

                <form onSubmit={FormPayment}>

                <div className='mb-3 mt-3'>
                    <input type='text' name='userid' className='form-control' value={formValues.userid}
                    placeholder='Enter your userid' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='orderid' className='form-control' value={formValues.orderid} 
                    placeholder='Enter your orderid' onChange={handleChange}  required/>
                </div>                

                <div className='mb-3 mt-3'>
                    <input type='text' name='paid_amount' className='form-control' value={formValues.paid_amount}
                    placeholder='Enter your amount' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='payment_date' className='form-control' value={formValues.payment_date}
                    placeholder='Enter Payment date' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='Transaction_no' className='form-control' value={formValues.Transaction_no}
                    placeholder='Transaction no ' onChange={handleChange}  required/>
                </div>

                <input type='submit' className='btn btn-success' value='Login'/>

                </form>
                   
            </div>
        </div>
      
    </div>
  )
}

export default Payment
