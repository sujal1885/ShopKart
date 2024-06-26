import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options = {
        size: "large",
        value: review.ratings,
        readOnly: true,
        precision: 0.5,
      };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;