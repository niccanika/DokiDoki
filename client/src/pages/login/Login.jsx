import React, { useContext, useState } from "react";
import "./login.scss";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../context/apiCalls";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="DokiDoki logo" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Log In</h1>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Log In
          </button>
          <span>
            No account?{" "}
            <Link to="/register" className="link">
              <b>CREATE ONE</b>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
