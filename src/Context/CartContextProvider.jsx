  import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { createContext } from 'react';
export let CartContext=createContext()
export default function CartContextProvider({children}) {
  let [numCartItems,setNumCartItems]=useState(null)

  const baseUrl="https://ecommerce.routemisr.com/api/v1/cart";
 const headerOptions={
    headers:{
        token:localStorage.getItem("token"),
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getUserCart().then((req)=>{
        setNumCartItems(req.data.numOfCartItems)
      })
    }
  },[]);
  function getUserCart(){
    return axios.get(baseUrl,headerOptions)
  }
  function addUserCart(id){
let data={
  productId:id
}
  return axios.post(baseUrl, data,headerOptions)

}

function deleteUserCart(id){
  return axios.delete(`${baseUrl}/${id}`,headerOptions)
}
function clearUserCart(){
  return axios.delete(`${baseUrl}`,headerOptions)
}
function updateCartItemCount(id,count){
  let data={
    count:count
  }
return axios.put(`${baseUrl}/${id}`,data,headerOptions)
}
  
    return (
    <CartContext.Provider value={{getUserCart,numCartItems,setNumCartItems,addUserCart,deleteUserCart,clearUserCart,updateCartItemCount}}>{children}</CartContext.Provider>
  )
}