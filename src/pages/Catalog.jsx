import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error" 

const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const {darkMode} = useSelector((state)=> state.mode);

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      }
      catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }

  }, [categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div>
      {/* Hero Section */}
      <div className={` box-content px-4 ${darkMode ? "bg-richblack-800" : "bg-richblack-5"}`}>
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className={`text-sm ${darkMode ? "text-richblack-300" : "text-richblack-600"}`}>
            {`Home / Catalog / `}
            <span className={`${darkMode ? "text-yellow-25" : "text-yellow-100"}`}>
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className={`text-3xl ${darkMode ? " text-richblack-5" : " text-richblack-600"}`}>
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className={`max-w-[870px] ${darkMode ? "text-richblack-200" : "text-richblack-300"}`}>
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content max-w-maxContentTab px-4 py-12 lg:max-w-maxContent w-11/12">
        <div className={`section_heading ${darkMode ? "text-richblack-5" : "text-richblack-700"}`}>Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${active === 1
                ? `${darkMode ? "border-b-yellow-25 text-yellow-25" : "border-b-yellow-50 text-yellow-50"}`
                : `${darkMode ? "text-richblack-50" : "text-richblack-400"}`
              } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${active === 2
                ? `${darkMode ? "border-b-yellow-25 text-yellow-25" : "border-b-yellow-50 text-yellow-50"}`
                : `${darkMode ? "text-richblack-50" : "text-richblack-400"}`
              } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className="  mx-auto box-content w-11/12 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className={`section_heading ${darkMode ? "text-richblack-5" : "text-richblack-700"}`}>
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-11/12 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className={`section_heading ${darkMode ? "text-richblack-5" : "text-richblack-700"}`}>Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog