import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const dispatch = useDispatch();
    const location = useLocation();

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // jo b link h us se nikalna h token last me hoga wha b
        const token = location.pathname.split('/').at(-1);
        // yha token wo hai jo humne mail me send kra hai ... mail k last wala part hai jo wo token hai ye 
        dispatch(resetPassword(password, confirmPassword, token));
    }

    const {darkMode} = useSelector((state) => state.mode);

    const { loading } = useSelector((state) => state.auth);
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center text-white'>
            {
                loading ?
                    (
                        <div className="spinner"></div>
                    )
                    : (
                        <div className='max-w-[500px] p-4 lg:p-8'>
                            <h1 className={`text-[1.875rem] font-semibold leading-[2.375rem] ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>Choose new Password</h1>
                            <p className={`my-4 text-[1.125rem] leading-[1.625rem] ${darkMode ? "text-richblack-100" : "text-richblack-300"}`}>Almost done. Enter your new password and you're all set.</p>
                            <form onSubmit={handleOnSubmit}>
                                <label className='relative'>
                                    <p className={`mb-1 text-[0.875rem] leading-[1.375rem] ${darkMode ? "text-richblack-5" : "text-richblack-700"}`}>New Password  <sup className='text-pink-200'>*</sup></p>
                                    <input
                                        className={`border-0 rounded-md w-full p-[0.75rem] ${darkMode ? "bg-richblack-700 border-richblack-400 text-richblack-5" : "bg-richblack-5 border-richblack-25 text-richblack-500"} border-b-[2px]  outline-none !pr-10`}
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='Password'
                                    />

                                    <span
                                        onClick={() => {
                                            setShowPassword((prev) => !prev)
                                        }}
                                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                                    >
                                        {
                                            showPassword
                                                ? <AiOutlineEyeInvisible fontSize={24}
                                                    fill="#AFB2BF"
                                                />
                                                : <AiOutlineEye fontSize={24}
                                                    fill="#AFB2BF"
                                                />
                                        }
                                    </span>

                                </label>
                                <label className="relative mt-3 block">
                                    <p className={`mb-1 text-[0.875rem] leading-[1.375rem] ${darkMode ? "text-richblack-5" : "text-richblack-700"}`}>
                                        Confirm New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Confirm Password"
                                        className={`border-0 rounded-md w-full p-[0.75rem] ${darkMode ? "bg-richblack-700 border-richblack-400 text-richblack-5" : "bg-richblack-5 border-richblack-25 text-richblack-500"} border-b-[2px]  outline-none !pr-10`}
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )}
                                    </span>
                                </label>

                                <button type='submit' 
                                className={`mt-6 w-full rounded-[8px] ${darkMode ? "bg-yellow-50 text-richblack-900" : "bg-pure-greys-50 text-richblack-700"} py-[12px] px-[12px] font-medium `}
                                >
                                    Reset Password
                                </button>

                            </form>

                            <div className='flex items-center justify-between mt-6'>
                                <Link to="/login">
                                    <p className={`flex items-center gap-x-2 ${darkMode ? "text-richblack-5" : "text-richblack-500"}`}>
                                        <AiOutlineArrowLeft />
                                        Back to Login
                                    </p>
                                </Link>
                            </div>

                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword