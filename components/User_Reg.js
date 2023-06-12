import React, { useState } from 'react'
import axios from 'axios'

const User_Reg = () => {
    const initialValues = {name:"",city:"",address:"",pincode:"",contact:"",email:"", password:""}
    const [formValues,setFormvalues] = useState(initialValues)
  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormvalues({ ...formValues,[name]:value});
        //console.log(formValues)
        console.log(formValues.name)
    }

    const FormUser_Reg=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/user_reg",{
        user_regdata:formValues    
        
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

                <form onSubmit={FormUser_Reg}>

                <div className='mb-3 mt-3'>
                    <input type='text' name='name' className='form-control'  value={formValues.name} 
                    placeholder='Enter your name' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='city' className='form-control'   value={formValues.city}
                    placeholder='Enter your city' onChange={handleChange}  required/>
                </div>                

                <div className='mb-3 mt-3'>
                    <input type='text' name='address' className='form-control'  value={formValues.address}
                    placeholder='Enter your address' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='pincode' className='form-control'  value={formValues.pincode}
                    placeholder='Enter your pincode' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='contact' className='form-control'  value={formValues.contact}
                    placeholder='Enter contact' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='email' name='email' className='form-control'  value={formValues.email}
                    placeholder='Enter your email' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='password' name='password' className='form-control' value={formValues.password}
                    placeholder='Enter your password' onChange={handleChange}  required/>
                </div>

                    <input type='submit' className='btn btn-success' />

                </form>
                   
            </div>
        </div> 
      
    </div>
  )
}

export default User_Reg






