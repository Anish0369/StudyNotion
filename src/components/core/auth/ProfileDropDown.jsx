import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const {darkMode} = useSelector((state) => state.mode);

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}> 
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className={`text-sm ${darkMode ? "text-richblack-100" : "text-richblack-600"}`} />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 ${darkMode ? "bg-richblack-800" : "bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"}`}
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className={`flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm ${darkMode ? "text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25" : "text-richblack-500 hover:bg-pure-greys-5 hover:text-richblack-500"}`}>
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className={`flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm ${darkMode ? "text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25" : "text-richblack-500 hover:bg-pure-greys-5 hover:text-richblack-500"} `}
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}