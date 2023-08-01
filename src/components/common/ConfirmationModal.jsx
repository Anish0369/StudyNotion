import React from 'react'
import IconBtn from './IconBtn'
import { useSelector } from 'react-redux';

const ConfirmationModal = ({modalData}) => { 

    const {darkMode} = useSelector((state) => state.mode);

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className={`w-11/12 max-w-[350px] rounded-lg border  p-6 ${darkMode ? "bg-richblack-800 border-richblack-400" : "bg-white border-pink-200"}`}>
            <p className={`text-2xl font-semibold ${darkMode ? "text-richblack-5" : "text-richblack-500"}`}>{modalData.text1}</p>
            <p className={`mt-3 mb-5 leading-6 ${darkMode ? "text-richblack-200" : "text-richblack-300"}`}>{modalData.text2}</p>
            <div className='flex items-center gap-x-4'>
                <IconBtn  
                    onclick={ 
                        modalData?.btn1Handler
                    }
                    text={modalData?.btn1Text}
                />

                <button 
                    className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                    onClick={modalData.btn2Handler}>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal