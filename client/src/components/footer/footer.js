import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import "./footer.css";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer-container">
        <div className="footer-primary-section">
          <h1>ALFAZAIRY</h1>
          <p className="footer-slogan">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
            dolor!
          </p>
          <div className="social-icons">
            <ul>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} className="youtube" />
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='footer-secondary-section '>
          <h3>
            Copyright © 2022 Alfazairy Designed By <span>Codi-B08</span>
          </h3>
        </div> */}
      </footer>
    </Fragment>
  );
};

export default Footer;
