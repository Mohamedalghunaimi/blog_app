import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDownloadDone } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const nav = useNavigate()
    const location = useLocation()
  return (
    <div className='min-h-screen w-[20%] border-r-[1px] border-[#ddd] pt-[40px] flex flex-col gap-[10px]'>
        <div className={`cursor-pointer  flex items-center  justify-center  capitalize gap-[10px] p-[10px] text-slate-800  font-semibold text-lg  duration-300  ${location.pathname==="/dashboard"?"bg-blue-100 border-r-blue-500 border-r-[5px] ":""}  `} onClick={()=> {
            nav("/dashboard")
        }}>
            <span className='text-2xl md:text-xl'>
                <AiFillDashboard/>
            </span>
            <span className='hidden md:block'>
                dashboard
            </span>
        </div>
        <div  className={`cursor-pointer  flex items-center  justify-center  capitalize gap-[10px] p-[10px] text-slate-800  font-semibold text-lg  duration-300  ${location.pathname==="/add"?"bg-blue-100 border-r-blue-500 border-r-[5px] ":""}  `} onClick={()=> {
            nav("/add")
        }}>
            <span className='text-2xl md:text-xl'>
                <IoAddCircleOutline/>
            </span>
            <span className='hidden md:block'>
                add blog
            </span>
        </div>
        <div  className={`cursor-pointer  flex items-center justify-center capitalize gap-[10px] p-[10px] text-slate-800  font-semibold text-lg  duration-300   ${location.pathname==="/list"?"bg-blue-100 border-r-blue-500 border-r-[5px] ":""}  `} onClick={()=> {
            nav("/list")
        }}>
            <span className='text-2xl md:text-xl'>
                <MdOutlineDownloadDone/>
            </span>
            <span  className='hidden md:block'>
                blog lists
            </span>
        </div>
        <div className={`cursor-pointer  flex items-center capitalize  justify-center  gap-[10px] p-[10px] text-slate-800  font-semibold text-lg  duration-300  ${location.pathname==="/comments"?"bg-blue-100 border-r-blue-500 border-r-[5px] ":""}  `} onClick={()=> {
            nav("/comments")
                
        }}>
            <span className='text-2xl md:text-xl'>
                <FaRegCommentDots/>
            </span>
            <span  className='hidden md:block'>
                comments
            </span>
        </div>

    </div>
  )
}

export default Sidebar
