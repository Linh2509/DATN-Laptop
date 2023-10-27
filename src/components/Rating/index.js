import "./Rating.css";
import React, { useState } from "react";

const Rating = ({ value, onHover, onLeave, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (rating) => {
    setHoverValue(rating);
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const [hoverValue, setHoverValue] = useState(null);

  const ratingValues = ["Terrible", "Bad", "Average", "Good", "Excellent"];

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={
        index < (hoverValue !== null ? hoverValue : value)
          ? "star-filled"
          : "star-empty"
      }
      onMouseEnter={() => handleHover(index + 1)}
      onMouseLeave={() => {
        onLeave();
        handleLeave();
      }}
      onClick={() => onClick(index + 1)}
    >
      {isHovered && ratingValues[index]}{" "}
      {/* Hiển thị ratingValues khi isHovered */}
    </span>
  ));

  return <div className="rating">{stars}</div>;
};

export default Rating;
