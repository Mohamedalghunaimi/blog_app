import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import { context } from '../pages/Provider';
const TableOfBlogs = ({blogs,limit}) => {
  const {getBlogs} = useContext(context)
  const removeBlog = async(blogId)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/removeBlog",{
        blogId
      })
      if(data.success) 
      {
        getBlogs()
      }
    } catch (error) {
      console.log(error)
    }

  }
  const updateBlog = async(blogId,publish)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/updateBlog",{
        blogId,publish

      })
      console.log(data)
      if(data.success) {
        getBlogs()
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
     <table className='w-[100%] text-center capitalize h-auto overflow-y-scroll'>
        <thead className='font-bold'>
          <tr>
            <td>
              #
            </td>
            <td>
              blog title
            </td>
            <td>
              date
            </td>
            <td>
              status
            </td>
            <td>
              action
            </td>
            <td>
              remove
            </td>
          </tr>
        </thead>
        <tbody>
      {
        blogs.slice(0,limit).map((blog,index)=> {
          return(<>
          <tr className='border-b-[1px] i border-b-gray-200 p-[5px]'>
            <td className='py-[20px]'>
              {index+1}
            </td>
            <td>
              {blog.title}
            </td>
            <td>
              {new Date(blog.createdAt).toDateString()}
            </td>
            <td>
              {blog.isPublished?"published":"unpublished"}
            </td>
            <td className=''>
              <span className={`block cursor-pointer  ${blog.isPublished?"text-red-500":" text-green-500"}`} onClick={()=> {
                updateBlog(blog._id,!blog.isPublished)
              }}>
              {!blog.isPublished?"published":"unpublished"}
              </span>
            </td>
            <td className='text-red-500'>
              <span className='block w-fit mx-auto text-2xl cursor-pointer' onClick={()=> {
                removeBlog(blog._id)
              }}>
              <FaDeleteLeft />
              </span>

            </td>
          </tr>
          
          
          </>)
        })
      }        </tbody>
      </table>
  )
}

export default TableOfBlogs
