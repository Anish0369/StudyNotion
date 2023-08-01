import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import { AiOutlineBars } from "react-icons/ai"
import { IoCloseSharp } from "react-icons/io5"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const [open, setOpen] = useState(true);

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  const { darkMode } = useSelector((state) => state.mode);

  return (
    <>
      {
        open ? (
          <div className={`flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] ${darkMode ? "bg-richblack-800 border-r-richblack-700" : "bg-white border-r-pure-greys-50"}`}>
            <button
              onClick={() => setOpen(false)}
              className={` w-[25px] ml-[290px] aspect-square px-1 ${darkMode ? "text-white" : "text-richblack-600"} rounded-full mt-1 text-2xl`}
            >
              <IoCloseSharp />
            </button>
            <div className={`mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b py-5 text-lg font-bold ${darkMode ? "border-richblack-600 text-richblack-25" : "text-richblack-600 border-pure-greys-50"}`}>
              <div className={`flex w-full items-center justify-between `}>
                <div
                  onClick={() => {
                    navigate(`/dashboard/enrolled-courses`)
                  }}
                  className={`flex h-[35px] w-[35px] items-center justify-center rounded-full p-1 text-richblack-700 hover:scale-90 ${darkMode ? " bg-richblack-100" : "bg-pure-greys-25"}`}
                  title="back"
                >
                  <IoIosArrowBack size={30} />
                </div>

                {
                  darkMode ? (
                    <IconBtn
                      text="Add Review"
                      customClasses="ml-auto"
                      onclick={() => setReviewModal(true)}
                    />
                  ) :
                    (
                      <button
                        className="bg-pure-greys-25 py-2 px-5 rounded text-richblack-500"
                        onClick={() => setReviewModal(true)}
                      >
                        Add Review
                      </button>
                    )
                }
                
              </div>
              <div className="flex flex-col">
                <p>{courseEntireData?.courseName}</p>
                <p className={`text-sm font-semibold text-richblack-500`}>
                  {completedLectures?.length} / {totalNoOfLectures}
                </p>
              </div>
            </div>

            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
              {courseSectionData.map((course, index) => (
                <div
                  className={`mt-2 cursor-pointer text-sm ${darkMode ? "text-richblack-5" : "text-richblack-500"}`}
                  onClick={() => setActiveStatus(course?._id)}
                  key={index}
                >
                  {/* Section */}
                  <div className={`flex flex-row justify-between ${darkMode ? "bg-richblack-600" : "bg-pure-greys-50 text-richblack-800 text-md"} px-5 py-4`}>
                    <div className="w-[70%] font-semibold">
                      {course?.sectionName}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-medium">
                        {course?.subSection.length} Lessions
                      </span>
                      <span
                        className={`${activeStatus === course?.sectionName
                          ? "rotate-0"
                          : "rotate-180"
                          } transition-all duration-500`}
                      >
                        <BsChevronDown />
                      </span>
                    </div>
                  </div>

                  {/* Sub Sections */}
                  {activeStatus === course?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {course.subSection.map((topic, i) => (
                        <div
                          className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                            ? `${darkMode ? "bg-yellow-200 font-semibold text-richblack-800" : "bg-pure-greys-25 font-semibold text-richblack-500 border-l-[5px] border-yellow-50"}`
                            : `${darkMode ? "hover:bg-richblack-900" : "hover:bg-pure-greys-25"}`
                            } `}
                          key={i}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            )
                            setVideoBarActive(topic._id)
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            onChange={() => { }}
                          />
                          {topic.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
          : (
            <div className={`w-10 ${darkMode ? "border border-r-richblack-700 bg-richblack-800" : "bg-white "}`}>
              <button onClick={() => setOpen(true)}>
                <AiOutlineBars className={`ml-2 mt-1 ${darkMode ? "text-richblack-5" : "text-richblack-500"} text-2xl`} />
              </button>
            </div>
          )
      }

    </>
  )
}
