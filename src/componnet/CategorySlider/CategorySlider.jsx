import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import axios from 'axios';

export default function CategorySlider() {
  let [categoryList,setCategory]=useState(null)
  function GetAllCategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((req)=>{setCategory(req.data.data) })
  }
  useEffect(()=>{GetAllCategory();},[])
    return (
    <div className='my-5'>
        <Slider slidesToShow={6} infinite autoplay speed={500} slidesToScroll={3}>

        {categoryList?.map((category)=>{
            return <div key={category._id}>

                <img src={category.image} alt="" className='h-48 w-full object-cover object-top' />
                <h5  className='text-center'>{category.name}</h5>
            </div>
        })}


        </Slider>

    </div>
  )
}
