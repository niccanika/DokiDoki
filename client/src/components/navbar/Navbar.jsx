import React, { useContext, useState } from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import {
  ArrowDropDown,
  Close,
  Notifications,
  Search,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/AuthActions";
import profileImg from "../../assets/user.png";
import { Menu } from "@mui/material";

const Navbar = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  const [isScrolling, setIsScrolling] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolling(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolling ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img src={logo} alt="DokiDoki Logo" />
          </Link>
          <div className="type">
            <Link to="/series" className="link">
              <span>Series</span>
            </Link>
            <Link to="/movies" className="link">
              <span>Movies</span>
            </Link>
          </div>

          {/* <Link className="link">
            <span>New and Popular</span>
          </Link> */}
          {/* <Link className="link">
            <span>My List</span>
          </Link> */}
        </div>
        <div className="right">
          {/* {user.isAdmin && (
            <Link to="/addAnime" className="link">
              <span>Add Anime</span>
            </Link>
          )} */}

          {/* <Search className="icon" /> */}
          {/* <Notifications className="icon" /> */}

          <div className="profile">
            <img
              src={user.profilePic != "" ? user.profilePic : profileImg}
              alt=""
            />
            <ArrowDropDown className="icon" />
            <div className="options">
              {/* <span>Settings</span> */}
              <Link to="/profile" className="link">
                <span>Profile</span>
              </Link>
              {user.isAdmin && (
                <Link to="/animeAdmin" className="link">
                  <span>Admin</span>
                </Link>
              )}
              <span onClick={() => dispatch(logout())}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
