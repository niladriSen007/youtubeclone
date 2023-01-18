import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';

const Search = () => {
  const [videos, setVideos] = useState([]);

  const query = useLocation().search;
  

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);


  return (
    <div className='flex px-20'>
      {videos.map(item=>(
       <Card
       id={item._id}
       title={item.title}
       desc={item.desc}
       videoUrl={item.videoUrl}
       imgUrl={item.imgUrl}
       key={item._id}
       likes={item.likes}
       dislikes={item.dislikes}
       views={item.views}
       userId={item.userId}
       createdAt={item.createdAt}
     />
    ))}
    </div>
  )
}

export default Search