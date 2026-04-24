import React from 'react'
import Navbar from '../compontents/Navbar'
import Sidebar from '../compontents/Sidebar'
import List from '../compontents/List'

const BlogLists = () => {
    return (<>
    <Navbar/>
    <div className='flex '>
        <Sidebar />
        <List />

        
    </div>
    </>
    )
}

export default BlogLists
