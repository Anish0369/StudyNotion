import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import {IoCloseSharp} from "react-icons/io5" 
import { AiOutlineBars } from "react-icons/ai"

export default function Sidebar() {
    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
    )
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(true);

    // to keep track of confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null)
    const {darkMode } = useSelector((state) => state.mode);

    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        )
    }


    return (
        <>
            {
                open ?
                (
                    <div className={`flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px]  ${darkMode ? "bg-richblack-800 border-r-richblack-700" : "bg-white border-r-pure-greys-25 "}`}>
                        <button 
                            onClick={() => setOpen(false)} 
                            className="m-2 "
                        >
                            <IoCloseSharp className={`${darkMode ? "text-richblack-5" : "text-richblack-500"} text-2xl ml-[185px]`}/>
                        </button>
                        <div className="flex flex-col">
                            {sidebarLinks.map((link) => {
                                if (link.type && user?.accountType !== link.type) return null
                                return (
                                    <SidebarLink key={link.id} link={link} iconName={link.icon} />
                                )
                            })}
                        </div>
                        <div className={`mx-auto mt-6 mb-6 h-[1px] w-10/12 ${darkMode ? "bg-richblack-700" : "bg-pure-greys-50"}`} />
                        <div className="flex flex-col">
                            <SidebarLink
                                link={{ name: "Settings", path: "/dashboard/settings" }}
                                iconName="VscSettingsGear"
                            />
                            <button
                                onClick={() =>
                                    setConfirmationModal({
                                        text1: "Are you sure?",
                                        text2: "You will be logged out of your account.",
                                        btn1Text: "Logout",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => dispatch(logout(navigate)),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
                                }
                                className="px-8 py-2 text-sm font-medium text-richblack-300"
                            >
                                <div className="flex items-center gap-x-2">
                                    <VscSignOut className="text-lg" />
                                    <span>Logout</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )
                : (
                    <div className={`${darkMode ? "bg-richblack-800 border border-r-richblack-700" : "bg-white "} w-10 `}>
                        <button onClick={() => setOpen(true)}>
                            <AiOutlineBars className={`ml-2 mt-1 ${darkMode ? "text-richblack-5" : "text-richblack-500"} text-2xl`} />
                        </button>
                    </div>
                )
            }

            {/*  logout pr click krne pr modal open kr do  */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}