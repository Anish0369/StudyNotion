import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HilightText from './HilightText';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';

const tabsName = [
    //  Data for this in the Data file 
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    
    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    const {darkMode} = useSelector((state) => state.mode);
    
  return (
    <div>
        <div className={`text-4xl font-semibold text-center ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>
            Unlock the 
            <HilightText  text={" Power of Code."}/>
        </div>

        <p className='text-center text-lg font-bold text-richblack-300 mt-4'>
            Learn to build anything you can imagine.
        </p>

        <div className={`mt-5 flex flex-row rounded-full ${darkMode ? "bg-richblack-800 border-richblack-100 border-richblack-200" : "bg-pure-greys-25 border-pure-greys-50"} mb-12  px-1 py-1 gap-5  border-b-[1px]`}>
            {
                tabsName.map( (element, index) => {
                    return (
                        <div
                            className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element 
                                ? `${darkMode ? "bg-richblack-900 text-richblack-5" : "bg-white text-richblack-600 "} font-medium`
                                : "text-richblack-400"
                            } rounded-full transition-all duration-200 cursor-pointer ${darkMode ? "hover:bg-richblack-900 hover:text-richblack-5 " : "hover:bg-white hover:text-richblack-500"} px-7 py-2`}
                            key={index}
                            onClick={() => setMyCards(element)}
                        >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px] '>
            {/* course card creation */}
            <div className='lg:absolute flex flex-row flex-wrap gap-10 lg:gap-0 lg:justify-between justify-center lg:bottom-[0] w-full lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3 '>
                {
                    courses.map( (element, index) => {
                        return (
                            <CourseCard
                            key={index} 
                            cardData={element} 
                            currentCard={currentCard} setCurrentCard = {setCurrentCard}/>
                        )
                    })
                }
            </div>
        </div>

    </div>
  )
}

export default ExploreMore