import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import { useSelector } from 'react-redux'

export default function Settings() {
    const {darkMode} = useSelector((state)=>state.mode);
    return (
        <>
            <h1 className={`mb-14 text-3xl font-medium ${darkMode ? "text-richblack-5" : "text-richblack-600 "}`}>
                Edit Profile
            </h1>

            {/* section1 => change profile pic  */}
            <ChangeProfilePicture />
            
            {/* section2 => edit profile */}
            <EditProfile />

            {/* section3 => update password  */}
            <UpdatePassword />

            {/* section4 => Delete account */}
            <DeleteAccount />

        </>
    )
}