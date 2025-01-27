import React, { useContext } from 'react'
import logoImg from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
  let { token,setToken } = useContext(AuthContext);
  let nav =useNavigate()
  function logout(){
    localStorage.removeItem("token");
    setToken(null)
    nav('/login')
  }
  return (
    <>

      <nav className="bg-white shadow-lg border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex md:flex-nowrap flex-wrap items-center  mx-auto p-4">
          <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logoImg} className="h-8" />
          
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden    w-full md:flex md:w-auto justify-between" id="navbar-default">
            {token ? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">Home</NavLink>
              </li>

              <li>
                <NavLink to="/Product" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">product</NavLink>
              </li>

              <li>
                <NavLink to="/Cart" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">cart</NavLink>
              </li>

              <li>
                <NavLink to="/Brand" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">brands</NavLink>
              </li>
              <li>
                <NavLink to="/Catogery" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">Catogery</NavLink>
              </li>

            </ul> : ""
            }


            <ul className='font-medium  flex   md:p-0 mt-4 '>
              <li className='space-x-3 relative left-96 '>
                <a href=""><i className=' fa-brands fa-facebook'></i></a>
                <a href=""><i className='fa-brands fa-twitter'></i></a>
                <a href=""><i className='fa-brands fa-instagram'></i></a>
                <a href=""><i className='fa-brands fa-youtube'></i></a>
              </li>
              {token ? <li className='relative left-96 ' onClick={logout}><span>logout</span></li>  :<>
                <li >
                <NavLink to="/login" className={(x) => x.isActive ? "block py-2 px-3 text-active " : "block py-2 px-3"} aria-current="page">login</NavLink>
              </li>

              <li>
                <NavLink to="/register" className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} aria-current="page">register</NavLink>
              </li>
              </>
              }
          

            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}
