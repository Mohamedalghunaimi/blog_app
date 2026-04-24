import { useContext, useEffect, useState } from "react"
import { assets} from "../QuickBlog-Assets/assets"
import { context } from "../pages/Provider"
import axios from "axios"
import { toast } from "react-toastify"
import { CiSquareRemove } from "react-icons/ci";

const Comments = ({blog}) => {
    const [comments,setComments] = useState([])
    const [comment,setComment] = useState("")
    const {isAuth} = useContext(context)
    const submit = async()=> {
        setComment("")
        if(!isAuth) {
            return toast.error("you must login ")
        }
        if(!comment.trim().length) {
            return toast.error("you must set content to the comment")
        }
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post("http://localhost:5000/api/comment/add",{
                blogId:blog._id,
                content:comment
            })
            if(data.success) {
                toast.success(data.message)
                getAllComments()
            }else {
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)
        }
    }
    const getAllComments = async()=> {
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post("http://localhost:5000/api/comment/getAllComments",{
                blogId:blog._id,
            })
            if(data.success) {
                setComments(data.comments)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const removeComment = async(commentId)=> {
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post("http://localhost:5000/api/comment/removeByUser",{commentId})
            if(data.success) {
                getAllComments()
                toast.success(data.message)
            }
        } catch (error) {
            
        }

    }
    useEffect(()=> {
        getAllComments()
    },[blog])

    const getTotalComments = ()=> {
        let sum=0;
        comments.forEach((comment)=> {
            if(comment.isApproved) {
                sum++
            }
        })
        return sum

    }


  return (
    <div className="text-left w-[80%] mt-[20px]">
        <h1 className="font-bold text-xl">comments ({getTotalComments()})</h1>
        {
            comments.map((comment)=> {
                if(!comment.isApproved) {
                    return null
                }

                return(<>
                <div className="flex justify-between items-end  bg-slate-100 p-[20px] mt-[20px] relative">
                    <div className="flex items-center  gap-[10px] ">
                        <img src={assets.user_icon} alt="" className="w-[30px] h-[30px]"/>
                        <div >
                            <h1 className="font-semibold text-xl">
                                {comment.userId.name}
                            </h1>
                            <p className="text-sm font-semibold text-gray-500">{comment.content}</p>
                        </div>

                    </div>
                    <span className="text-sm font-semibold">
                        an hour ago
                    </span>
                    {comment.userId._id===isAuth._id?<>
                    <span className="absolute cursor-pointer right-[0px] top-[0px] font-bold text-red-900 text-4xl w-[50px] h-[50px]" onClick={()=> {
                        removeComment(comment._id)
                    }}>
                        <CiSquareRemove/>
                    </span>
                    </>:<></>}
                </div>
                
                </>)
            })
        }
        <form className="mt-[50px] flex flex-col gap-[10px]">
            <h1 className="font-bold text-slate-800 ">
                add your comment
            </h1>

            <textarea placeholder="comment"   className="border-[1px] w-[100%] outline-none p-[5px]" onKeyDown={(e)=> {
                
                if(e.key==='Enter') {
                    submit()
                }

            }} value={comment} onChange={(e)=> {
                setComment(e.target.value)

            }} >
                
            </textarea>
            <button className="py-[10px] px-[15px] capitalize font-bold bg-blue-600 w-fit shadow-lg rounded-lg duration-300 hover:bg-blue-800 text-white" onClick={(e)=> {
                e.preventDefault()
                submit()
            }}>
                submit
            </button>

        </form>
      
    </div>
  )
}

export default Comments
 