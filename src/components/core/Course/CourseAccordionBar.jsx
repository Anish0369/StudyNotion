import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"
import { useSelector } from "react-redux"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordian state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])
  const { darkMode } = useSelector((state) => state.mode);

  return (
    <div>
      <div className={` overflow-hidden border border-b-richblack-100 ${darkMode ? "border-richblack-600 bg-richblack-700" : "bg-pure-greys-5 "} text-richblack-5 last:mb-0 `}>
        <div>
          <div
            className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
            onClick={() => {
              handleActive(course._id)
            }}
          >
            <div className="flex items-center gap-2">
              <i
                className={
                  isActive.includes(course._id) ? "rotate-180" : "rotate-0"
                }
              >
                <AiOutlineDown />
              </i>
              <p className={`${darkMode ? "text-richblack-5" : "text-richblack-500"}`}>{course?.sectionName}</p>
            </div>
            <div className="space-x-4">
              <span className={`${darkMode ? "text-yellow-25" : "text-richblack-300"}`}>
                {`${course.subSection.length || 0} lecture(s)`}
              </span>
            </div>
          </div>
        </div>
        <div
          ref={contentEl}
          className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
          style={{
            height: sectionHeight,
          }}
        >
          <div className={`text-textHead flex flex-col gap-2 px-7 py-6 font-semibold ${darkMode ? "text-richblack-5" : "bg-white text-richblack-500"}`}>
            {course?.subSection?.map((subSec, i) => {
              return <CourseSubSectionAccordion subSec={subSec} key={i} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
