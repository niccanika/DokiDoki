import React, { useState } from "react";
import "./addAnime.scss";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";

function AddAnime() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(formData, data);

    const anime = {
      title: data.title,
      description: data.description,
      img: data.img,
      imgTitle: data.imgTitle,
      imgSm: data.imgSm,
      trailer: data.trailer,
      year: data.year,
    };

    console.log(anime);

    try {
      await axios.post("http://localhost:3000/api/anime/", anime, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      alert("Anime added.");
    } catch (error) {
      alert("Error adding anime. " + error.message);
    }
  };

  return (
    <>
      <div className="addAnime">
        <p className="pageTitle">Add Anime</p>
        <form onSubmit={handleFormSubmit} className="form">
          {error && (
            <p className="error">Title should be at least 5 characters long</p>
          )}
          {/* title */}
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="animeTextInput"
            required
            onBlur={(event) => {
              setError("");
              if (event.target.value.length < 5) {
                console.log("Title should be at least 5 characters long");
                setError("Title should be at least 5 characters long");
              }
            }}
          />
          {/* description */}
          <label htmlFor="description" className="label">
            Description:
          </label>
          <textarea
            name="description"
            rows="4"
            className="description"
          ></textarea>
          {/* images */}
          <label htmlFor="img" className="label">
            Featured Image URL:
          </label>
          <input type="url" name="img" className="animeTextInput" />

          <label htmlFor="imgTitle" className="label">
            Logo Image URL:
          </label>
          <input type="url" name="imgTitle" className="animeTextInput" />

          <label htmlFor="imgSm" className="label">
            Cover Image URL:
          </label>
          <input type="url" name="imgSm" className="animeTextInput" />

          {/* trailer */}
          <label htmlFor="trailer" className="label">
            Trailer URL:
          </label>
          <input type="url" name="trailer" className="animeTextInput" />

          {/* year */}
          <label htmlFor="year" className="label">
            Released in:
          </label>
          <input type="text" name="year" className="animeTextInput" />

          <div className="btn">
            <button type="submit" className="">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAnime;
