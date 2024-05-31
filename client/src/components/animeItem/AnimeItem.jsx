import React, { useCallback, useEffect, useState } from "react";
import "./animeItem.scss";
import axios from "axios";

function AnimeItem({ index, animeInfo, deleteAnime }) {
  let user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState(animeInfo.title);
  const [desc, setDesc] = useState(animeInfo.description);
  const [genre, setGenre] = useState(animeInfo.genre);
  const [img, setImg] = useState(animeInfo.img);
  const [imgSm, setImgSm] = useState(animeInfo.imgSm);
  const [imgTitle, setImgTitle] = useState(animeInfo.imgTitle);
  const [isMovie, setIsMovie] = useState(animeInfo.isMovie);
  const [numOfEp, setNumOfEp] = useState(animeInfo.numOfEpisodes);
  const [numOfSeasons, setNumOfSeasons] = useState(animeInfo.numOfSeasons);
  const [trailer, setTrailer] = useState(animeInfo.trailer);
  const [year, setYear] = useState(animeInfo.year);

  const [genres, setGenres] = useState([]);

  const loadGenre = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/genres/", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setGenres(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [setGenres]);

  // load();
  useEffect(() => {
    loadGenre();
  }, [loadGenre]);

  const updateAnime = async () => {
    const objData = {
      title: title,
      description: desc,
      genre: genre,
      img: img,
      imgSm: imgSm,
      imgTitle: imgTitle,
      isMovie: isMovie,
      numOfEpisodes: numOfEp,
      numOfSeasons: numOfSeasons,
      trailer: trailer,
      year: year,
    };

    const retVal = await axios.put(
      "http://localhost:3000/api/anime/" + animeInfo._id,
      objData,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    alert("Anime updated");
  };

  const deleteAnim = async () => {
    deleteAnime(animeInfo._id);
    alert("anime deleted");
  };

  return (
    // <div className="animeItem">
    <tr key={index} className="animeItem">
      <td data-label="Title">
        <span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Description">
        <span>
          <input
            type="text"
            name="description"
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Genre">
        <span>
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(event) => {
              setGenre(event.target.value);
            }}
          >
            {genres?.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.genre}
                </option>
              );
            })}
          </select>
        </span>
      </td>
      <td data-label="Featured Image URL">
        <span>
          <input
            type="url"
            name="img"
            value={img}
            onChange={(event) => {
              setImg(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Cover Image URL">
        <span>
          <input
            type="url"
            name="imgSm"
            value={imgSm}
            onChange={(event) => {
              setImgSm(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Logo Image URL">
        <span>
          <input
            type="url"
            name="imgTitle"
            value={imgTitle}
            onChange={(event) => {
              setImgTitle(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="is Movie">
        <span>
          <input
            type="checkbox"
            name="isMovie"
            value="isMovie"
            checked={isMovie}
            onChange={(event) => {
              setIsMovie(!isMovie);
            }}
          />
        </span>
      </td>
      <td data-label="No. of Episodes">
        <span>
          <input
            type="number"
            name="numOfEpisodes"
            value={numOfEp}
            onChange={(event) => {
              setNumOfEp(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="No. of Seasons">
        <span>
          <input
            type="number"
            name="numOfSeasons"
            value={numOfSeasons}
            onChange={(event) => {
              setNumOfSeasons(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Trailer">
        <span>
          <input
            type="url"
            name="trailer"
            value={trailer}
            onChange={(event) => {
              setTrailer(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Year">
        <span>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
            }}
          />
        </span>
      </td>
      <td data-label="Update">
        <button
          onClick={() => {
            updateAnime();
          }}
        >
          Update
        </button>
      </td>
      <td data-label="Delete">
        <button
          onClick={() => {
            deleteAnim();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
    // </div>
  );
}

export default AnimeItem;
