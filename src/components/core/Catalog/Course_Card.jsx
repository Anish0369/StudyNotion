import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import { useState } from 'react'
import { useEffect } from 'react'
import GetAvgRating from '../../../utils/avgRating'
import { useSelector } from 'react-redux'

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    const {darkMode} = useSelector((state) => state.mode);

  return (
    <div>
        {/* using link tag here bcz if we click on any course it will display the details of that course  */}
        <Link to={`/courses/${course._id}`}>
            <div className={`p-5 my-10 border rounded-xl ${darkMode ? "bg-richblack-900 border-richblack-800 " : "bg-pure-greys-5 border-pure-greys-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"}`}>
                <div>
                    <img 
                        src={course?.thumbnail}
                        alt='Thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div>
                    <p className={`text-2xl m-2 ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>{course?.courseName}</p>
                    <p className='text-richblack-100 m-2'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-x-3 m-2'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/> 
                        <span className={`${darkMode ? 'text-richblack-300' : 'text-richblack-400'}`}>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className={` m-2 ${darkMode ? "text-richblack-5" : "text-richblack-400"}`}>RS {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card