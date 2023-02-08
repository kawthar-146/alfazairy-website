import { Fragment } from "react";
import React from "react";
import "./reviewcard.css";

const ReviewCard = (props) => {
  return (
    <Fragment>
      <div>
        <div className="card-container">
          <div className="card-intro">
            <img src={props.image} alt="" />
            <h4>{props.name}</h4>
          </div>
          <br></br>
          <p>{props.text}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewCard;
