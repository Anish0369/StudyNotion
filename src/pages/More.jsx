import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { useSelector } from 'react-redux';

const More = () => {
  const [subLinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      // api call
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSublinks(result.data.data);
    }
    catch (error) {
      console.log("Could not fetch the category list.", error)
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, [])

  const {darkMode} = useSelector((state)=>state.mode);

    return (
        <div className='text-white'>
            <div className={`my-5 ${darkMode ? "text-richblack-5" : "text-richblack-600"} text-2xl font-semibold text-center`}>
                Explore multiple course categories here
            </div>
            {
                subLinks.length ? (
                    subLinks.map((subLink, index) => (
                        <Link to={`/catalog/${subLink.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`} key={index}>
                            <p
                                className={`hover:bg-richblack-700  py-4 pl-4 rounded-lg ${darkMode ? "bg-richblack-800 hover:bg-richblack-700 text-richblack-5" : "bg-pure-greys-100 hover:bg-pure-greys-50 text-richblack-700"} my-1 mx-5`}>{subLink.name}
                            </p>
                        </Link>
                    ))
                ) :
                (
                    <p className="text-center">No Courses Found in Course Category</p>
                )
            }
        </div>
    )
}

export default More