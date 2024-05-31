import React, { useEffect, useState } from "react";
import "./listItem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

function ListItem({ index, item }) {
  const [anime, setAnime] = useState({});

  useEffect(() => {
    const getAnime = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/anime/find/" + item,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setAnime(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAnime();
  }, [item]);

  const linkToDetails = "/animeDetail/" + anime._id;

  return (
    <div className="listItem">
      <img src={anime.imgSm} alt="Anime image" />
      <p className="title">{anime.title}</p>
      <div className="itemInfo">
        <div className="itemInfoTop">
          <p className="titleHover">{anime.title}</p>
          <span>Episodes: {anime.numOfEpisodes}</span>
          <span className="limit">Seasons: {anime.numOfSeasons}</span>
          <span>{anime.year}</span>
          <div className="genre">{anime.genre?.genre}</div>
        </div>
        <div className="description">
          {anime.description?.substring(0, 200) + `...`}
        </div>
        <div className="icons">
          <Link to={linkToDetails} state={anime} className="link">
            <PlayArrow />
          </Link>
          <Add />
          <ThumbUpAltOutlined />
          <ThumbDownAltOutlined />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
