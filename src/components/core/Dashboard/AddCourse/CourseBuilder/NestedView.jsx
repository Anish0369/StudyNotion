import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'

const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        console.log("REndering it again");
    });
    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id
        },
            token
        );

        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);

    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token });
        if (result) {

            // slice k andr course aa rha hai usko liya hai uspe map lgaya hai 
            // agar id equal hoti hai to hum result ko use krenge otherwise hum section as it is rhne denge 
            // fir uske baad updated course generate krenge and usko hi setCourse me set kr denge 
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

    const {darkMode} = useSelector((state)=>state.mode);

    return (
        <div>

            <div className={`rounded-lg ${darkMode ? "bg-richblack-700" : "bg-white border-[1px] border-richblack-200"} p-6 px-8`}>
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>

                        <summary className='flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-500'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className={`text-xl ${darkMode ? "text-richblack-50" : "text-richblack-500"} my-4`}/>
                                <p className={`${darkMode ? "text-richblack-50" : "text-richblack-500"} font-semibold my-4`}>{section.sectionName}</p>
                            </div>
                            <div className=' flex items-center gap-x-3'>
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit className={`text-xl ${darkMode ? "text-richblack-300" : "text-caribbeangreen-300"} my-4`} />
                                </button>

                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this section wil be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}
                                >
                                    <RiDeleteBin6Line className={`text-xl ${darkMode ? "text-richblack-300" : "text-pink-200"} my-4`} />
                                </button>
                                <span className='my-4 text-richblack-300'>|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300 my-4`} />
                            </div>

                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    // is div ka onclick andr jo b button hai unpe b laagu hojaayegaa ek trh s dekhen agar so hume usko ande walo me stop krna hoga
                                    <div
                                        key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3    m-5'
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu className={`text-xl ${darkMode ? "text-richblack-50" : "text-richblack-500"} mb-4`} />
                                            <p className={`${darkMode ? "text-richblack-50" : "text-richblack-500"} mb-4 font-semibold`}>{data.title}</p>
                                        </div>

                                        <div

                                        onClick={(e) => e.stopPropagation()}
                                            className='flex items-center gap-x-3'>

                                            <button
                                                onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                                            >
                                                <MdEdit className={`text-xl ${darkMode ? "text-richblack-300 " : "text-caribbeangreen-300"} mb-4`} />
                                            </button>
                                            <button
                                                onClick={() => setConfirmationModal({
                                                    text1: "Delete this Sub Section",
                                                    text2: "selected Lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })}
                                            >
                                                <RiDeleteBin6Line className={`text-xl ${darkMode ? "text-richblack-300" : "text-pink-200"} mb-4`}/>

                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className={` ${darkMode ? "text-yellow-50" : "text-richblack-300"} m-4 flex items-center gap-x-2 `}
                            >
                                <AiOutlinePlus className='text-lg'/>
                                <p className='font-bold '>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {addSubSection ?
                (<SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />)
                : viewSubSection ?
                    (<SubSectionModal
                        modalData={viewSubSection}
                        setModalData={setViewSubSection}
                        view={true}
                    />)
                    : editSubSection ?
                        (<SubSectionModal
                            modalData={editSubSection}
                            setModalData={setEditSubSection}
                            edit={true}
                        />)
                        : (<div></div>)
            }

            {confirmationModal ?
                (
                    <ConfirmationModal modalData={confirmationModal} />
                )
                : (<div></div>)
            }

        </div>
    )
}

export default NestedView
