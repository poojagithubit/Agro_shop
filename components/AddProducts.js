import { useState,useEffect } from "react";
import axios from 'axios'

const AddProducts = () => {

    const [CatList, setCatList] = useState([])
    //const utype=localStorage.getItem('log')
    useEffect(() => { 
        getCategory();   
      }, []);
  
      const getCategory = async() => {
        const result = await axios.get("http://localhost:3001/catview");
        setCatList(result.data);
        console.log(result.data);
      };


    const initialValues = {category:"",	product_name:"",uom:"",qty:"",price:"",image:"", stock:""}
    const [formValues,setFormvalues] = useState(initialValues)
    const [file,setFile] = useState("") 
  

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormvalues({ ...formValues,[name]:value});
        //console.log(formValues)
        //console.log(formValues.name)
    }

    const setImgFile = (e) =>
    {
        // console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const submitProducts=(e)=>{
        e.preventDefault();
        var formData = new FormData();
        formData.append("file",file)
        formData.append("category",formValues.category) 
        formData.append("product_name",formValues.product_name) 
        formData.append("uom",formValues.uom) 
        formData.append("qty",formValues.qty) 
        formData.append("price",formValues.price) 
        formData.append("stock",formValues.stock) 
        console.log(...formData)
        const config = {
            headers:
            {
                "Content-Type":"multipart/form-data"
            }
        }  

        axios.post("http://localhost:3001/addproducts",
        formData,config
        ).then((response)=>{
            console.log(response);
            alert("Added Successfully")
            window.location="http://localhost:3000/addproducts/"           
        })

        .catch(error => {
            console.log(error)
        })
    }

  return (
    <div>

       <div className='container mt-3 p-3'>
            <div className='row'>

                <h1> Add Product </h1>

                <form onSubmit={submitProducts}>

                <div className='mb-3 '>
                <select name='category' className='form-control' defaultValue={formValues.category} onChange={handleChange}>
                <option>--select category--</option>
                {
                CatList.map((cat,index) => {
                return(
                     
                <option key={cat.id} value={cat.category}>{cat.category}</option>
                )
                })
                }
                </select>
                </div>

                <div className='mb-3 '>
                    <input type='text' name='product_name' className='form-control' value={formValues.product_name}   
                    placeholder='Enter  Product Name' onChange={handleChange}  required/>
                </div>                

                <div className='mb-3 '>
                    <input type='text' name='uom' className='form-control' value={formValues.uom}  
                    placeholder='Enter UoM' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 '>
                    <input type='number' name='qty' className='form-control' value={formValues.qty} 
                    placeholder='Enter Quantity' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 '>
                    <input type='number' name='price' className='form-control' value={formValues.price}  
                    placeholder='Enter Price' onChange={handleChange}  required/>
                </div>

                <div className='mb-3 '>
                    <input type='file' name='image' className='form-control'  
                     onChange={setImgFile}  required/>
                </div>

                <div className='mb-3 '>
                    <input type='text' name='stock' className='form-control' value={formValues.stock}  
                    placeholder='Enter Stock' onChange={handleChange}  required/>
                </div>

                <div className='mb-3'>
                    <button className='btn btn-success'>Submit </button>
                </div>

                </form>
                   
            </div>
        </div>
      
    </div>
  )
}

export default AddProducts
