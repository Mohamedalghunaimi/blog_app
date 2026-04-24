import React from 'react'
import { blog_data } from '../QuickBlog-Assets/assets'
import { BsArchive } from "react-icons/bs";
import { useContext } from 'react';
import { context } from '../pages/Provider';
import { FaComment } from "react-icons/fa";
import { MdDrafts } from "react-icons/md";

import TableOfBlogs from './TableOfBlogs';

const Dashbord = () => {
  const {comments,blogs} = useContext(context)
    let  drafts = 0;
    blogs.forEach(element => {
      if(!element.isPublished) {
        drafts+=1
      }
      
    });
  

  return (
    <div className='flex-1 bg-slate-100 p-[20px]'>
      <div className='flex gap-[15px] text-lg font-semibold text-gray-600 flex-wrap'>
      <div   className='bg-white w-[200px] h-[100px] flex justify-center items-center gap-[10px]  capitalize rounded-xl'> 
        <span className='w-[70px] h-[70px] bg-sky-100 text-blue-500 flex items-center justify-center font-semibold text-2xl' >
          <BsArchive/>
        </span>
        <span>
          {blogs.length} blog
        </span>
      </div>
      <div className='bg-white w-[200px] h-[100px] flex justify-center items-center gap-[10px]  capitalize rounded-xl'>
        <span className='w-[70px] h-[70px] bg-sky-100 text-blue-500 flex items-center justify-center font-semibold text-2xl' >
          <FaComment />
        </span>
        <span>
          {comments.length} comments
        </span>
      </div>
      <div  className='bg-white w-[200px] h-[100px] flex justify-center items-center gap-[10px]  capitalize rounded-xl'>
        <span className='w-[70px] h-[70px] bg-sky-100 text-blue-500 flex items-center justify-center font-semibold text-2xl' >
          <MdDrafts />
        </span>
        <span>
          {drafts} drafts
        </span>
      </div>
      </div>
      <h1 className='text-4xl font-bold my-[20px]'>
        latest blogs
      </h1>
      {blogs.length?<TableOfBlogs blogs={blogs} limit={6} />:<>
      
      <h1>
        no blogs
      </h1>
      </>}
    </div>
  )
}

export default Dashbord
