import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constant';
import { addToCart } from '../../../slices/cartSlice';
import { IoMdShareAlt } from "react-icons/io"
import {BiRightArrowCircle} from "react-icons/bi"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course;

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if (token) {
            console.log("dispatching add to cart")
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "you are not logged in",
            text2: "Please login to add to cart",
            btn1text: "login",
            btn2Text: "cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

    const {darkMode} = useSelector((state) => state.mode);

    return (
        <div className={`flex flex-col gap-4 rounded-md ${darkMode ? "bg-richblack-700  text-richblack-5" : "bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-richblack-800"} p-4`}>
            <img
                src={ThumbnailImage}
                alt='Thumbnail Image'
                className='rounded-lg'
            />
            <div className='text-4xl font-semibold'>
                Rs. {CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-3 px-4'>
                <button
                    className={` w-full py-2 rounded ${darkMode ? "bg-yellow-50" : "bg-pure-greys-50"}`}
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : handleBuyCourse
                    }
                >
                    {
                        user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course " : "Buy Now"
                    }
                </button>

                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}
                            className={`w-full ${darkMode ? " bg-richblack-800 " : " bg-pure-greys-5 "} py-2 rounded`}>
                            Add to Cart
                        </button>
                    )
                }
                
            </div>

            <div className='flex flex-col py-2 px-5'>
                <p className='px-4 flex justify-center'>
                    30-Day Money-Back Guarantee
                </p>
                <p className={`text-2xl ${darkMode ? " text-richblack-5" : " text-richblack-400"}`}>
                    This Course Includes:
                </p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-2 items-center text-caribbeangreen-300 font-semibold'>
                                <BiRightArrowCircle/>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div>
                <button
                    className={`mx-auto flex items-center gap-2 p-6 ${darkMode ? "text-yellow-50" : "text-caribbeangreen-800"}`}
                    onClick={handleShare}
                >
                    Share
                    <IoMdShareAlt className='text-2xl'/>
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsCard;