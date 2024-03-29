import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai"
import { getPasswordResetToken } from '../services/operations/authAPI';


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    const {darkMode} = useSelector((state) => state.mode);

    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ? (
                    <div className="spinner"></div>
                )
                    : (
                        <div className='max-w-[500px] p-4 lg:p-8'>
                            <h1 className={`text-[1.875rem] font-semibold leading-[2.375rem] ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>
                                {
                                    !emailSent
                                        ? "Reset Your Password "
                                        : "Check Your Email"
                                }
                            </h1>
                            <p className={`my-4 text-[1.125rem] leading-[1.625rem] ${darkMode ? "text-richblack-100" : "text-richblack-400"}`}>
                                {
                                    !emailSent
                                        ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                        : `We have sent the reset email to ${email}`
                                }
                            </p>

                            <form onSubmit={handleOnSubmit}>
                                {
                                    !emailSent && (
                                        <label className='w-full'>
                                            <p className={`mb-1 text-[0.875rem] leading-[1.375rem] ${darkMode ? "text-richblack-5" : "text-richblack-400"}`}>Email address <span className='text-pink-200'>*</span> </p>
                                            <input className={`w-full rounded-[0.5rem] p-[12px] pr-12 outline-none ${darkMode ? " bg-richblack-800 text-richblack-5" : "bg-richblack-5 text-richblack-500"}`}
                                                required
                                                type='email'
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Enter your email address..'
                                            />
                                        </label>
                                    )
                                }
                                <button
                                    type='submit'
                                    className={`mt-6 rounded-[8px] ${darkMode ? "bg-yellow-50" : "bg-pure-greys-50"} py-[8px] px-[12px] font-medium text-richblack-900 w-full`}
                                >
                                    {
                                        !emailSent ? "Submit" : "Resend email"
                                    }
                                </button>
                            </form>



                            <div className='flex items-center justify-between mt-6'>
                                <Link to="/login">
                                    <p className={`flex items-center gap-x-2 ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
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

export default ForgotPassword