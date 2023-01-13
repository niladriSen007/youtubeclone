import React from 'react'

const RecommendedCard = ({imgUrl,title,creator}) => {
  return (
    <div className='flex gap-3 px-3 py-3 lg:py-2 cursor-pointer'>
        <img className='w-36 h-24 rounded-sm lg:w-48' src={imgUrl} alt={title} />
        <div className='flex flex-col gap-0 lg:gap-1'>
            <h2 className='font-bold text-sm lg:text-base'>{title}</h2>
            <span className='font-extrabold text-sm lg:text-base'>{creator}</span>
            <p className='text-gray-500 text-xs lg:text-sm '>
              389M views · 2 years ago
            </p>
        </div>
    </div>
  )
}

export default RecommendedCard