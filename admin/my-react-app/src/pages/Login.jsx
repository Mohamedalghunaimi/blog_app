import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { context } from './Provider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {setIsAuth,isAuth} = useContext(context)
  const nav = useNavigate()
  useEffect(()=> {
    if(isAuth) {
      nav("/dashboard")
    }

  },[isAuth])
  const loginAsAdmin = async() => {
    if(!email || !password) {
      return toast.error("missing details")
    }
    try {
      const {data} = await axios.post("http://localhost:5000/api/admin/login",{
        email,password
      })
      if(data.success) {
        setIsAuth(true)
        nav("/dashboard")
        
      }
      else {
        toast.error(data.message)

      }

      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <form className='p-[20px] flex flex-col gap-[15px]  border-gray-400 shadow-2xl rounded-2xl'>
        <h1 className='text-center capitalize font-bold text-3xl'> 
          <span className='text-blue-700'>admin</span> login
        </h1>
        <p className=' capitalize text-slate-500 font-semibold'>
          enter your credentails to access the admin panel
        </p>
        <input type='email' placeholder='enter email' className='p-[5px] outline-none border-b-[1px] border-b-gray-400' value={email} onChange={(e)=> {
          setEmail(e.target.value)
        }}/>
        <input type='password' placeholder='enter password' className='p-[5px] outline-none border-b-[1px]  border-b-gray-400' value={password} onChange={(e)=> {
          setPassword(e.target.value)
        }}>
        </input>
        <button className='bg-blue-700 text-white py-[10px] capitalize font-bold text-xl cursor-pointer' onClick={(e)=> {
          e.preventDefault();
          loginAsAdmin()
        }}>
          login
        </button>
      </form>

      
    </div>
  )
}

export default Login
