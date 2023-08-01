import React from "react";
import ContactUsForm from "./ContactUsForm";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const {darkMode} = useSelector((state)=> state.mode);
  return (
    <div className={`border ${darkMode ? "border-richblack-600 " : "border-pure-greys-25"} text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col`}>
      <h1 className={`text-4xl leading-10 font-semibold ${darkMode ? "text-richblack-5" : "text-richblack-600"}`}>
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;