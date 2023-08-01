import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HilightText from '../components/core/HomePage/HilightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';
import { useSelector } from 'react-redux';

const Home = () => {
    const {darkMode} = useSelector((state) => state.mode);
    return (
        <div>
            {/* divide page into 3 sections and a footer by page colour wise */}

            {/* section 1 */}
            <div className='max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>

                <Link to={"/signup"}>
                    {/* jub b m hover kru to parent ka colour or b dark hojaye to uske liye group ka use krenge or child me property define krenge*/}
                    <div className={`group mt-16 p-1 mx-auto rounded-full ${darkMode ? "bg-richblack-800 text-richblack-200" : "bg-pure-greys-25 text-richblack-400"} font-bold  transition-all duration-200 hover:scale-95 w-fit shadow-[0px_1px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-none`}>

                        <div className={`flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 ${darkMode ? "group-hover:bg-richblack-900" : "group-hover:bg-pure-greys-50"} `}>

                            <p>Become an Instrcutor</p>
                            <FaArrowRight />

                        </div>
                    </div>
                </Link>

                <div className={`text-center text-4xl font-semibold mt-7 ${darkMode ? "text-richblack-5":"text-richblack-600"}`}>
                    Empower Your Future With
                    <HilightText text={" Coding Skills"} />
                </div>

                <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn more
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className=' mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200
            '>
                    <video className='shadow-[20px_20px_0px_0px_rgba(255,255,255)]'
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/*code section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row flex-col"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock your
                                <HilightText text={" coding potential "} />
                                with our online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codeColor={"text-yellow-25"}
                        backgroundGradient={
                            "codeblock1"
                        }
                    />
                </div>

                {/* code section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse flex-col"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HilightText text={" coding in seconds "} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={
                            `import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`
                        }
                        codeColor={"text-white-25"}
                        backgroundGradient={
                            "codeblock2"
                        }
                    />
                </div>

                <ExploreMore />

            </div>

            {/* section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700 '>
                <div className='homepage_bg h-[310px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='h-[190px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                    <div className='flex lg:flex-row flex-col justify-between gap-7 mb-10 mt-20'>
                        <div className='text-4xl font-semibold '>
                            Get the skills you need for a
                            <HilightText text={" job that is in demand."} />
                        </div>
                        {/* w-[90%] text-center text-lg font-bold text-richblack-300 mt-4 */}
                        <div className='flex flex-col gap-10 lg:w-[40%] lg:items-start items-center text-lg font-bold text-richblack-300'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn more
                            </CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* section 3 */}
            <div className={`relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ${darkMode && "bg-richblack-900 text-white"}`}>
                {/* Become a instructor section */}
                <InstructorSection />

                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                <ReviewSlider />
            </div>

            {/* footer */}
            <Footer />

        </div>
    )
}

export default Home