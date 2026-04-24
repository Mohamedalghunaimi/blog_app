import { useContext, useEffect, useState } from 'react'
import {  blog_data, blogCategories } from '../QuickBlog-Assets/assets'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { context } from '../pages/Provider';
const Blogs = () => {
    const [category,setCategory] = useState("all");
    const [search,setSearch] = useState("")
    const [items,setItems] = useState([])
    const nav = useNavigate()
    const {getBlogs,blogs} = useContext(context)
  
    
    const filterByCategory = async()=> {
        let blogCopy = blogs.slice();
        if(category!=="all") {
            blogCopy = blogCopy.filter((item)=> {
                if(item.category.toLowerCase()===category.toLowerCase()) {
                    return true
                }
                return false
            })
        }
        if(search.length) {
            blogCopy=blogCopy.filter((item)=> {
                if(item.title.toLowerCase().includes(search.toLowerCase())) {
                    return true
                }
                return false
            })
        }
        setItems(blogCopy)
    }

    useEffect(()=> {
        filterByCategory()

    },[category,search,blogs])



  return (
    <div className='container mx-auto flex flex-col mt-[50px] items-center '>
        <div className='border-[1px] flex w-[90%] lg:max-w-[500px] shadow-lg overflow-hidden capitalize'>
            <input type="text" placeholder='search for blogs' className='border-none flex-1 p-[10px] outline-none capitalize' value={search} onChange={(e)=> {
                setSearch(e.target.value)
            }} />
            <button className='bg-blue-600 text-white px-[20px] capitalize'>
                search
            </button>
        </div>
        <ul className='flex gap-[20px]  text-gray-500 font-semibold  items-center mt-[50px] capitalize'>
            {
                blogCategories.map((category1,i)=> {
                    return(<>
                    <li key={i} className={` duration-300 cursor-pointer py-[5px] px-[15px]  rounded-xl ${category.toLowerCase()===category1.toLowerCase()?"bg-blue-500  text-white":""}`} onClick={()=> {
                        setCategory(category1.toLowerCase())
                    }}>
                        {category1}
                    </li>
                    </>)
                })

            }
        </ul>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] justify-between my-[50px]'>
            {
                items.map((blog,i)=> {
                    if(!blog.isPublished) {
                        return null
                    }
                    return(
                    
                    <div key={i} className='border-[1px] cursor-pointer shadow-lg overflow-hidden rounded-xl' onClick={()=> {
                        nav(`/blog/${blog._id}`)
                    }} >
                        <img src={blog.image} alt='' className='w-[100%]'/>
                        <p className='p-[10px] capitalize flex flex-col gap-[10px]'>
                            <span className='w-fit bg-blue-200 px-[10px] py-[5px] font-semibold rounded-lg text-blue-800'>
                                {blog.category}
                            </span>
                            <span className='font-bold text-slate-700 text-md'>
                                {blog["title"]}
                            </span>
                            <span className='text-sm font-semibold text-gray-500'>
                                {blog.subTitle}
                            </span>
                        </p>
                    </div>
                    )
                })
            }
        </div>
      
    </div>
  )
} 

export default Blogs
