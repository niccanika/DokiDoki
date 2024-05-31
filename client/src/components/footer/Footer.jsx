import React from "react";
import "./footer.scss";
import image from "../../assets/chi.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <img src={image} alt="Chi's sweet home " />
      <div className="footerItems">
        <div className="navigation">
          <p className="title">Navigation</p>
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="social">
          <p className="title">Connect With Us</p>
          <span>Youtube</span>
          <span>Facebook</span>
          <span>Twitter</span>
          <span>Instagram</span>
          <span>TikTok</span>
        </div>
        <div className="Acount">
          <p className="title">Acount</p>
          <Link to="/register" className="link">
            <span>Create Account</span>
          </Link>
          <Link to="/login" className="link">
            <span>Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
