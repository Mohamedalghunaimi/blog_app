import TableOfBlogs from './TableOfBlogs'
import { blog_data } from '../QuickBlog-Assets/assets'
import { useContext } from 'react'
import { context } from '../pages/Provider'

const List = () => {
  const {blogs} = useContext(context)
  return (
    <div className='flex-1 bg-slate-100 p-[20px]'>
      <h1 className=' mb-[20px] text-3xl font-bold capitalize'>
        all blogs
      </h1>
      
      {blogs.length?<TableOfBlogs blogs={blogs} limit={blogs.length} />:<>
      <h1>
        no blogs
      </h1>
      </>}
    </div>
  )
}

export default List
