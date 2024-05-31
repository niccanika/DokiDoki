import React, { useEffect, useState } from "react";
import "./animeAdmin.scss";
import axios from "axios";
import { useCallback } from "react";
import AnimeItem from "../../components/animeItem/AnimeItem";

function AnimeAdmin() {
  let user = JSON.parse(localStorage.getItem("user"));

  let [data, setData] = useState([]);

  const load = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/anime/", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [setData]);

  // load();
  useEffect(() => {
    load();
  }, [load]);

  const deleteAnime = async (id) => {
    await axios.delete("http://localhost:3000/api/anime/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    await load();
  };

  console.log(data);

  return (
    <div className="animeAdmin">
      <p className="pageTitle">Anime Manager</p>
      <table>
        <thead>
          <tr className="topbar">
            <th>
              <span>Title</span>
            </th>
            <th>
              <span>Description</span>
            </th>
            <th>
              <span>Genre</span>
            </th>
            <th>
              <span>Featured Image URL</span>
            </th>
            <th>
              <span>Cover Image URL</span>
            </th>
            <th>
              <span>Logo Image URL</span>
            </th>
            <th>
              <span>Is Movie</span>
            </th>
            <th>
              <span>Episodes</span>
            </th>
            <th>
              <span>Seasons</span>
            </th>
            <th>
              <span>Trailer URL</span>
            </th>
            <th>
              <span>Release year</span>
            </th>
            <th>
              <span>Update</span>
            </th>
            <th>
              <span>Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <AnimeItem
                key={index}
                animeInfo={item}
                deleteAnime={deleteAnime}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AnimeAdmin;
