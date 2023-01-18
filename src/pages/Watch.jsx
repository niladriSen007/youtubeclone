import React, { useEffect, useState } from "react";
// import {AiTwotoneBell} from "react-icons/ai"
import {
  AiFillLike,
  AiOutlineBell,
  AiOutlineDislike,
  AiOutlineDownload,
  AiOutlineLike,
  AiFillDislike,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import RecommendedCard from "../components/RecommendedCard";
import LeftBar from "../components/LeftBar";
import { useDispatch, useSelector } from "react-redux";
import { TbBellRinging } from "react-icons/tb";
import Comments from "../components/Comments";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { subscription } from "../store/userSlice";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from "../store/videoSlice";

const Watch = () => {
  // console.log(menu.isShown);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  // const { id } = useParams();
  const videoId = useLocation().pathname.split("/")[2];
  // console.log(typeof(videoId))

  // const [video, setVideo] = useState({});
  const [creator, setCreator] = useState({});
  // const [isSubscribed, setIsSubscribed] = useState(true);

  // useEffect(() => {
  //   setVideoId(id);
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/video/${videoId}`);
        console.log(videoRes.data);
        const creatorRes = await axios.get(`/users/${videoRes.data.userId}`);

        setCreator(creatorRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [videoId, dispatch]);

  const menu = useSelector((state) => state.menuBar);
  const video = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setShow(menu.isShown);
  }, [menu.isShown]);

  // console.log(video?.currentVideo)

  const handleLike = async () => {
    await axios.put(`/users/like/${video.currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDisike = async () => {
    await axios.put(`/users/dislike/${video.currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  console.log(video.currentVideo?.likes);
  // console.log(creator._id)

  const subscript = async () => {
    if (currentUser.subscribedUsers.includes(creator?._id))
      await axios.put(`/users/unsubscribe/${creator?._id}`);
    else await axios.put(`/users/subscribe/${creator?._id}`);

    dispatch(subscription(creator?._id));
  };

  return (
    <div className="flex flex-col lg:flex-row px-2 lg:px-6 relative ">
      <div className="absolute w-full left-0 top-0 ">{show && <LeftBar />}</div>
      <div
        className="px-4 lg:px-12 flex flex-col gap-4 pt-3 min-h-screen"
        style={{ flex: 4 }}
      >
        <video
          src={video.currentVideo.videoUrl} controls
          className="max-w-80  max-h-64 lg:w-full lg:h-full flex-1 "
          style={{ minHeight: "480px" }}
        ></video>
        {/* <iframe
          // src={`https://www.youtube.com/embed/${videoId}`}
          src="https://www.youtube.com/embed/Pu9I33nDeBk"
          // width={"96%"}
          // height="500"
          title={video.currentVideo?.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameborder="0"
          className="w-80  h-48 lg:w-full lg:h-full flex-1 "
          style={{ minHeight: "480px" }}
        ></iframe> */}
        <div className="flex flex-col gap-4  " style={{ flex: 0.8 }}>
          <h1 className="font-bold text-lg lg:text-2xl">
            {video?.currentVideo.title}
          </h1>
          <div className="flex gap-1 items-center  justify-between py-3  ">
            <div className="flex gap-2">
              <img
                src={creator?.img}
                alt="dino"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold lg:text-lg">
                  {creator?.name}
                </span>
                <p className="text-xs text-gray-304 lg:text-sm">
                  {creator?.subscribers} subscribers
                </p>
              </div>
              {currentUser.subscribedUsers?.includes(creator?._id) ? (
                <div
                  className="flex gap-1 lg:gap-2  items-center bg-gray-800 rounded-full px-2 cursor-pointer "
                  onClick={() => subscript()}
                >
                  <TbBellRinging />
                  <span className="text-sm lg:text-lg">Subscribed</span>
                </div>
              ) : (
                <div
                  className="flex gap-1 lg:gap-2  items-center bg-[#ff0000] rounded-full px-2 cursor-pointer "
                  onClick={() => subscript()}
                >
                  <AiOutlineBell />
                  <span className="text-sm lg:text-lg">Subscribe</span>
                </div>
              )}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex gap-2 items-center bg-gray-800 rounded-full px-3 py-2">
                {video.currentVideo?.likes.includes(currentUser._id) ? (
                  <AiFillLike
                    className="cursor-pointer"
                    onClick={() => handleLike()}
                  />
                ) : (
                  <AiOutlineLike
                    className="cursor-pointer"
                    onClick={() => handleLike()}
                  />
                )}
                {video.currentVideo?.likes?.length} |
                {video.currentVideo?.dislikes.includes(currentUser._id) ? (
                  <AiFillDislike
                    className="cursor-pointer"
                    onClick={() => handleDisike()}
                  />
                ) : (
                  <AiOutlineDislike
                    className="cursor-pointer"
                    onClick={() => handleDisike()}
                  />
                )}
              </div>
              <div className="flex gap-1 items-center bg-gray-800 rounded-full px-3 py-2 ">
                <IoMdShareAlt /> Share
              </div>
              <div className="flex gap-1 items-center bg-gray-800 rounded-full px-3 py-2 ">
                <AiOutlineDownload />
                Download
              </div>
              <div className="bg-gray-800 rounded-full px-3 py-2 ">
                <BsThreeDots />
              </div>
            </div>
          </div>
          <p className="text-sm lg:text-base px-0 lg:px-2 py-3">
            {video.currentVideo?.desc}
          </p>
          {/* <p>
           
            minus quas beatae voluptatum alias neque nisi debitis eum delectus
            maiores reprehenderit voluptatibus aspernatur tempora doloribus
            expedita cupiditate accusamus vitae ratione deserunt rerum. <br /> 
            <br />
            Stream Now on Spotify : 
            <span className="text-blue-400">https://spotify/jkjked74</span> 
            <br /> <br />
            inventore minima blanditiis adipisci. Magnam, eos. Distinctio
            praesentium, eveniet molestias dolor expedita iste voluptatibus
            labore et porro inventore similique, earum magnam eius itaque
            pariatur, deserunt sapiente vel! Lorem ipsum dolor sit amet
            <br /> <br />
            Def Jam India:
            <p>
              👉 Instagram: 
              <span className="text-blue-400">
                https://www.instagram.com/defjamindia/
              </span> 
            </p>
            <p>
              👉 Facebook: 
              <span className="text-blue-400">
                https://www.facebook.com/defjamindia
              </span> 
            </p>
            <p>
              👉 Twitter: 
              <span className="text-blue-400">
                https://twitter.com/DefJamIndia
              </span>
            </p>
            <br /> <br />
            consectetur adipisicing elit. Molestiae numquam fugiat cumque
            voluptatem nesciunt omnis ad ab ipsum dolores quas consequuntur,
            obcaecati expedita deserunt voluptas! Eligendi animi, reiciendis
            <br /> <br />
            <p>
              Dino James <br />
              👉 Instagram: 
              <span className="text-blue-400">
                https://www.instagram.com/defjamindia/
              </span> 
            </p>
            <p>
              👉 Facebook: 
              <span className="text-blue-400">
                https://www.facebook.com/defjamindia
              </span> 
            </p>
            <br /> <br />
          </p> */}
        </div>
        <Comments vidId={video.currentVideo._id}/>
      </div>
      <div className="recommended" style={{ flex: 2 }}>
        <h1 className="text-white font-bold px-3 py-2">Recommended</h1>
        <RecommendedCard
         tags={video.currentVideo.tags}
        />
      </div>
    </div>
  );
};

export default Watch;
