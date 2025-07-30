import {  useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'Yup'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';

export default function signup() {
  let {setToken} = useContext(AuthContext)
  let [errMessage,setError]=useState(null)
const baseUrl='https://ecommerce.routemisr.com'
let navg = useNavigate()


  let validYup=Yup.object({
  email:Yup.string().required('email is requierd').email('enter valid email'),
  password:Yup.string().required('password is requierd').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'password invalid'),

})
 let loginForm = useFormik({  
  
  initialValues:{
    email:"",
    password:"",
  

  },
  validationSchema:validYup,
onSubmit:loginApi
});
 
 async function loginApi (data){
  let req=axios.post(`${baseUrl}/api/v1/auth/signin`,data)
  .then((req)=>{
if (req.data.message=='success'){
  
  setToken(req.data.token);
  localStorage.setItem("token",req.data.token);
  

  navg('/')
}


 })
 .catch((err)=>{
  setError(err.response.data.message);
 })
}
  
  return (
  <>
  <h2>login now</h2>
  
{errMessage?
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{errMessage}
</div> :""} 



<form onSubmit={loginForm.handleSubmit} class=" w-7/12 mx-auto ">
 
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
      value={loginForm.values.email}
      onChange={loginForm.handleChange}
      onBlur={loginForm.handleBlur} 

    type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
   {loginForm.touched.email&&loginForm.errors.email? <p className='text-red-900'>{loginForm.errors.email}</p>:''}

  </div>
 
 <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input 
      value={loginForm.values.password}
      onChange={loginForm.handleChange}
      onBlur={loginForm.handleBlur} 

    type="password" id="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
   {loginForm.touched.password&&loginForm.errors.password? <p className='text-red-900'>{loginForm.errors.password}</p>:''}

  </div>



<Link to="/forgetPassword">Forget password?</Link>
<br/>
  <button 
  disabled={!(loginForm.isValid&&loginForm.dirty)}
  type="submit" class="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-actived 
  disabled:bg-active disabled:bg-opacity-25
  dark:focus:ring-blue-800">login</button>
</form>

  </>
  )
}
