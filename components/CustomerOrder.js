//rafce
import React, { useState } from 'react'
import axios from 'axios'


const CustomerOrder = () => {
    const initialValues = {userid:"",product_name:"",qty:"",price:"",total:"", order_date:"",order_time:"",payment_status:"",order_status:"",p_id:""}
    const [formValues,setFormvalues] = useState(initialValues)
  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormvalues({ ...formValues,[name]:value});
        console.log(formValues)
        //console.log(formValues.name)
    }

    const FormCustomerOrder=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/customerorder",{
        customerorderdata:formValues    
        
        }).then((response)=>{
            console.log(response);
            alert("Thank you for Response")
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

                <form onSubmit={FormCustomerOrder}>

                <div className='mb-3 mt-3'>
                    <input type='text' name='userid' className='form-control' value={formValues.userid}
                    placeholder='Enter your userid' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='product_name' className='form-control' value={formValues.product_name}  
                    placeholder='Enter your product name' onChange={handleChange}  required/>
                </div>                               

                <div className='mb-3 mt-3'>
                    <input type='text' name='qty' className='form-control' value={formValues.qty}
                    placeholder='Enter your quantity' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='price' className='form-control' value={formValues.price}
                    placeholder='Enter price' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='total' className='form-control' value={formValues.total}
                    placeholder='Enter Total Amount' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='order_date' className='form-control' value={formValues.order_date}
                    placeholder='Enter Date' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='order_time' className='form-control' value={formValues.order_amount}
                    placeholder='Enter Order Time' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='payment_status' className='form-control' value={formValues.payment_status}
                    placeholder='Enter payment_status' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='order_status' className='form-control' value={formValues.order_status}
                    placeholder='Enter Order Status' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='p_id' className='form-control' value={formValues.p_id}
                    placeholder='Enter your p_id' onChange={handleChange}  required/>
                </div>

                    <input type='submit' className='btn btn-success' value='Login'/>

                </form>
                   
            </div>
        </div>
      
         
      
    </div>
  )
}

export default CustomerOrder
