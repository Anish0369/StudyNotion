import React from 'react'
import ErrorImage from "../assets/Images/Error.svg"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center m-12'>
      <div className='justify-center items-center text-3xl text-richblack-50'>
        Error 404, not found
      </div>
      
      <div className='w-[600px] h-[600px] lg:p-[10px] p-[100px]'>
        <img src={ErrorImage} alt="image here" />
      </div>
    </div>
  )
}

export default Error