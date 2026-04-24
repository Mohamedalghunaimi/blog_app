import React, { useContext } from 'react'
import Navbar from '../compontents/Navbar'
import Sidebar from '../compontents/Sidebar'
import AddBlog from '../compontents/AddBlog'
import { context } from './Provider'
import Loading from '../compontents/Loading'

const Add = () => {
  const {isLoading} = useContext(context)
  return (<>
  
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        {isLoading?<Loading/>:<AddBlog/>}
    </div>
    </>
  )
}

export default Add
