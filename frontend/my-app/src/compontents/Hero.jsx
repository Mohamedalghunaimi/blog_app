import React from 'react'
import { FaBrain } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='flex items-center flex-col mt-[50px] capitalize gap-[10px] '>
        <p className='flex gap-[5px] items-center border-[1px] w-fit py-[5px] px-[20px] text-md text-blue-800 bg-blue-200 border-[#ddd] rounded-full'>
            new ai feature is integrated <span>
                <FaBrain />
            </span>
        </p>
        <h1 className='font-bold text-4xl lg:text-6xl my-[20px] text-slate-800 text-center  lg:max-w-[500px] '>
            you are <span className='text-blue-700'>blogging</span> platform.
        </h1>
        <p className='text-center font-semibold text-sm text-gray-600 max-w-[700px]'>
            this is your space to think outload,to share what's matter,and to write without filter.whether
            it's one world or a thousand.your story starts right here
        </p>
    </div>
  )
}

export default Hero
