import { useContext, useState } from 'react'
import Footer from '../compontents/Footer'
import Navbar from '../compontents/Navbar'
import axios from 'axios'
import { context } from './Provider'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state,setState] = useState("login")
    const [email,setEmail]= useState("")
    const [name,setName] = useState("");
    const [password,setPassword]= useState("")
    const {setIsAuth} = useContext(context)
    const nav = useNavigate()

    
    const loginOrRegister = async () => {
        if(state!=="login") {
            axios.defaults.withCredentials = true
            const {data} = await axios.post("http://localhost:5000/api/auth/register",{
                email,password,name
            })

            if(data.success) {
                setIsAuth(data.user)
                toast.success(data.message)
                nav("/")
            }
            else {
                toast.error(data.message)
            }
        }else {
            axios.defaults.withCredentials = true
            const {data} = await axios.post("http://localhost:5000/api/auth/login",{
                email,password
            })
            if(data.success) {
                setIsAuth(data.user)
                toast.success(data.message)
                nav("/")
            }
        }
    }
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-1 flex items-center justify-center'>
            <div className='border-[1px] p-[20px] shadow-lg min-w-[400px]  '>
                <h1 className='mb-[15px] capitalize text-center text-slate-700 font-semibold text-2xl'>{state}</h1>
                <form className='flex flex-col gap-[15px]'>
                    {state!=="login"?<>
                    <input type='text' placeholder='Enter your name' className='outline-none border-[1px] p-[5px] ' value={name} onChange={(e)=> {
                        setName(e.target.value)
                    }} />
                    </>:<></>}
                    <input type='email' placeholder='Enter your email' className='outline-none border-[1px] p-[5px] '  value={email} onChange={(e)=> {
                        setEmail(e.target.value)
                    }} />
                    <input type='password' placeholder='Enter your password '  className='outline-none border-[1px] p-[5px] ' value={password} onChange={(e)=> {
                        setPassword(e.target.value)
                    }}  />
                    <p className='capitalize text-sm font-semibold text-gray-500'>
                        {state!=="login"?<>
                        i already have an account ? <span className='hover:underline font-semibold cursor-pointer duration-300 text-blue-600' onClick={()=> {
                            setState("login")
                        }}>
                            click here
                        </span>                        
                        </>:<>
                        
                        i don't have an account ? <span className='hover:underline font-semibold cursor-pointer duration-300 text-blue-600' onClick={()=> {
                            setState("sign up")
                        }}>
                            click here
                        </span>                        
                        </>}

                    </p>
                    <button className=' capitalize bg-blue-500 duration-300 hover:bg-blue-700 py-[5px] font-semibold text-lg text-white rounded-md' onClick={(e)=> {
                        e.preventDefault()
                        loginOrRegister()
                    }}>
                        {state}
                    </button>
                </form>
            </div>

        </div>
        <Footer />
      
    </div>
  )
}

export default Login
