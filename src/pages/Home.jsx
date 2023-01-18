import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import LeftBar from "../components/LeftBar";
import axios from "axios";

const ytArray = [
  {
    id: "EbyAoYaUcVo",
    title: "WOH (Official Video) - Ikka x Dino James x Badshah | Def Jam India",
    creator: "Dino James",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/WOH_Lyrics_-_Ikka__Dino_James__Badshah_egF1ZyQ-bR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164707",
    creatorImg:
      "https://yt3.ggpht.com/ytc/AMLnZu-HIJ6Vm_i9QLz15XcBHaaKVzW187ilq8LP8J_oYGM=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "WcIcVapfqXw",
    title: "Rema, Selena Gomez - Calm Down (Official Music Video)",
    creator: "Selena Gomez",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/images_gDzP_QLlB.jfif?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164428",
    creatorImg:
      "https://yt3.ggpht.com/lwPYJMKoTNR2hs_hrXRFcTy0aQteNHEJnGwyfp0cwvjhJVZW6HWa6CTm_Bf99Y71U2V_FZMZenQ=s88-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "5Eqb_-j3FDA",
    title: "Coke Studio | Season 14 | Pasoori | Ali Sethi x Shae Gill",
    creator: "Coke Studio",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/5Eqb_-j3FDA_Sy-vWehfgN.jfif?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164719",
    creatorImg:
      "https://yt3.ggpht.com/ytc/AMLnZu-dnaiUJqFppWsNdhlLzUPt9auAwnGTUSqWdTpA6A=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "vqu4z34wENw",
    title:
      "Pathaan | Official Trailer | Shah Rukh Khan | Deepika Padukone | John Abraham | Siddharth Anand",
    creator: "YRF",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/Pathaan-6_ME6WjcJU5u.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164692",
    creatorImg:
      "https://yt3.ggpht.com/b42QCAmVJ0kzNNi10_HmhsdfPEATQATS80hbLyHVJcVm6drn5pKtC6MY6wTluXi5iZ8_is5Q_Q=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "zdXiSlRrgWQ",
    title:
      "Naina Da Kya Kasoor - Full Video | AndhaDhun | Ayushmann Khurrana | Radhika Apte | Amit Trivedi",
    creator: "Zee Music Company",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/ab67616d0000b273c411e5c8eec8b0e1c5f21b27_A-hzd5VXWu.jfif?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164692",
    creatorImg:
      "https://yt3.ggpht.com/EEGERwlaKJd27zSEPQF3d__-tPyppIgFfKvNfBkWa7ssMKBWqQUbuCTLe-kAnTB1r6kJQVxyxwY=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "VDrO044VHpY",
    title: "Dooriyan - Dino James ft. Kaprila [Official Music Video]",
    creator: "Dino James",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/Dooriyan-Hindi-2020-20200113105850-500x500_zv3E8jwxU_.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164512",
    creatorImg:
      "https://yt3.ggpht.com/vJEsALWnQIwPZ2oaVbFWPu1n4L0CDkHpAdGJ-KBPFsxM9hsMsvExFK1mnCGUrMzfC67XPVThmQ=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "hoNb6HuNmU0",
    title:
      "Full Song: KHAIRIYAT (BONUS TRACK) | CHHICHHORE | Sushant, Shraddha | Pritam, Amitabh B|Arijit Singh",
    creator: "T-Series",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/MV5BN2Y0YjJkMTctNjNmMC00MDkyLTkzZDktMWZmNTdmN2YyNWNmXkEyXkFqcGdeQXVyMTA5NzIyMDY5._V1__YrxhMIp1p.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164497",
    creatorImg:
      "https://yt3.ggpht.com/v_PwNTRdcmpaEU6zh9wytm0ERtq2BOAmBQvr1QyZstphlpcPUqjbX3wqIvSRR9bWIgSjmRUJcwE=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "bNtOvlT9ZCQ",
    title:
      "No Competition : Jass Manak Ft DIVINE (Full Video) Satti Dhillon | GK DIGITAL | Geet MP3",
    creator: "Geet MP3",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/maxresdefault_nlmjLnLKlU.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164598",
    creatorImg:
      "https://yt3.ggpht.com/ytc/AMLnZu-cAZCOPC4Ki-gs9Ywk5uxxUVFnsM34IG0E7PJ8dg=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "8367ETnagHo",
    title: "Coke Studio Season 9| Tera Woh Pyar| Momina Mustehsan & Asim Azhar",
    creator: "Coke Studio",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/maxresdefault__1__Sm1mmITrm.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611164582",
    creatorImg:
      "https://yt3.ggpht.com/ytc/AMLnZu-dnaiUJqFppWsNdhlLzUPt9auAwnGTUSqWdTpA6A=s68-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "AHSa7GNBzCs",
    title: "Guess The Movie By The DANCE Challenge !",
    creator: "S8UL",
    thumbnail:
      "https://ik.imagekit.io/ksaehdhru/login_form/maxresdefault__2__aPiX9vlEU.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1673611150953",
    creatorImg:
      "https://yt3.ggpht.com/BFpcIRuDv2h57IFpqFyycMaYCZYxqASmEStrXH6ULreoLXfMHU1VGD2OiA_ERgKe6t3ccjn5LKM=s68-c-k-c0x00ffffff-no-rj",
  },
];

const Home = ({ type }) => {
  const [randomVideos, setRandomVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setRandomVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  console.log(randomVideos);

  return (
    <>
      <div className="flex gap-1">
        <LeftBar />
        <div className="grid grid-cols-1 lg:grid-cols-4 py-3 px-4">
          {randomVideos.map((item) => (
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
      </div>
    </>
  );
};

export default Home;
