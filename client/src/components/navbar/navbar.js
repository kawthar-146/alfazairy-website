import React, { Fragment, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { Squash as Hamburger } from "hamburger-react";
import LOGO from "../assets/logo.jpg";

const Navbar = () => {
  const [state, setState] = useState(true);

  const hamNavLinkClickHandler = () => {
    setState(!state);
  };
  return (
    <Fragment>
      <nav className="navbar">
        <div className="brand-title">
          <Link to="/">
            <img className="the-logo" src={LOGO} alt="" />
          </Link>
          <p>ALFAZAIRY </p>
        </div>

        <div
          className="toggle-button"
          onClick={() => {
            setState(!state);
          }}
        >
          <Hamburger color="white" toggled={!state} />
        </div>

        <div className={state ? "navbar-links" : "navbar-links-display"}>
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={hamNavLinkClickHandler}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus"
                onClick={hamNavLinkClickHandler}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={hamNavLinkClickHandler}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collections"
                onClick={hamNavLinkClickHandler}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Collections
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};
export default Navbar;
