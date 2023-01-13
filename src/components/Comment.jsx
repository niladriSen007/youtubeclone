import React from 'react'

const Comment = ({name,comment,img}) => {
  return (
    <div className='flex items-start gap-3 py-3 '>
        <img className='w-10 h-10 rounded-full' src={img} alt="prof" />
        <div className='flex flex-col '>
            <div className='text-sm lg:text-base font-bold'> {name} <span className='text-gray-400 font-light'>1 month ago</span></div>
            <p className='text-sm lg:text-base'>{comment}</p>
        </div>
    </div>
  )
}

export default Comment