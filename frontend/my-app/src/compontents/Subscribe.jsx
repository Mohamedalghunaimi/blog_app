import React from 'react'

const Subscribe = () => {
  return (
    <div className='container mx-auto flex flex-col items-center my-[50px] gap-[10px] capitalize'>
        <h1 className=' text-2xl lg:text-6xl text-slate-900 font-bold '>
            never miss a blog! 
        </h1>
        <p className='text-sm lg:text-md'>
            subscribe to get the latest blog,new tech, and the exclusive news.
        </p>
        <div className='border-[1px] w-[90%] lg:w-[50%] flex item-center  overflow-hidden rounded-lg shadow-lg'>
            <input type='email' placeholder='enter your email id' className=' outline-none p-[10px] flex-1' />
            <span className='text-white bg-blue-700 flex justify-center items-center px-[10px] '>
                subscribe
            </span>
        </div>
      
    </div>
  )
}

export default Subscribe
