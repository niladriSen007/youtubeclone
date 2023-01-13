import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import Comment from "./Comment";

const commentsArray = [
  {
    id: 1,
    img: "https://ik.imagekit.io/ksaehdhru/login_form/143527250_268572467960571_555300739818054970_n_ubPrXNzkZ.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1669181642620",
    comment:
      "Today watch amit trivedi concert at rgu guwahati,he is such a fine artist,i think today was my great day,hope for more great song like this!",
    name: "Yogesh Ghimire",
  },
  {
    id: 2,
    img: "https://ik.imagekit.io/ksaehdhru/login_form/84660549_1279929605727977_997387265506279424_n_v2GkcH_Bi.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1668683193655",
    comment: "Amit Trivedi is so underrated both as a singer and composer ",
    name: "Sadan Sakaline",
  },
  {
    id: 3,
    img: "https://ik.imagekit.io/ksaehdhru/login_form/130601274_2751319525091259_4764626585151937168_n_o3Q7st7pH.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1669122906065",
    comment:
      "I was suicidal and just couldn't focus on anything in my life and then I heard Girlfriend 1.0 and it really helped me through, I stopped drugs and focused myself into my studies........ you truly were one of the factors as to why I'm alive and happy now man ......THANK YOU",
    name: "Sumit Shrey",
  },
  {
    id: 4,
    img: "https://ik.imagekit.io/ksaehdhru/login_form/187808682_319108719581857_7985260120139155171_n_8bBzgKPTu.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1669124591152",
    comment:
      "Let's take a moment to appreciate the background music by bluish music ! 👍",
    name: "Yogesh Ghimire",
  },
  {
    id: 5,
    img: "https://ik.imagekit.io/ksaehdhru/1669441309_5618752_ZduVVXBQq.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1669582776305",
    comment:
      "Bhaiya I'm listening you from past 4 yrs .. you never disappoint me . I was going through playlist and i found i literally heard your each and every one track in repeat.",
    name: "Shivam Sing",
  },
  {
    id: 6,
    img: "https://ik.imagekit.io/ksaehdhru/1664020637_4039525_UVquOSiuPP.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1669318469809",
    comment:
      "Lets take a moment even to appreciate the video editor it fits sooo good 😊",
    name: "Farha Anjum",
  },
];

const Comments = () => {
  return (
    <div>
      
     {
        commentsArray.map(vid=>(
            <Comment key={vid.id} img={vid.img} comment={vid.comment} name={vid.name}/>
        ))
     }
    </div>
  );
};

export default Comments;
