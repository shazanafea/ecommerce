import {  useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'Yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  let [errMessage,setError]=useState(null)
const baseUrl='https://ecommerce.routemisr.com'
let navg = useNavigate()


  let validYup=Yup.object({
  name:Yup.string().required('name is requierd').min(3,'min char is 2').max(20,'max char is 20'),
  email:Yup.string().required('email is requierd').email('enter valid email'),
  password:Yup.string().required('password is requierd').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'password invalid'),
  rePassword:Yup.string().required('password is requierd').oneOf([Yup.ref('password')],'repassword doesnt match the password'),
  phone:Yup.string().required('phone is requierd').matches(/^(20)?01[1250][0-9]{8}$/,'enter valid phone number'),

})
 let registerForm = useFormik({  
  
  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""

  },
  validationSchema:validYup,
onSubmit:registerApi
});
 
 async function registerApi (data){
  let req= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
  .then((req)=>{
if (req.data.message=='success'){
  navg('/login')

}


 })
 .catch((err)=>{
  setError(err.response.data.message);
  
 })
}
  
  return (
  <>
  <h2>register now</h2>
  
{errMessage?
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{errMessage}
</div> :""} 



<form onSubmit={registerForm.handleSubmit} class=" w-7/12 mx-auto ">
 
  <div class="mb-5">
    <label for="name" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input 
          value={registerForm.values.name}
    onChange={registerForm.handleChange}
    onBlur={registerForm.handleBlur} 
    type="name" id="name" name="name" className="valid:border-green-700 invalid:border-red-950 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
   {registerForm.touched.name&&registerForm.errors.name? <p className='text-red-900'>{registerForm.errors.name}</p>:''}
   
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input
      value={registerForm.values.email}
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur} 

    type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
   {registerForm.touched.email&&registerForm.errors.email? <p className='text-red-900'>{registerForm.errors.email}</p>:''}

  </div>
 
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input 
      value={registerForm.values.password}
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur} 

    type="password" id="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
   {registerForm.touched.password&&registerForm.errors.password? <p className='text-red-900'>{registerForm.errors.password}</p>:''}

  </div>
  <div class="mb-5">
    <label for="rePassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
    <input 
      value={registerForm.values.rePassword}
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur} 
      type="Password" id="rePassword" name="rePassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
   {registerForm.touched.rePassword&&registerForm.errors.rePassword? <p className='text-red-900'>{registerForm.errors.rePassword}</p>:''}

  </div>
  <div class="mb-5">
    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input
      value={registerForm.values.phone}
      onChange={registerForm.handleChange}
      onBlur={registerForm.handleBlur} 

    type="tel" id="phone" name="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
   {registerForm.touched.phone&&registerForm.errors.phone? <p className='text-red-900'>{registerForm.errors.phone}</p>:''}

  </div>


  <button 
  disabled={!(registerForm.isValid&&registerForm.dirty)}
  type="submit" class="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-actived 
  disabled:bg-active disabled:bg-opacity-25
  dark:focus:ring-blue-800">Submit</button>
</form>

  </>
  )
}
