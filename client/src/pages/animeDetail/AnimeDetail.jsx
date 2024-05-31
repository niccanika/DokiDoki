import React, { useState, useEffect, useCallback } from "react";
import "./animeDetail.scss";
import {
  Add,
  ArrowBackOutlined,
  Delete,
  Edit,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import profileImg from "../../assets/user.png";
import axios from "axios";
import EditableRow from "../../components/editableRow/EditableRow";

function AnimeDetail() {
  let user = JSON.parse(localStorage.getItem("user"));

  let { animeID } = useParams();

  let [showMore, setShowMore] = useState();
  let [anime, setAnime] = useState({});

  const [comment, setComment] = useState({
    text: "",
    rating: 1,
    user_id: user._id,
    anime_id: animeID,
  });
  let [textValue, setTextValue] = useState("");
  let [ratingValue, setRatingValue] = useState(1);

  let [isEdit, setIsEdit] = useState(false);
  let [buttonID, setButtonID] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const load = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/anime/find/" + animeID,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setAnime(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [animeID]);

  // load();
  useEffect(() => {
    load();
  }, [load]);

  const changeHandler = (e) => {
    setError(null);
    if (e.target.name === "rating") {
      setRatingValue(e.target.value);
      e.target.value.length > 1
        ? setError("Please enter a number between 1 and 5.")
        : setError(null);
      const parsedNumber = parseInt(e.target.value);
      if (
        isNaN(parsedNumber) ||
        parsedNumber < 1 ||
        parsedNumber > 5 ||
        !Number.isInteger(parsedNumber)
      ) {
        setError("Please enter a number between 1 and 5.");
      } else {
        setComment({ ...comment, [e.target.name]: e.target.value });
      }
    } else {
      setTextValue(e.target.value);
      if (e.target.value.length < 1) {
        setError("The comment should be at least 1 character long.");
      } else {
        setComment({ ...comment, [e.target.name]: e.target.value });
      }
    }
  };

  const addComment = async () => {
    console.log(comment);
    if (comment.text.length < 1) {
      setError("The comment should be at least 1 character long.");
    } else {
      await axios.post(
        "http://localhost:3000/api/comments/" + animeID,
        comment,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      load();
      setComment({
        text: "",
        rating: 1,
        user_id: "663fb03de790f80ff1fe1901",
        anime_id: animeID,
      });
      setTextValue("");
      setRatingValue(1);
    }
  };

  const deleteComment = async (commentUserID, commentID) => {
    await axios.delete(
      "http://localhost:3000/api/comments/" + commentUserID + "-" + commentID,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    load();
  };

  const commentChangeHandler = async (commentUserID, id, identifier, value) => {
    try {
      const objData = {
        [identifier]: value,
      };

      const retVal = await axios.put(
        "http://localhost:3000/api/comments/" + commentUserID + "-" + id,
        objData,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      load();
    } catch (error) {}
  };

  let ratingAll = 0;

  anime.comments?.map((item) => {
    ratingAll = ratingAll + item.rating;
  });

  let rating = Math.round((ratingAll / anime.comments?.length) * 100) / 100;

  let description = anime.description;
  console.log(anime.genre);

  return (
    <>
      <Navbar />
      <div className="animeDetail">
        <div className="back" onClick={() => navigate(-1)}>
          <ArrowBackOutlined />
          <span></span>
          Back
        </div>
        <div className="video">
          <iframe
            width="885"
            height="506"
            src={anime.trailer}
            title="My Hero Academia Season 7 | OFFICIAL TRAILER"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="animeInfo">
          <div className="itemInfoTop">
            <p className="title">{anime.title}</p>
            <span>Episodes: {anime.numOfEpisodes}</span>
            <span className="limit">Seasons: {anime.numOfSeasons}</span>
            <span>{anime.year}</span>
            <div className="genre">Genre: {anime.genre?.genre}</div>
            <div className="rating">Average rating: {rating}</div>
          </div>
          <div className="icons">
            <Add />
            <ThumbUpAltOutlined />
            <ThumbDownAltOutlined />
          </div>
          <div className="description">
            {showMore ? description : description?.substring(0, 450) + `...`}
            <button
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
        <div className="comments">
          <h2 className="commentsTitle">Comments</h2>
          <div className="addComment">
            <label htmlFor="text">Your comment</label>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* <input type="text" name="answerText" /> */}
            <div className="input">
              <textarea
                id="text"
                name="text"
                placeholder="Write a comment..."
                rows="4"
                cols="50"
                value={textValue}
                onChange={changeHandler}
              ></textarea>

              <div className="btn">
                <div className="numInput">
                  <label htmlFor="text">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    maxLength="1"
                    value={ratingValue}
                    onChange={changeHandler}
                  />
                </div>
                <button
                  onClick={() => {
                    addComment();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <ul>
            {anime.comments?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="commentHeader">
                    <div className="author_img">
                      <img
                        src={
                          item.user_id.profilePic != ""
                            ? item.user_id.profilePic
                            : profileImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="author">{item.user_id.username}</div>
                    <div className="sep">-</div>
                    <div className="rating">
                      rated
                      {((user._id === item.user_id._id && isEdit) ||
                        (user.isAdmin && isEdit)) &&
                      buttonID === item._id ? (
                        <EditableRow
                          className="editRow"
                          value={item.rating}
                          identificator={"rating"}
                          id={item._id}
                          commentUserID={item.user_id._id}
                          onConfirm={commentChangeHandler}
                        />
                      ) : (
                        <span>{item.rating}</span>
                      )}
                      {/* <span>{item.rating}</span> */}
                    </div>
                    {(user._id === item.user_id._id || user.isAdmin) && (
                      <div className="editDelete">
                        <Edit
                          onClick={() => {
                            setIsEdit(!isEdit);
                            setButtonID(item._id);
                          }}
                        />
                        <Delete
                          onClick={() => {
                            deleteComment(item.user_id._id, item._id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {((user._id === item.user_id._id && isEdit) ||
                    (user.isAdmin && isEdit)) &&
                  buttonID === item._id ? (
                    <EditableRow
                      value={item.text}
                      identificator={"text"}
                      id={item._id}
                      commentUserID={item.user_id._id}
                      onConfirm={commentChangeHandler}
                    />
                  ) : (
                    <div className="comment">{item.text}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AnimeDetail;
