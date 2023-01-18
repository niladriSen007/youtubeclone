import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {format} from "timeago.js";
const Card = ({id,title,imgUrl,videoUrl,likes,dislikes,views,userId,createdAt}) => {


  // const Card = ({id,title,creator,thumbnail,creatorImg}) => {
  const [creator,setCreator] = useState({})

  useEffect(()=>{
    const fetchCreator = async() =>{
      const videoCreator = await axios.get(`/users/${userId}`)
      setCreator(videoCreator.data)
    }
    fetchCreator();
  })

  return (
    <Link to={`/watch/${id}`} className='cursor-pointer'>
      <div className='p-4 flex flex-col  justify-center gap-3 w-96'>
        <img className='w-72 h-44 rounded-lg' src={imgUrl} alt="poster" />
        <div className='flex gap-3'>
          {/* <img className='w-10 h-10 rounded-full' src={creatorImg.} alt="creator" /> */}
          <div className='flex flex-col gap-1 items-start justify-start  '>
            <h2 className='text-base font-bold tracking-wide w-60'>{title}</h2>
            <p className='text-sm  font-bold tracking-wider'>{creator?.name} ✔</p>
            <p className='text-gray-500 text-xs'>
              {views} views · {format(createdAt)}
              {/* 1000 views · 5 Hours ago */}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card