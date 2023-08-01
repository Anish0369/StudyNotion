import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkto}) => {
  const {darkMode} = useSelector((state)=>state.mode);
  return (
    <Link to={linkto}>

        <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${active? `${darkMode ? "bg-yellow-50 text-black":
        "bg-yellow-5 text-black"}` : `${darkMode ? "bg-richblack-800" : "bg-pure-greys-25 text-richblack-400"}`}
        hover:shadow-none
        hover:scale-95 transition-all duration-200
        `}>
            {children}
        </div>

    </Link>

  )
}

export default Button