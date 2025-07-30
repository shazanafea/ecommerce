import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  let [productList, setproductList] = useState(null);
  let [numsPage, setNumsPage] = useState(null);
  let [loading, setloading] = useState(true);
 let {addUserCart,setNumCartItems}= useContext(CartContext)
  function getAllProudcts(page=1) {
    setloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${page}`)
      .then((req) => {
        setproductList(req.data.data);
        let nums = []
        for (let i = 1; i <= req.data.metadata.numberOfPages; i++) {
          nums.push(i)
        }
        setNumsPage(nums)
      setloading(false)


      })
.catch((err)=>{
  setloading(false)

})
  }
  useEffect(() => {
    getAllProudcts();
  }, []);
  function getPageNumber(e){
let page=e.target.getAttribute("page")
getAllProudcts(page);
  }

  function addCart(id) {
    addUserCart(id)
    .then((req) => { setNumCartItems(req.data.numOfCartItems); toast.success(req.data.message); })
    .catch(() => {});
  }
  
  return (
  
  
  
  <>
<Toaster/>
  {loading?<div className='bg-slate-300 flex justify-center items-center h-screen'>
<span className="loader">Load&nbsp;ng</span>

</div>
: 
<div className='w-10/12 mx-auto my-8'>
<MainSlider/>
<CategorySlider/>
<div className="flex flex-wrap space-y-5">
  {productList?.map((product) => {
    return (
      <div key={product._id} className='lg:w-2/12 md:w-4/12 sm:w-6/12 w-full px-3' >
   <div className='item overflow-hidden group p-3 hover:border hover:border-main-color'>
<Link to={`/ProductDetails/${product._id}`}>
<img src={product.imageCover} className='w-full' alt={product.title} />
<h5 className='text-green-500'>{product.category.name}</h5>
<h2 >{product.title.split(" ").slice(0, 2).join(" ")}</h2>
<div className='flex justify-between'>
  <span>{product.price}EGP</span>
  <span><i className='fa-solid fa-star text-yellow-300'></i>{" "}{product.ratingAvarage}</span>
</div>
</Link>
<button onClick={() => addCart(product._id)} className='btn mt-3 duration-500'>Add to cart</button>
</div>

       
      </div>
    )
  })}
</div>


<nav aria-label="Page navigation example">
  <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
        </svg>
      
      </a>
    </li>
    {numsPage?.map((el) => (
<li onClick={getPageNumber} key={el}>
<a page={el} href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{el}</a>
</li>
))}


    <li>
      <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
        </svg>
      </a>
    </li>
  </ul>
</nav>


</div>}


    </>
  )
}
