import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/auth"
import toast from 'react-hot-toast'
import Dashboard from './../../pages/user/Dashboard';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isshow, setIsshow] = useState(false);

  //context auth
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //function logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    navigate('/login');
    toast.success("Logout Sucessfully");
  }
  return (
    <>
      <div className='bg-slate-200 shadow-lg'>

        <nav className="flex items-center justify-around flex-wrap p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
            <img src={"https://cdn.logo.com/hotlink-ok/logo-social.png"} onClick={() => { navigate('/') }} className="w-100 h-10 mr-2 cursor-pointer" alt="Logo" />
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
          >
            <div className="text-lg lg:flex-grow font-poping active:text-red">
              <ul className=''>
                <NavLink to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-slate-400 ">
                  ABOUT
                </NavLink>
                <NavLink to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-slate-400 active:text-red">
                  CATEGORY
                </NavLink>
                <NavLink to="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-slate-400">
                  CONTACT
                </NavLink>
                <NavLink to="/policy" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-slate-400">
                  POLICY
                </NavLink>
              </ul>
            </div>
            {/* search */}
            {/* <div class="ml-5 flex w-[30%] items-center justify-between">
      <input
        type="search"
        class="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none dark:border-neutral-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2" /> */}

            {/* <!--Search icon--> */}
            {/* <span
        class="cursor-pointer input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
        id="basic-addon2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd" />
        </svg>
      </span>
    </div> */}
            {/* search end */}
{!auth?.user ?(<> <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white mx-2" onClick={()=>{navigate('/signup')}}>
           signup
         </button></>):(<>
            {/* dropdown */}
            <div>
              <div class="relative">
                {!isshow ? (<>
                  <button onClick={() => { setIsshow(true) }} dropdown-trigger aria-expanded="false" type="button" class="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">{auth?.user?.name}</button>
                  {/* <p class="hidden transform-dropdown-show"></p> */}
                </>) : (<>
                  <button onClick={() => { setIsshow(false) }} dropdown-trigger aria-expanded="false" type="button" class="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">{auth?.user?.name}</button>

                  <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                      <a href="/dashboard" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Dashboard</a>
                      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
                        {
                          !auth.user ? (<>
                            <a className="font-semibold" onClick={() => { navigate('/signup') }}>
                              Signup
                            </a>
                          </>) : (
                            <>
                              <a className="" onClick={handleLogout}>
                                Logout
                              </a>
                            </>
                          )
                        }
                      </a>


                    </div>
                  </div>
                </>)}


              </div>
            </div>
         </>)}
          
            <div className='flex justify-center items-center'>
              {/* {
          !auth.user ? (<>
            <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white mx-2" onClick={()=>{navigate('/signup')}}>
           signup
         </button>
          </>):(
            <>
            <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white mx-2" onClick={handleLogout}>
           Logout
         </button>
            </>
          )
        } */}

              <ul>
                <li>
                  <NavLink to='/cart'>
                    cart(0)
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>
    </>
  )
}

export default Header