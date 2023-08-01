import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

import ConfirmationModal from "../../../common/ConfirmationModal"
import { useState } from "react"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  const {darkMode} = useSelector((state) => state.mode);

  return (
    <>
      
      <div className={`my-10 flex flex-row gap-x-5 rounded-md border-[1px] p-8 px-12 items-center ${darkMode ? " border-pink-700 bg-pink-900" : " border-pink-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"}`}> 
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <button
              onClick={() =>
                  setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "Do you want to delete your account? All the infromation related to you will be deleted after you delete account.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => dispatch(handleDeleteAccount()),
                      btn2Handler: () => setConfirmationModal(null),
                  })
              }
              className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
              <FiTrash2 className="text-3xl text-pink-200" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className={`text-lg font-semibold ${darkMode ? "text-richblack-5" : "text-pink-400"}`}>
              Delete Account
            </h2>
          </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
