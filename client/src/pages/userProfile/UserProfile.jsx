import React, { useState, useCallback, useEffect } from "react";
import "./userProfile.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import profileImg from "../../assets/user.png";
import { Edit } from "@mui/icons-material";
import axios from "axios";

function UserProfile() {
  let user = JSON.parse(localStorage.getItem("user"));

  let [isEdit, setIsEdit] = useState(false);
  let [name, setName] = useState(user.username);
  let [email, setEmail] = useState(user.email);
  let [password, setPassword] = useState("");
  let [img, setImg] = useState(user.profilePic);

  const handlePhoto = (e) => {
    setImg(e.target.files[0]);
  };

  const updateProfile = async () => {
    let objData = {
      username: name,
      email: email,
      profilePic: img,
    };

    if (password !== "") {
      objData = {
        username: name,
        email: email,
        profilePic: img,
        password: password,
      };
    }

    // console.log(objData.profilePic);

    let formData = new FormData();
    formData.append("image", img);

    const responseData = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    console.log(responseData);

    if (responseData.data.success) {
      objData.profilePic = responseData.data.image_url;
      const retVal = await axios.put(
        "http://localhost:3000/api/users/" + user._id,
        objData,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      user.username = name;
      user.email = email;
      user.profilePic = responseData.data.image_url;
      console.log(responseData.image_url);
      localStorage.setItem("user", JSON.stringify(user));
    }

    alert("Profile updateProfile");
    console.log(objData);
  };

  return (
    <div className="userProfile">
      <Navbar />
      <div className="top">
        <h2>My Profile</h2>
        <div className="edit">
          <Edit
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          />
        </div>
      </div>
      <div className="profileInfo">
        <div className="name">
          Username:
          {isEdit ? (
            <input
              className="editInput"
              type="text"
              name="username"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          ) : (
            <span> {user.username}</span>
          )}
        </div>
        <div className="name">
          Email:{" "}
          {isEdit ? (
            <input
              className="editInput"
              type="email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          ) : (
            <span> {user.email}</span>
          )}
        </div>
        {isEdit && (
          <div className="name">
            New password:{" "}
            <input
              className="editInput"
              type="password"
              name="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        )}

        <div className="name">
          Profile Image:{" "}
          {isEdit ? (
            <input
              className="editInput"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="profilePic"
              // value={img}
              onChange={handlePhoto}
            />
          ) : (
            <img
              src={user.profilePic != "" ? user.profilePic : profileImg}
              alt=""
            />
          )}
        </div>
        <div className="btn">
          {isEdit && (
            <button
              onClick={() => {
                updateProfile();
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
