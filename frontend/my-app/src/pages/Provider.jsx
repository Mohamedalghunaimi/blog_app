import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
export const context = createContext()

const Provider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false)
  const [blogs,setBlogs] = useState([])

    const getBlogs = async()=> {
        try {
            const {data} = await axios.get("http://localhost:5000/api/blog/getAllBlogs")
            if(data.success) {
                setBlogs(data.blogs)
            }
            else {
                console.log(data.message)
            }
        } catch (error) {
                console.log(error.message)

        }
    }
        
    useEffect(()=> {
        getBlogs()
    },[])
  const verifiyISAuth = async() => {
    try {
        axios.defaults.withCredentials = true
        const {data} = await axios.get("http://localhost:5000/api/auth/isAuth")
        console.log(data)
        if(data.success) {
          setIsAuth(data.user)
        }else {

        }

    } catch (error) {
      console.error(error)
    }
  }
  console.log({isAuth})
  
    const value = {
      isAuth,
      setIsAuth,
      getBlogs,
      blogs,
      setBlogs
    }
    useEffect(()=> {
      verifiyISAuth()
    },[])
  return (
    <context.Provider value={value}>
        {children}
    </context.Provider>

  )
}

export default Provider
