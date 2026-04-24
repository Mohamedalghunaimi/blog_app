import React, { useContext, useState } from 'react'
//import context from '../pages/Provider'
import { blog_data } from '../QuickBlog-Assets/assets'
import { context } from '../pages/Provider'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
const BlogsComments = () => {
  const {comments,getComments} = useContext(context)
  const [approved,setApproved] = useState(true)

  const deleteComment = async(commentId)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/deleteComment",{commentId})
      if(data.success) {
        getComments()

      }
    } catch (error) {
      console.log(error)
    }

  }

  const updateStatusOfComment = async(commentId,approved)=> {
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/updateComment",{
        commentId,approved
      })
      console.log(data)
      if(data.success) {
        getComments()
      }
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className='flex-1 bg-slate-100 p-[20px]'>
        <p className=' flex items-center justify-between capitalize mb-[10px] text-sm'>
          <h1 className='font-bold text-lg'>
            comments
          </h1>
          <div className='flex gap-[10px]'>
            <span className={`py-[5px] cursor-pointer px-[15px] border-[1px] border-slate-400 rounded-full ${approved?"bg-blue-500 text-white":""}  cursor-pointer`} onClick={()=> {
              setApproved(true)
            }}>
              approved
            </span>
            <span  className={`py-[5px] px-[15px] cursor-pointer border-[1px] border-slate-400 rounded-full ${!approved?"bg-blue-500 text-white":""}  cursor-pointer`} onClick={()=> {
              setApproved(false)
            }}>
              not approved
            </span>
          </div>
        </p>
      <div className='bg-white p-[20px] capitalize'>
        <div className='grid grid-cols-3 gap-[50px]   mb-[20px] items-center  font-bold text-xl '>
          <p> 
            blog title && comments
          </p>
          <p>
            date
          </p>
          <p>
            action
          </p>

        </div>

        {
          comments.map((comment)=> {
            //const blog = blog_data.find((item)=> item._id===comment.blogId)
            if(approved) {
              if(!comment.isApproved) {
                return null
              }
            }else {
              if(comment.isApproved) {
                return null
              }           
             }
            
            return(<>
        <div className='grid grid-cols-3 gap-[50px] items-center mb-[20px]   pb-[10px]'>
          <ul>
            <li className=''>
              <span>blog: </span>{comment.blogId.title}
            </li>
            <li>
              <span>name: </span>{comment.userId.name}
            </li>
            <li>
              <span>content: </span>{comment.content}            
            </li>
          </ul>
          <p>
            {new Date(comment.createdAt).toDateString()}
          </p>
          <p className='flex items-center gap-[15px]'>
            <span className='py-[5px] px-[10px] rounded-full border-[1px] cursor-pointer' onClick={()=> {
              updateStatusOfComment(comment._id,!comment.isApproved)
            }}>
              {comment.isApproved?"not approved":"approved"}
            </span>
            <span className='cursor-pointer text-red-600' onClick={()=> {
              deleteComment(comment._id)
            }}>
              delete
            </span>
            
          </p>

        </div>
            </>)
          })
        }

      </div>
      
    </div>
  )
}

export default BlogsComments
