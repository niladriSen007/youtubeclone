import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../store/leftBarSlice";
import { logout } from "../store/userSlice";
import Upload from "./Upload";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const loggedInUserInfo = useSelector((state) => state.user);

  const menu = useSelector((state) => state.menuBar);
  // console.log(menu.isShown);

  const showMenu = () => {
    dispatch(show());
    // console.log('====================================');
    // console.log(menu.isShown);
    // console.log('====================================');
  };

  const [signIn, isSignIn] = useState(false);

  const [open, setOpen] = useState(false);

  const [q, setQ] = useState("");

  const handleSignOut = (e) => {
    dispatch(logout());
  };

  // console.log(loggedInUserInfo?.currentUser?.img)

  return (
    <>
      <div className="flex justify-between items-center  px-6 lg:px-10 h-16 bg-[#071125] opacity-95 sticky top-0 z-50">
        <div className="flex gap-5 items-center text-2xl">
          <div>
            <GiHamburgerMenu
              color="white"
              onClick={() => showMenu()}
              className="cursor-pointer"
            />
          </div>
          <Link to="/">
            <div className="flex gap-2 items-center justify-center">
              <BsYoutube className="text-3xl text-red-600" />{" "}
              <span className="text-2xl font-bold text-white">YouTube</span>
            </div>
          </Link>
          {loggedInUserInfo.currentUser ? (
            <Link to="/login">
              <button
                onClick={(e) => handleSignOut(e)}
                className="p-1 bg-transparent border-2 border-white rounded-sm text-lg "
              >
                Sign Out
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="p-1 bg-transparent border-2 border-white rounded-sm text-lg ">
                Sign In
              </button>
            </Link>
          )}
        </div>
        <div className="hidden  lg:flex lg:items-center lg:justify-center lg:gap-5  ">
          <form>
            <div className="flex bg-[#0C2144] items-center h-10 px-4 pr-0 rounded-lg">
              <div className="flex gap-4 items-center pr-5">
                <div>
                  {/* <AiOutlineSearch className="text-xl text-white" /> */}
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => setQ(e.target.value)}
                  className="w-96 bg-[#071125] focus:outline-none border-none"
                />
                <AiOutlineClose className="text-xl cursor-pointer   text-white " />
              </div>
              <button className="h-10 w-16 flex items-center justify-center bg-[#0C2144] rounded-lg">
                <Link to={`/search?q=${q}`}>
                  <AiOutlineSearch className="text-xl text-white" />
                </Link>
              </button>
            </div>
          </form>
          <div className="text-xl p-3 bg-[#0C2144] rounded-full">
            <TiMicrophone color="white" />
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-5 lg:items-center lg:text-xl ">
          {loggedInUserInfo.currentUser ? (
            <BsCameraVideo color="white" onClick={() => setOpen(true)} />
          ) : (
            <Link to="/login">
              <button className="p-1 bg-transparent border-2 border-white rounded-sm text-lg ">
                Sign In
              </button>
            </Link>
          )}
          <IoAppsSharp color="white" />
          <div className="relative">
            <BsBell color="white" />
            <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
              9+
            </span>
          </div>
          {loggedInUserInfo.currentUser ? (
            <img
              src={`${loggedInUserInfo.currentUser?.img}`}
              className="w-9 h-9 rounded-full"
              alt="logo"
            />
          ) : (
            <BiUserCircle size={26} />
          )}
        </div>
      </div>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
