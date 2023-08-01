import React from 'react'

import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactUs from "../components/ContactPage/ContactUs"
import { useSelector } from 'react-redux'



const Contact = () => {

  const {darkMode} = useSelector((state) => state.mode);

  return (
    <div>
    <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
        {/* contact details */}
        <div className='lg:w-[40%]'>
            <ContactDetails />
        </div>

        {/* Contact form */}
        <div className='lg:w-[60%]'>
            <ContactUs />
        </div> 
    </div>
    <div className={`relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ${darkMode ? "bg-richblack-900 text-white" : "bg-white text-richblack-700"}`}>
     {/* Reviws from Other Learner */}
     <h1 className="text-center text-4xl font-semibold mt-8">
       Reviews from other learners
     </h1>
     <ReviewSlider />
   </div>
   <Footer />
   </div>
  )
}

export default Contact