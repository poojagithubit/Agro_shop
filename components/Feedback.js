import React, { useState } from 'react'
import axios from 'axios'

const uid=localStorage.getItem('user')

const Feedback = () => {
    const initialValues = {userid:"",about_product:"",about_service:""}
    const [formValues,setFormvalues] = useState(initialValues)
  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormvalues({ ...formValues,[name]:value});
        //console.log(formValues)
        console.log(formValues.name)
    }

    const FormFeedback=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/feedback",{
        feedbackdata:formValues,
        uid:uid    
        
        }).then((response)=>{
            console.log(response);
            alert("Thank you for your Feedback")
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

                <h1> Send Your Valid Feedack</h1>

                <form onSubmit={FormFeedback}>

                <div className='mb-3 mt-3'>
                    <input type='text' name='userid' className='form-control' value={formValues.userid}
                    placeholder='userid' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 mt-3'>
                    <input type='text' name='about_product' className='form-control' value={formValues.about_product} 
                    placeholder='About Product' onChange={handleChange} required/>
                </div>    

                <div className='mb-3 mt-3'>
                    <input type='text' name='about_service' className='form-control' value={formValues.about_service} 
                    placeholder='About Service' onChange={handleChange}  required/>
                </div>

                <p> <button className='btn btn-success'> Feedback </button> </p>

                </form>
                   
            </div>
        </div>
   
    </div>
  )
}

export default Feedback
