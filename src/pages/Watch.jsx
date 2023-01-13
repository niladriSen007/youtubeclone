import React, { useEffect, useState } from "react";
// import {AiTwotoneBell} from "react-icons/ai"
import {
  AiFillLike,
  AiTwotoneBell,
  AiOutlineDislike,
  AiOutlineDownload,
} from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import RecommendedCard from "../components/RecommendedCard";
import LeftBar from "../components/LeftBar";
import { useSelector } from "react-redux";
import { TbBellRinging } from "react-icons/tb";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";

const Watch = () => {
  const menu = useSelector((state) => state.menuBar);
  // console.log(menu.isShown);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(menu.isShown);
  }, [menu.isShown]);

  const style = {
    "@media (min-width: 768px)": {
      height: "500px",
    },
  };

  const { id } = useParams();

  const [videoId, setVideoId] = useState(0);

  useEffect(() => {
    setVideoId(id);
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row px-2 lg:px-6 relative ">
      <div className="absolute w-full">{show && <LeftBar />}</div>
      <div
        className="px-4 lg:px-12 flex flex-col gap-4 pt-3 min-h-screen"
        style={{ flex: 4 }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          // width={"96%"}
          // height="500"
          title="WOH (Official Video) - Ikka x Dino James x Badshah | Def Jam India"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameborder="0"
          className="w-80  h-48 lg:w-full lg:h-full flex-1 "
          style={{ minHeight: "480px" }}
        ></iframe>
        <div className="flex flex-col gap-4  " style={{ flex: 0.8 }}>
          <h1 className="font-bold text-lg lg:text-2xl">
            WOH (Official Video) - Ikka x Dino James x Badshah | Def Jam India
          </h1>
          <div className="flex gap-1 items-center  justify-between py-3  ">
            <div className="flex gap-2">
              <img
                src="https://yt3.ggpht.com/ytc/AMLnZu-HIJ6Vm_i9QLz15XcBHaaKVzW187ilq8LP8J_oYGM=s88-c-k-c0x00ffffff-no-rj-mo"
                alt="dino"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold lg:text-lg">Dino James</span>
                <p className="text-xs text-gray-304 lg:text-sm">
                  5.7M subscribers
                </p>
              </div>
              <div className="flex gap-1 lg:gap-2  items-center bg-gray-800 rounded-full px-2 ">
                <TbBellRinging />
                <span className="text-sm lg:text-lg">Subscribed</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex gap-2 items-center bg-gray-800 rounded-full px-3 py-2">
                <AiFillLike /> 660k | <AiOutlineDislike />
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
            India’s Hip-Hop superstars Ikka, Dino James & Badshah come together
            to channel their inner hopeless romanticism on ‘Woh.’ The track
            captures the immense hurt, emotions and male vulnerability which
            comes at the backdrop of a heartbreak. ‘Woh’ is one of the very few
            records which portray a man’s emotions with evocative honesty and
            reveals the softer side of him.
            <br /> <br />
            Stream Now on Spotify :
            <span className="text-blue-400">https://spotify/jkjked74</span>
            <br />
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
            <br />
            <p>
              Dino James 👇🏻
              <br />
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
            <br />
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
        <Comments />
      </div>
      <div className="recommended" style={{ flex: 2 }}>
        <h1 className="text-white font-bold px-3 py-2">Recommended</h1>
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/mmQ7PmDo2fQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDmgFFcKJDlKcUbmeB-4rDeQnxRJw"
          }
          title="Dino James - Pyaar Pyaar (Official Video) | Prod. By Sony Music"
          creator="Dino James"
        />
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/A66TYFdz8YA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBYifBQjrvabUn02ze6z2KP4uvJsg"
          }
          title="King - Tu Aake Dekhle | The Carnival | The Last Ride | Prod.."
          creator="King"
        />
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/e8eSfqaaGXQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD68SSdHul1gfovQMGfnoa_BJeuNA"
          }
          title="Karone Okarone | Minar Rahman | Official Music Video ...."
          creator="Minar Rahman"
        />
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/UskYa1xvpQs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDsy6NXwt7b5f_60hh6_uUV2r_7Bw"
          }
          title="Kesariya | Arijit Singh | Brahmāstra | Ranbir Kapoor | Alia Bhatt | Pritam |."
          creator="Arijit Singh"
        />
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/5GAQYlouVbs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAuKNsr1jq2N27CFsbpb7fvdMOg3g"
          }
          title="Guitar Sikhda (Official Video) | Jassi Gill | Jaani | B Praak | ..."
          creator="Jassi Gill"
        />
        <RecommendedCard
          imgUrl={
            "https://i.ytimg.com/vi/cYOB941gyXI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCEJset0RsG38WC8tjuxbGwhbePqg"
          }
          title="Hawayein Lyric Video - Jab Harry Met Sejal|Shah Rukh ... "
          creator="Sony Music"
        />
      </div>
    </div>
  );
};

export default Watch;
