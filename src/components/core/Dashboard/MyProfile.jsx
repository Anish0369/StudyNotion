import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import DashBoard from '../../../pages/DashBoard'
import {RiEditBoxLine} from "react-icons/ri"
import { formattedDate } from "../../../utils/dateFormatter"

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const { darkMode } = useSelector((state) => state.mode);

    return (
        <>
            <h1 className={`mb-14 text-3xl font-medium ${darkMode ? "text-richblack-5" : "text-richblack-600 font-semibold"}`}>
                My Profile
            </h1>

            {/* section 1 */}
            <div className={`flex lg:flex-row md:flex-row sm:flex-row flex-col items-center justify-between rounded-md border-[1px]  ${darkMode ? "bg-richblack-800 border-richblack-700 " : "bg-white border-pure-greys-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"} p-8 px-12`}>
                
                <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col items-center gap-x-4 ">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover max-[639px]:mb-5"
                    />
                    <div className="space-y-1">
                        <p className={`text-lg font-semibold ${darkMode ? "text-richblack-5" : "text-richblack-500"} `}>
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                    customClasses={"max-[639px]:mt-5"}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>

            {/* section 2 */}
            <div className={`my-10 flex flex-col gap-y-10 rounded-md border-[1px] ${darkMode ? "bg-richblack-800 border-richblack-700" : "bg-white border-pure-greys-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"} p-8 px-12`}>
                <div className="flex w-full items-center justify-between">
                    <p className={`text-lg font-semibold ${darkMode ? "text-richblack-5" : "text-richblack-500"}`}>About</p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <p
                    className={`${user?.additionalDetails?.about
                        ? `${darkMode ? "text-richblack-5" : "text-richblack-300"}`
                        : "text-richblack-400"
                        } text-sm font-medium`}
                >
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>
            </div>

            {/* section 3 */}
            <div className={`my-10 flex flex-col gap-y-10 rounded-md border-[1px] ${darkMode ? "border-richblack-700 bg-richblack-800" : "bg-white border-pure-greys-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"} p-8 px-12`}>
                <div className="flex w-full items-center justify-between">
                    <p className={`text-lg font-semibold ${darkMode ? "text-richblack-5" : "text-richblack-500"}`}>
                        Personal Details
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <div className="flex gap-5 max-w-[500px] justify-between overflow-auto">
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className={`text-sm font-medium ${darkMode ? "text-richblack-5" : "text-richblack-300"}`}>
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyProfile