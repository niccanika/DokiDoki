import React from "react";
import "./register.scss";
import logo from "../../assets/logo.png";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);
    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          email,
          username,
          password,
        },
        {
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="DokiDoki logo" />
          <button
            className="loginButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited Anime, both series and movies</h1>
        <h2>Watch anywhere. 7-day free trial. </h2>
        <p>Ready to watch? Enter your email to create an account.</p>
        {!email ? (
          <div className="input">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email address"
              ref={emailRef}
            />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              name="username"
              id="username"
              placeholder="username"
              onChange={() => {
                setUsername(usernameRef.current.value);
              }}
              ref={usernameRef}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={() => {
                setPassword(passwordRef.current.value);
              }}
              ref={passwordRef}
            />
            <button className="registerButton" onClick={handleFinish}>
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
