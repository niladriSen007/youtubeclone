import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({id,title,creator,creatorImg,thumbnail}) => {
  return (
    <Link to={`/watch/${id}`} className='cursor-pointer'>
      <div className='p-4 flex flex-col  justify-center gap-3 w-96'>
        <img className='w-72 h-44 rounded-lg' src={thumbnail} alt="poster" />
        <div className='flex gap-3'>
          <img className='w-10 h-10 rounded-full' src={creatorImg} alt="creator" />
          <div className='flex flex-col gap-1 items-start justify-start  '>
            <h2 className='text-base font-bold tracking-wide w-60'>{title}</h2>
            <p className='text-sm  font-bold tracking-wider'>{creator} ✔</p>
            <p className='text-gray-500 text-xs'>
              1000 views · 5hours ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card