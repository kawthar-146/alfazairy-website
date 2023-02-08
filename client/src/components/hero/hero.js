import React, { Fragment } from "react";
import "./hero.css";
import { Link } from "react-router-dom";
import Instavideo from "../assets/myvideo.mp4";

const Hero = () => {
  return (
    <Fragment>
      <section className="hero-container">
        <div className="hero-primary">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, ad.
          </h4>

          <div className="button_container">
            <Link className="hero-btn" to="/collections">
              <span>View Collections</span>
            </Link>
          </div>
        </div>
        <div className="hero-secondary">
          <div className="hero-video-container">
            <video
              className="theVid"
              src={Instavideo}
              muted
              loop
              autoPlay
            ></video>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hero;
