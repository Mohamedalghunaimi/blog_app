import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../compontents/Navbar'
import Footer from '../compontents/Footer'
import { useParams } from 'react-router-dom'
import { blog_data } from '../QuickBlog-Assets/assets'
import DOMPurify from "dompurify"
import Comments from '../compontents/Comments'
import { context } from './Provider'
import axios from "axios"
const SingleBlog = () => {
    const {id} = useParams();
    const {blogs} = useContext(context)
    const [blog,setBlog] = useState(false)
    const getSingleBlog = async()=> {
        try {
            const {data} = await axios.post("http://localhost:5000/api/blog/getSingleBlog",{blogId:id})
            if(data.success) {
                setBlog(data.blog)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getSingleBlog()

    },[blogs,id])
    
    const dirtyHTML = blog.description
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
  return (
    <>
    <Navbar/>
    <div className='w-[70%] flex flex-col gap-[10px] capitalize items-center mx-auto text-center '>
        <p className='text-sm font-semibold text-blue-700'>
            published on {new Date(blog.createdAt).toDateString()}
        </p>
        <h1 className='font-bold text-xl lg:text-3xl text-slate-700'>
            {blog.title}
        </h1>
        <p className='font-semibold text-gray-600'>
            {blog.subTitle}
        </p>
        <span className='block border-[1px] py-[5px] px-[15px] bg-blue-200 font-semibold text-blue-800 rounded-xl'>
            {blog.category}

        </span>
        <img src={blog.image} alt=""  className='rounded-xl w-[90%] '/>
        <p dangerouslySetInnerHTML={{__html:cleanHTML}} className='desc  flex flex-col gap-[10px] text-left w-[80%]'></p>

        <Comments blog={blog} />

    </div>
    <Footer/>
    
    
    </>
  )
}

export default SingleBlog
