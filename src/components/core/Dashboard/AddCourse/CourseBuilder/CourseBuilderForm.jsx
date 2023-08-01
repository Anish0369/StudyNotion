import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {MdAddCircleOutline} from "react-icons/md"
import {BiAddToQueue} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import {FaArrowRight} from "react-icons/fa"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors} } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
  }, [course])



  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
      //we are editing the secgtion name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }

    //update values
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext= () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId ){
      cancelEdit();
      return;
    }
    
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  const {darkMode} = useSelector((state) => state.mode);

  return (
    <div className={`text-white ${darkMode ? "bg-richblack-800 border-richblack-700" : "bg-white border-richblack-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"} p-6 rounded-md border-[1px] `}>
      <p className={`text-2xl font-semibold mb-6 ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName' className={`text-sm ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>Section name <sup className='text-pink-200'>*</sup></label>
          <input 
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required:true})}
            className={` w-full ${darkMode ? "form-style" : "light-form-style"}`}
          />
          {errors.sectionName && (
            <span className={`text-xs ${darkMode ? 'text-yellow-50' : 'text-pink-300'}`}>Section Name is required *</span>
          )}
        </div>
        <div className='mt-5 flex w-full'>
          <IconBtn 
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white mb-10"}
          >
            <MdAddCircleOutline className={`${darkMode ? 'text-yellow-50' : 'text-yellow-50'}`} size={20}/>

          </IconBtn>
          {editSectionName && (
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex justify-end gap-x-3 mt-10'>
        <button
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center bg-richblack-400 px-5'>
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <FaArrowRight />
        </IconBtn>

      </div> 
    </div>
  )
}

export default CourseBuilderForm
