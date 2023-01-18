import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {format} from "timeago.js";

const RecommendedCard = ({tags}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

//   useEffect(()=>{
//     const fetchCreator = async() =>{
//       const res = await axios.get(`/users/${vuserId}`);
//       setChannel(res.data)
//   }
//   fetchComment()
// },[userId])


  return (
 <>
 {
  videos.map(video=>(
    <Link to={`/watch/${video._id}`}>
    <div className='flex gap-3 px-3 py-3 lg:py-2 cursor-pointer'>
    <img className='min-w-52 min-h-24 max-h-28 rounded-sm lg:w-48' src={video.imgUrl} alt={video.title} />
    <div className='flex flex-col gap-0 lg:gap-1'>
        <h2 className='font-bold text-sm lg:text-base'>{video.title}</h2>
        {/* <span className='font-extrabold text-sm lg:text-base'>{creator}</span> */}
        <p className='text-gray-500 text-xs lg:text-sm '>
          {video.views} views · {format(video.createdAt)}
        </p>
    </div>
</div>
</Link>
  ))
}</>
  )
}

export default RecommendedCard