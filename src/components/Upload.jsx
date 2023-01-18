import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const upload = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video &&  upload(video,"videoUrl");
  }, [video]);

  useEffect(() => {
    img && upload(img,"imgUrl");
  }, [img]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const navigateTo = useNavigate()

  const handleUpload = async(e) =>{
    e.preventDefault();
    console.log({...inputs})
    const res = await axios.post("/videos/upload",{...inputs,tags})
    
    setOpen(false)
    res.status === 200 && navigateTo(`/watch/${res.data._id}`)

  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-[#000000a7] flex items-center justify-center z-50 py-3">
      <div
        className="flex flex-col gap-6 relative bg-[#071125] p-5 px-10"
        style={{ width: "600px", height: "600px" }}
      >
        <div className="absolute top-10 right-10 cursor-pointer text-xl font-bold" onClick={()=>setOpen(false)}>
          X
        </div>
        <h1 className="text-center text-3xl font-bold">Upload A Video😉</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="vid">Video</label>
          {videoPerc > 0 ? (
            "Uploading:" + videoPerc +"%"
          ) : (
            <input
              className="bg-[#0C2144]"
              id="vid"
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
        </div>
        <input
          className="bg-[#0C2144]  text-white p-2 focus:outline-none placeholder:text-white"
          onChange={(e) => handleChange(e)}
          type="text"
          name="title"
          placeholder="Enter Video Title"
        />
        <textarea
          className="bg-[#0C2144]  text-white p-2 focus:outline-none placeholder:text-white"
          onChange={(e) => handleChange(e)}
          name="desc"
          cols="10"
          rows="6"
          placeholder="Enter Video Description"
        />
        <input
          className="bg-[#0C2144]  text-white p-2 focus:outline-none placeholder:text-white"
          onChange={(e) => handleTags(e)}
          type="text"
          placeholder="Separate the tags with commas."
        />
        <div className=" flex flex-col gap-1">
          <label htmlFor="img">Image</label>
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc +"%"
          ) : (
            <input
              className="bg-[#0C2144]"
              id="img"
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </div>
        <button onClick={(e)=>handleUpload(e)} className="bg-blue-600 p-3 rounded-md">Upload 🎉</button>
      </div>
    </div>
  );
};

export default Upload;
