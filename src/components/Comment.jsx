import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Comment = ({comment,userId}) => {

  const [channel,setChannel] = useState({})

  useEffect(()=>{
    const fetchComment = async() =>{
      const res = await axios.get(`/users/${userId}`);
      setChannel(res.data)
  }
  fetchComment()
},[userId])

  return (
    <div className='flex items-start gap-3 py-3 '>
        <img className='w-10 h-10 rounded-full' src="https://ik.imagekit.io/ksaehdhru/246294c2-89f5-4b3f-8f6a-404bce2ac5b6_IzzUwJgsv.jfif?ik-sdk-version=javascript-1.4.3&updatedAt=1672603116600" alt="prof" />
        <div className='flex flex-col '>
            <div className='text-sm lg:text-base font-bold'> {channel.name}  <span className='text-gray-400 font-light'> 1 month ago</span></div>
            <p className='text-sm lg:text-base'>{comment}</p>
        </div>
    </div>
  )
}

export default Comment