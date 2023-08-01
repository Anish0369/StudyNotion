import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import Logo1 from "../../assets/Logo/Logo-Full-Dark.png"
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { GrContact } from "react-icons/gr"
import { MdContactPhone, MdOutlineDarkMode, MdOutlineDashboardCustomize, MdOutlineLightMode } from 'react-icons/md'
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




const BottomNavbar = () => {
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    //api call // this function will get all sublilnk for catalog section 
    const [loading, setLoading] = useState(false)

    // agar current path match kr jayega to uske liye diff css proprties set krenge
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    const { darkMode } = useSelector((state) => state.mode);

    return (
        <div className='block md:hidden lg:hidden '>
            <div className={`flex h-14 items-center  justify-between  w-full top-0 z-10 p-5 ${darkMode ? "bg-richblack-900 text-richblack-5" : "bg-white border-b border-richblack-300 text-richblack-5"} `}>
                <Link to="/">
                    <img src={`${darkMode ? Logo : Logo1}`} alt="" width={130} height={42} loading='lazy' />
                </Link>

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
                                <button className='text-richblack-100 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='text-richblack-100 border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md' >
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


            <div className='flex h-14 items-center justify-between fixed w-full bottom-0 z-10 bg-richblack-800 p-5 text-richblack-5 border-t border-richblack-700'>

                {/* "Navlinks here" => data for navlinks is taken from data folder */}
                <div className={`cursor-pointer ${matchRoute("/") ? " border-b-[5px] border-yellow-200" : "text-richblack-25"} p-2`}>
                    <Link to={"/"}>
                        <div className='flex flex-col items-center '>
                            <AiOutlineHome className='text-2xl' />
                            <p className='text-xs'>Home</p>
                        </div>
                    </Link>
                </div>
                <div className={`cursor-pointer ${matchRoute("/about") ? " border-b-[5px] border-yellow-200" : "text-richblack-25"} p-2`}>
                    <Link to={"/about"}>
                        <div className='flex flex-col items-center  '>
                            <AiOutlineUser className='text-2xl' />
                            <p className='text-xs'>About</p>
                        </div>
                    </Link>
                </div>
                <div className={`cursor-pointer ${matchRoute("/contact") ? " border-b-[5px] border-yellow-200" : "text-richblack-25"} p-2`}>
                    <Link to={"/contact"}>
                        <div className='flex flex-col items-center'>
                            <MdContactPhone className='text-2xl text-white' />
                            <p className='text-xs'>Contact Us</p>
                        </div>
                    </Link>
                </div>
                <div className={`cursor-pointer ${matchRoute("/more") ? " border-b-[5px] border-yellow-200 " : "text-richblack-25"} p-2`}>
                    <Link to={"/more"}>
                        <div className='flex flex-col items-center '>
                            <MdOutlineDashboardCustomize className='text-2xl text-white' />
                            <p className='text-xs'>More</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottomNavbar