import React, { useRef, useState } from "react";
import "./list.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import ListItem from "../listItem/ListItem";

function List({ list }) {
  const [isMoving, setIsMoving] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoving(true);
    let distance =
      (100 * (listRef.current.getBoundingClientRect().x - 50)) /
      window.innerWidth;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 25);
      slideNumber <= 25 ? setIsMoving(false) : setIsMoving(true);
      listRef.current.style.transform = `translateX(${25 + distance}vw)`;
    }
    if (direction === "right" && slideNumber < 200) {
      setSlideNumber(slideNumber + 25);
      listRef.current.style.transform = `translateX(${-25 + distance}vw)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoving && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItem key={index} index={index} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default List;
