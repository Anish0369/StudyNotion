import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { darkMode } = useSelector((state) => state.mode);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className={`text-3xl font-medium ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>My Courses</h1>
        {
          darkMode ? (<IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <VscAdd />
          </IconBtn>) : (
            <button onClick={() => navigate("/dashboard/add-course")}
              className="flex items-center gap-x-2 border-[1px] border-caribbeangreen-200 px-5 py-2 rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            >
              Add Course
              <VscAdd />
            </button>
          )
        }
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}