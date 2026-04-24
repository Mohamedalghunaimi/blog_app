import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const context = createContext()
const Provider = ({children}) => {
  const [isAuth,setIsAuth] = useState(false)
  const [comments,setComments] = useState([])
  const [blogs,setBlogs] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const isAuthAsAdmin = async()=> {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.get("http://localhost:5000/api/admin/isAuth")
      if(data.success) {
        setIsAuth(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getComments = async()=> {
    try {
            axios.defaults.withCredentials = true

      const {data} = await axios.get("http://localhost:5000/api/admin/getAllComments")
      
      if(data.success) {
        setComments(data.comments)
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  const getBlogs = async() => {
    try { 
            axios.defaults.withCredentials = true

      const {data} = await axios.get("http://localhost:5000/api/admin/getAllBlogs")
      console.log(data)
      if(data.success) {
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.log(error)
      
    }

  }

  useEffect(()=> {
    isAuthAsAdmin()
    getComments()
    getBlogs()

  },[isAuth])
    
    const value = {
      isAuth,setIsAuth,comments,setComments,getComments,
      blogs,setBlogs,getBlogs,isLoading,setIsLoading

    }
  return (
    <context.Provider value={value}>
        {children}

    </context.Provider>

  )
}

export default Provider
