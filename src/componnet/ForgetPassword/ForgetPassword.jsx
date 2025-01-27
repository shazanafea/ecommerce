import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'Yup'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    let [errMessage, setError] = useState(null)
    let [formDisplay, setformDisplay] = useState(true)
    const baseUrl = 'https://ecommerce.routemisr.com'
    let navg = useNavigate()


    let validYup = Yup.object({
        email: Yup.string().required('email is requierd').email('enter valid email'),

    })
    let valid2Yup = Yup.object({
        resetCode: Yup.string().required('Reset code is required'),


    })
    let forgetForm = useFormik({

        initialValues: {
            email: "",

        },
        validationSchema: validYup,
        onSubmit: ForgetPasswordApi,
    });

    let verifyResetCodeForm  = useFormik({

            initialValues: {
                resetCode: "",

            },
            validationSchema: valid2Yup,
            onSubmit: verifyResetCodeApi,
        });
   function verifyResetCodeApi(data) {
     axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
    .then((req) => {
        if(req.data.status=='Success')
        navg('/updatePassword')
    })
    .catch((err) => {
        setError(err.response.data.message);
    })

    }
    
 function ForgetPasswordApi(data) {
       axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
              console.log(req)

                if (req.data.statusMsg=='success'){
                  setformDisplay(false)
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            })
    }

    return (
    
    <>
 {formDisplay?     <div>
         <h2>forget password</h2>

{errMessage ?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMessage}  
    </div> : ""}



<form onSubmit={forgetForm.handleSubmit} class=" w-7/12 mx-auto ">

    <div class="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input
            value={forgetForm.values.email}
            onChange={forgetForm.handleChange}
            onBlur={forgetForm.handleBlur}

            type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {forgetForm.touched.email && forgetForm.errors.email ? <p className='text-red-900'>{forgetForm.errors.email}</p> : ''}

    </div>

    <button
        disabled={!(forgetForm.isValid && forgetForm.dirty)}
        type="submit" class="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-actived 
disabled:bg-active disabled:bg-opacity-25
dark:focus:ring-blue-800">send</button>
</form>

         </div>

    :     

          <div>

<h2>reset code</h2>

{errMessage ?
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{errMessage}  
</div> : ""}



<form onSubmit={verifyResetCodeForm.handleSubmit} class=" w-7/12 mx-auto ">

<div class="mb-5">
<label for="resetCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your resetCode</label>
<input
   value={verifyResetCodeForm.values.resetCode}
   onChange={verifyResetCodeForm.handleChange}
   onBlur={verifyResetCodeForm.handleBlur}

   type="string" id="resetCode" name="resetCode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
{verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? <p className='text-red-900'>{verifyResetCodeForm.errors.resetCode}</p> : ''}

</div>

<button
disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
type="submit" class="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-actived 
disabled:bg-active disabled:bg-opacity-25
dark:focus:ring-blue-800">verify code</button>
</form>

</div>}
  
        </>
    )
}
