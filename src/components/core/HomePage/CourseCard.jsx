import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import { useSelector } from 'react-redux';

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  const {darkMode} = useSelector((state) => state.mode);
  return ( 
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === cardData?.heading
          ? (`bg-white shadow-[12px_12px_0_0] ${darkMode ? "shadow-yellow-50" : "shadow-yellow-5"} `)
          : (`${darkMode ? "bg-richblack-800" : "bg-pure-greys-5 shadow-[6px_6px_0_0] shadow-pure-greys-25"}`)
      }  text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >

    <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
      {/* heading and description */}
      <div className={`${cardData.heading === currentCard && "text-richblack-700"} ${darkMode ? "text-richblack-5" : "text-richblack-600"} font-semibold text-[20px]`}>
        {cardData?.heading}
      </div>

      <div className='text-richblack-400'>
        {cardData.description}
      </div>
    </div>

    <div className={ `flex justify-between px-6 py-3 font-medium ${cardData.heading === currentCard ? "text-blue-300" : "text-richblack-300"}`}>
      <div className=' flex items-center gap-2'>
        <HiUsers/>
        <p>{cardData.level}</p>
      </div>

      <div className='flex items-center gap-2'>
        <ImTree/>
        <p>{cardData.lessionNumber} Lession </p>
      </div>
    </div>
    
    </div> 
  )
}

export default CourseCard