import React, { useState, useEffect } from "react";
import "./featured.scss";
import { Add, PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

function Featured({ type }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/anime/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
        console.log(content);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  const detailLink = "/animeDetail/" + content._id;

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="music">Music</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="seinen">Seinen</option>
            <option value="shojo">Shojo</option>
            <option value="shonen">Shonen</option>
            <option value="slice-of-life">Slice of life</option>
            <option value="sports">Sports</option>
            <option value="supernatural">Supernatural</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="Featured anime image" />
      <div className="info-container">
        <div className="info">
          <img src={content.imgTitle} alt="Anime Logo" />
          <span className="description">
            {content.description?.substring(0, 450) + `...`}
          </span>
          <div className="buttons">
            <Link to={detailLink} className="link">
              <button className="play">
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>

            <button className="more">
              <Add />
              <span>Watchlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
