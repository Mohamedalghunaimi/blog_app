import React, { useContext, useState } from 'react'
import { assets, blogCategories } from '../QuickBlog-Assets/assets'
import axios from 'axios'
import { FaTowerBroadcast } from 'react-icons/fa6'
import {  toast } from 'react-toastify';
import { context } from '../pages/Provider';
import { useRef } from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { marked } from 'marked';

import DOMPurify from 'dompurify';

const AddBlog = () => {
  const {getBlogs,getComments,setIsLoading} = useContext(context)
  const [img,setImg] = useState(false)
  const [title,setTitle] = useState("")
  const [subTitle,setSubTitle] = useState("")
  const [description,setDescription] = useState("");
  const [aiResult,setAiResult] =useState("")
  const [category,setCategory] = useState("")
  const [publish,setPublish] = useState(false)
  const [generatLoading,setGenerateLoading] = useState(false)
  const [publicLoading,setPublicLoading] = useState(false)
  const addBlog = async()=> {
    const formData = new FormData();
    img&&formData.append("image1",img)
    formData.append("title",title)
    formData.append("subTitle",subTitle)
    formData.append("description",DOMPurify.sanitize(marked(description||aiResult)))
    formData.append("category",category)
    formData.append("isPublished",publish)
    try {

      axios.defaults.withCredentials = true
      const {data} = await axios.post("http://localhost:5000/api/admin/addBlog",formData)
      if(data.success) {
        toast.success("blog is added")
        getComments()
        getBlogs()
        setIsLoading(false)
        
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setPublicLoading(false)
    }


  }
  const Textarea = useRef(null)

  const generateContentByAi = async()=> {
    try {
      if(!title) {
        return toast.error("please enter the title")
      }
      setGenerateLoading(true)
      setDescription("")

      const {data} = await axios.post("http://localhost:5000/api/admin/generateContent",{title})
      if(data.success) {

        let i = 0;
        const interval = setInterval(() => {
          setAiResult((prev) => prev + data.content[i]);
          i++;
          if (i >= data.content.length) {
            clearInterval(interval);
          }
        }, 0.001);

      }else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      
    } finally {
      setGenerateLoading(false)

    }
  }






  return (
    <div className='flex-1 bg-slate-100 p-[20px]'>
      <div className='bg-white p-[30px] rounded-2xl flex flex-col gap-[10px]  capitalize '>
        <div className='flex flex-col gap-[10px] max-w-[600px]'>
        <h1 className='font-semibold text-xl'>upload photo</h1>
        <label htmlFor='img'>
          <input disabled={publicLoading} type='file' id="img" hidden required  onChange={(e)=>{
            setImg(e.target.files[0])
          }} />
          <img src={!img?assets.upload_area:URL.createObjectURL(img)} alt="" className='w-[150px] h-[100px] cursor-pointer rounded-lg' />
        </label>
        <h1>blog title</h1>
        <input  disabled={publicLoading} type='text' placeholder='type here' value={title} onChange={(e)=>{
          setTitle(e.target.value)
        }} className='border-[1px] outline-none p-[10px]' />
        <h1>sub title</h1>
        <input  disabled={publicLoading} type='text' placeholder='type here' className='border-[1px] outline-none p-[10px]' value={subTitle} onChange={(e)=>{
          setSubTitle(e.target.value)
        }}  />
        <h1>blog description</h1>
        {
          !aiResult.length ?<>
        <div className='relative'>

        <textarea ref={Textarea} placeholder='type here' className=' resize-none h-[300px] w-[100%]  overflow-y-scroll border-[1px] outline-none p-[10px]'   onChange={(e)=>{
          //setDescription(e.target.value)
        }} /> 
        <button onClick={(e)=> {
          e.preventDefault()

          generateContentByAi()

        }} className='block absolute bottom-[20px] right-[20px] capitalize bg-slate-600 duration-300 text-white py-[5px] px-[10px] cursor-pointer hover:bg-slate-800 rounded-full'>
          {generatLoading?<><span className='animated2'></span></>:"generate from ai geminai"}
        </button>

        </div>          
        </>:<>
        <div className=' flex flex-col gap-2.5'>
          <div className=' bg-gray-100 border-2 border-gray-200 p-5 text-slate-600'>
          <ReactMarkdown>
            {aiResult}
          </ReactMarkdown>
          </div>

          <button  disabled={publicLoading} onClick={()=>setAiResult("")} className='px-3 py-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-2xl capitalize cursor-pointer '>
            clear description
          </button>
        </div>

        </>
        }

        <h1>blog category</h1>
        <select className='border-[1px] border-slate-500 w-[200px] p-[5px] outline-none'   onChange={(e)=>{
          setCategory(e.target.value)
        }} >
          {
            blogCategories.map((category)=> {
              return(<>
              <option value={category}>
                {category}
              </option>
              
              </>)
            })
          }
        </select>
        <p className='flex items-center gap-[5px]'>
          <input  disabled={publicLoading} type='checkbox' id='publish' checked={publish}  onChange={(e)=> {
            setPublish(e.target.checked)
          }}/>
          <label htmlFor='publish' className='cursor-pointer'>
            publish now
          </label>
        </p>
        <button disabled={generatLoading || publicLoading} className='bg-blue-600 capitalize text-white py-[10px] px-[20px] w-fit rounded-lg cursor-pointer' onClick={()=> {
          addBlog()
          setIsLoading(true)
        }}>
          add blog
        </button>


        </div>

      </div>
      
    </div>
  )
}

export default AddBlog
