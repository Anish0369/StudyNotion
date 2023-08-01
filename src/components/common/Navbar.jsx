import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import Logo1 from "../../assets/Logo/Logo-Full-Dark.png"

import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from "react-icons/bs"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { setMode } from '../../slices/modeSlice'

// ye backend se data fetch nhi ho rha tha to test k liye le liya hai ye data 
// const subLinks = [
//     {
//         title: "python",
//         link: "catalog/python"
//     },
//     {
//         title: "web dev",
//         link: "catalog/web-development"
//     },
// ];

const Navbar = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const { darkMode } = useSelector((state) => state.mode);
  const location = useLocation();

  const dispatch = useDispatch();

  //api call // this function will get all sublilnk for catalog section 
  const [subLinks, setSublinks] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchSublinks = async () => {
    try {
      // api call
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSublinks(result.data.data);
    }
    catch (error) {
      console.log("Could not fetch the category list.", error)
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  // agar current path match kr jayega to uske liye diff css proprties set krenge
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className={`flex h-14 items-center justify-center  ${darkMode ? "border-b-richblack-700 border-b" : "border-b border-b-richblack-25"}  max-[765px]:hidden`}>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* Image Added */}
        <Link to="/">
          <img src={`${darkMode ? (Logo) : (Logo1)}`} alt="" width={160} height={42} loading='lazy' />
        </Link>

        {/* "Navlinks here" => data for navlinks is taken from data folder */}
        <nav >
          <ul className='flex flex-row gap-x-6 text-richblack-25' >
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    // the data of catalog is present in getallCategory controller api s catalogo here we need to call api and link frontend to backend jo ki hum service folder me define kr rhe honge
                    // group => hover krne p proprty add krne k liye 
                    link.title === "Catalog" ? (
                      <>
                        <div className={`relative cursor-pointer flex items-center gap-2 group ${matchRoute('/catalog/:catalogName') ? `${darkMode ? "text-yellow-25" : "text-yellow-50 border-b"}` : `${darkMode ? "text-richblack-50" : "text-richblack-800"}`}`}>
                          <p>{link.title}</p>
                          <BsChevronDown />

                          <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[3em] top-[50%] z-[1000] w-[200px] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em]
                                                    group-hover:opacity-100 lg:w-[300px]'>

                            {/* triangular shaped div */}
                            <div className='absolute left-[50%] top-0 transate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                            </div>
                            {
                              subLinks.length ? (
                                subLinks.map((subLink, index) => (
                                  <Link to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`} key={index}>
                                    <p
                                      className='bg-transparen hover:bg-richblack-50  py-4 pl-4 rounded-lg '>{subLink.name}</p>
                                  </Link>
                                ))
                              ) :
                                (
                                  <p className="text-center">No Courses Found</p>
                                )
                            }
                          </div>

                        </div>
                      </>
                    ) :
                      (
                        <Link to={link?.path}>
                          <p className={`cursor-pointer ${matchRoute(link?.path) ? `${darkMode ? "text-yellow-25" : "text-yellow-50 border-b" }`: 
                          
                          `${darkMode ? "text-richblack-25": "text-richblack-800"}`}`}>
                            {link.title}
                          </p>
                        </Link>
                      )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/* Login/signup/dashboard */}
        <div className='flex gap-x-4 items-center '>
          {
            // user ki value kuch hogi jub hum login honge otherwise ye null hogi 
            user && user.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" className='relative text-richblack-5 text-[20px]'>
                <AiOutlineShoppingCart className='text-yellow-50' />
                {
                  totalItems > 0 && (
                    <span className='absolute translate-y-[-32px] translate-x-[8px] text-xs'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }


          {
            token === null && (
              <Link to="/login" >
                <button className={`text-richblack-100 border border-richblack-700 ${darkMode ? "bg-richblack-800" : "bg-white text-richblack-600"} px-[12px] py-[8px] rounded-md`}>
                  Login
                </button>
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/signup">
                <button className={`text-richblack-100 border border-richblack-700 ${darkMode ? "bg-richblack-800" : "bg-white text-richblack-600"} px-[12px] py-[8px] rounded-md`}>
                  Sign up
                </button>
              </Link>
            )
          }

          {
            // mtlb user present hai to hum usko uski profile menu dashboard jo b sb cheezein hai wo dikhaayenge 
            token != null && <ProfileDropDown />
          }

          <div
            className={`text-2xl cursor-pointer ${darkMode ? "text-richblack-100 " : "text-richblack-700 "}
                    `}
            onClick={() => {
              dispatch(setMode(!darkMode));
            }}
          >
            {
              darkMode ?
                (
                  <MdOutlineLightMode />
                ) :
                (
                  <MdOutlineDarkMode />
                )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar