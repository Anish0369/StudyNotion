import React from 'react'
import CTAButton from "../HomePage/Button"
import HilightText from './HilightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { useSelector } from 'react-redux'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {

    const {darkMode} = useSelector((state)=>state.mode)

    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>

            {/* section 1 */}
            <div className={`w-[100%] lg:w-[50%] flex flex-col gap-8 ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>
                {heading}
                <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 '>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7 '>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>

            </div>

            {/* section 2 - code animation */}

            <div className={`h-fit ${darkMode ? "code-border" : "bg-pure-greys-5"} flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] `}>
                {/* HW - BG gradient */}

                <div className={`absolute ${backgroundGradient} w-50 h-50 shadow-white shadow-[0_5px_20px_20px]`}>

                </div>

                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${darkMode ? `${codeColor}` : "text-richblack-600"} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block",
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>

        </div>
    )
}

export default CodeBlocks