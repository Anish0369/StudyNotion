import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HilightText from './HilightText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"
import { useSelector } from 'react-redux'

const InstructorSection = () => {

    const {darkMode} = useSelector((state)=> state.mode); 
  return (
    <div className='mt-16'>
        <div className='flex lg:flex-row flex-col gap-20 items-center '>
            <div className='lg:w-[50%] '>
                <img src={Instructor} alt="" className={`${darkMode ? "shadow-white shadow-[-20px_-20px_0px_0px]" : "shadow-blue-200 shadow-[5px_5px_25px_0px]"}`}/>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-10 '>
                <div className='text-4xl font-semibold lg:w-[50%]'>
                    Become an 
                    <HilightText text={" Instructor"} />
                </div>                
                <p className='font-medium text-[16px] text-justify w-[90%] text-richblack-300 '>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton  active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default InstructorSection