import React from "react";
import { useState } from "react";
import {FcGoogle} from 'react-icons/fc'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginStatus = useSelector(state=>state.user)
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", { email, password });
      console.log(res.data);
      if (res.data) {
        dispatch(loginSuccess(res.data));
        navigateTo("/");
      }
    } catch (e) {
      dispatch(loginFailure());
      console.log(e);
    }
  };

  const signinWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res.data);
            dispatch(loginSuccess(res?.data));
            navigateTo("/");
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure());
      });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-8 lg:px-0">
      <div className="flex flex-col w-96 text-center bg-[#071125] p-5 gap-3  ">
        <h2 className="font-bold text-lg lg:text-4xl">Sign In</h2>
        <p className="font-bold text-sm lg:text-xl text-gray-500">
          to continue to YouTube
        </p>
        <form className="flex flex-col gap-3 py-2">
          <input
            type="text"
            className="bg-[#0C2144] rounded-sm focus:outline-none p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          <input
            type="text"
            className="bg-[#0C2144] rounded-sm focus:outline-none p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password "
          />
          <button
            className="bg-blue-600 p-3 rounded-md"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In{" "}
          </button>
        </form>
        <span className="text-lg lg:text-3xl">or</span>
        <button
          className="bg-[#1c2945] p-3 rounded-md flex  items-center justify-center gap-3"
          onClick={(e) => signinWithGoogle(e)}
        >
          Sign In With <FcGoogle className="font-bold"  />
        </button>
        <span className="text-lg lg:text-3xl">or</span>
        <form className="flex flex-col gap-3 py-2">
          <input
            type="text"
            className="bg-[#0C2144] rounded-sm focus:outline-none p-2"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your UserName"
          />
          <input
            type="text"
            className="bg-[#0C2144] rounded-sm focus:outline-none p-2"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          <input
            type="text"
            className="bg-[#0C2144] rounded-sm focus:outline-none p-2"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <button className="bg-blue-600 p-3 rounded-md">Sign Up</button>
        </form>
      </div>
      <div className="flex gap-10">
        <p>English(India) </p>
        <p>Help</p>
        <p>Privacy</p>
        <p>Terms</p>
      </div>
    </div>
  );
};

export default Login;
