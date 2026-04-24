import React from 'react'
import Navbar from '../compontents/Navbar'
import Sidebar from '../compontents/Sidebar'
import BlogsComments from '../compontents/BlogsComments'

const Comments = () => {
    return (<>
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        <BlogsComments />
    </div>
    </>
    )
}

export default Comments
