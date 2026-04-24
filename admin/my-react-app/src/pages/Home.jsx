import React from 'react'
import Navbar from '../compontents/Navbar'
import Sidebar from '../compontents/Sidebar'
import Dashbord from '../compontents/Dashbord'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        <Dashbord />
    </div>

    
    
    
    </>

  )
}

export default Home
