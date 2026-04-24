import React, { useContext } from 'react'
import { assets } from '../QuickBlog-Assets/assets'
import axios from 'axios'
import { context } from '../pages/Provider'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {setIsAuth} = useContext(context)
  const nav = useNavigate()
  const logout = async()=> {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.get("http://localhost:5000/api/admin/logout")
      if(data.success) {
        setIsAuth(false)
        nav("/")
        

      }
      
    } catch (error) {
      console.log(error)
      
    }

  }
  return (
    <>
    <div className='border-b-[#ddd] border-b-[1px] '>
    <div className=' container mx-auto py-[10px] flex items-center justify-between '>
        <div>
            <img src={assets.logo} alt='' />
        </div>
        <button className='bg-blue-600 text-white capitalize py-[5px] px-[15px] rounded-2xl duration-300 hover:bg-blue-800 cursor-pointer outline-none' onClick={(e)=> {
          e.preventDefault();
          logout()

        }}>
            logout
        </button>
      
    </div>
    </div>

    </>
  )
}

export default Navbar
