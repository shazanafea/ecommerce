import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetails() {
let [product,setProduct]=useState(null)
let { addUserCart, setNumCartItems } = useContext(CartContext);
  let {id} =useParams();
  function getDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((req)=>{setProduct(req.data.data)})
  }
  useEffect(()=>{getDetails(id);},[id])
function changeImage(e){
let imgSrc=e.target.getAttribute("src")
document.getElementById("myImage").setAttribute("src", imgSrc);
}
function addCart(id) {
  addUserCart(id)
  .then((req) => { setNumCartItems(req.data.numOfCartItems); toast.success(req.data.message); })
  .catch(() => {});
}

    return (
<>
<Toaster/>
<div className='w-10/12 mx-auto my-5'>
               <div className='flex justify-between items-center '>


<div className='w-3/12'> 
<img src={product?.imageCover} id='myImage' className='w-full' alt="" />
<div className='flex'>

{product?.images.map((image,i)=>{
        return <div key={i}>
<img onClick={changeImage} src={image} className='w-full' alt="" />
        </div>
    })}
</div>

</div>
<div className='w-8/12'>
<h2>{product?.title}</h2>
<p  className='text-gray-500 my-3'>{product?.description}</p>
<div className='flex justify-between'>
  <span>{product?.price}EGP</span>
  <span><i className='fa-solid fa-star text-yellow-300'></i>{" "}{product?.ratingAvarage}</span>
</div>
<button onClick={()=>{addCart(id)}} className='btn mt-5 '>Add to cart</button>
</div>
    </div>
        </div>
 
</>
      
  )
}
