import React from 'react'
import Signup from '../Login/Signup';
import { Navigate } from 'react-router-dom';
export default function ProtectedRouting({children}) {
 
if(localStorage.getItem("token")){
  return children;
}else{
      return <Navigate to="/signup"/>;
    }
  }

