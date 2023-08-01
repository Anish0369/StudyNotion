import React from 'react'
import HilightText from '../HomePage/HilightText'
import { useSelector } from 'react-redux'

const Quote = () => {
  const {darkMode} = useSelector((state)=> state.mode);
  return (
    <div className={` text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center ${darkMode ? "text-white" : "text-richblack-700"}`}>
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HilightText text={"combines technology"} />,{" "}
        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
  )
}

export default Quote
