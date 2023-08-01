import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChipInput = ({ name, label, register, errors, setValue, getValues }) => {
    const [Tag, setTag] = useState("");
    const [TagList, setTagList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    })

    useEffect(() => {
        setValue(name, TagList);
    }, [TagList])

    const handleTagAdd = () => {
        if (Tag) {
            setTagList([...TagList, Tag]);
            setTag("");
        }
    }

    const handleTagRemove = (index) => {
        // console.log("Tag remove clicked ")
        const updatedTagList = [...TagList];
        updatedTagList.splice(index, 1);
        setTagList(updatedTagList);
    }
    

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const tagValue = event.target.value;
            if(tagValue && !TagList.includes(tagValue)) {
                handleTagAdd();
                setTag('');
            }
            else{
                toast.error("Tag already added")
                setTag('');
            }
        }
    }

    const {darkMode} = useSelector((state) => state.mode);

    return (
        <div>

            <label htmlFor={name} className={`${darkMode ? "label-style" : "text-richblack-600"}`}>{label} <sup className='text-pink-200'>*</sup></label>

            <div className='flex my-2 flex-wrap'>
            {
                TagList.length > 0 && (  
                    TagList.map((Tag, index) => (
                        <div 
                            key={index}
                        >
                            <div className={`m-1 flex items-center rounded-full ${darkMode ? "bg-yellow-400 text-richblack-5" : "border border-richblack-200 text-richblack-500"} px-2 py-1 text-sm `}>{Tag}
                                <button
                                    type='button'
                                    onClick={() => handleTagRemove(index)}
                                    className='ml-2 focus:outline-none cursor-pointer text-xs' 
                                >
                                X
                            </button>
                            </div>
                            
                        </div>
                    )) 
                )
            }
            </div>


            <div>
                <input
                    type="text"
                    id={name}
                    value={Tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={` w-full ${darkMode ? "form-style" : "light-form-style"}`}
                    placeholder='Enter tag and press , or enter to add tag'
                />
            </div>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required <sup className='text-pink-300'>*</sup>
                </span>
            )}
        </div>
    )
}

export default ChipInput