import { Fragment } from "react";
import React from "react";
import "./info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquare,
  faMailBulk,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Info = () => {
  return (
    <Fragment>
      <div className="info-container">
        <div className="info-container-section-1">
          <h1>Contact Information</h1>
          <p>
            Fill up the form and our Team will get back to you within 24 hours
          </p>
        </div>
        <div className="info-container-section-2">
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhoneSquare} className="FA-icon" />
              Phone : +96181728173
            </li>
            <li>
              {" "}
              <FontAwesomeIcon icon={faMailBulk} className="FA-icon" />
              Email : alfazairy@gmail.com
            </li>
            <li>
              <FontAwesomeIcon icon={faMapLocationDot} className="FA-icon" />
              Location : Achrafieh , Fern El Hayek
            </li>
          </ul>
        </div>
        {/* <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.027970191955!2d35.51524461499547!3d33.8889334806507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f16fdc5f324a5%3A0x1ebcc765d2fd7272!2sFurn%20El%20Hayek%2C%20Bayrut!5e0!3m2!1sen!2slb!4v1653901904346!5m2!1sen!2slb"
            width="400"
            height="300"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Info;
