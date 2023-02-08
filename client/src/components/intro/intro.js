import React from "react";
import { Fragment } from "react";
import "./intro.css";
import aboutusimage from "../assets/6.jpg";

const Intro = () => {
  return (
    <Fragment>
      <div className="intro-container">
        <div className="intro-section-one">
          <p>About us</p>
        </div>
        <div
          className="intro-section-two"
          style={{ backgroundImage: `url(${aboutusimage})` }}
        >
          <div className="intro-text-box">
            <h1>Our Story</h1>
            <br></br>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              libero corporis qui numquam architecto laboriosam porro, quaerat
              quisquam! Vitae molestias cumque doloribus illum totam illo quae
              vel odio officia accusantium!
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Intro;
