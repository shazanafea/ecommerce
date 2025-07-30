import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componnet/Layout/Layout'
import Product from './componnet/Product/Product'
import Signin from './componnet/Register/Signin'
import Notfound from './componnet/Notfound/Notfound'
import Cart from './componnet/Cart/Cart'
import Signup from './componnet/Login/Signup'
import Home from './componnet/Home/Home'
import AuthContextProvider from './Context/AuthContextProvider'
import ForgetPassword from './componnet/ForgetPassword/ForgetPassword'
import UpdatePassword from './componnet/UpdatePassword/UpdatePassword'
import ProtectedRouting from './componnet/ProtectedRouting/ProtectedRouting'
import ProductDetails from './componnet/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContextProvider'
import ShippingDetails from './componnet/ShippingDetails/ShippingDetails'


function App() {
let router=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:"product",element:<ProtectedRouting><Product/></ProtectedRouting>},
    {path:"ShippingDetails/:id",element:<ProtectedRouting><ShippingDetails/></ProtectedRouting>},
    {path:"cart",element:<ProtectedRouting><Cart/></ProtectedRouting>},
    {path:"ProductDetails/:id",element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
    {path:"login",element:<Signup/>},
    {path:"register",element:<Signin/>},
    {path:"forgetPassword",element:<ForgetPassword/>},
    {path:"UpdatePassword",element:<UpdatePassword/>},
    {path:"*",element:<Notfound/>},
   
  ]}
  
]);
  return (
    <>
    <AuthContextProvider>
      <CartContextProvider>
      <RouterProvider router={router}/>
      </CartContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
