import React from 'react'
import HilightText from './HilightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"


const LearningLanguageSection = () => {
  return (
    <div className=' my-10'>
        <div className=' flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HilightText text={" Learning any Language"}/>
            </div>    
            
            <div className='font text-center mx-auto text-base  lg:w-[70%] text-lg font-bold text-richblack-300'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>  
 
            <div className='flex lg:flex-row flex-col items-center justify-center '>
                <img 
                    src={know_your_progress} 
                    alt="Know your progress image " 
                    className='object-contain lg:-mr-32'
                />
                <img 
                    src={compare_with_others} 
                    alt="Plan your lessons image" 
                    className='"object-contain lg:-mb-10 lg:-mt-0 -mt-12'
                />
                <img 
                    src={plan_your_lesson} 
                    alt="Plan your lessons image"
                    className='object-contain lg:-ml-36 lg:-mt-5 -mt-16' 
                />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/login"}>
                    Learn more
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection