import React from 'react'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function 

() {
  return (
    <div>
    <Navbar/>
<Outlet/>
    <Footer/>

    </div>
  )
}
