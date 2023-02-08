import React from "react";
import { NavLink } from "react-router-dom";
import "./DashNav.css";

const DashNav = () => {
  return (
    <div className="dashboard-menu">
      <ul>
        <li>
          {" "}
          <NavLink
            style={{ textDecoration: "none" }}
            to="/admin/dashboard/collections"
            className={({ isActive }) => (isActive ? "active-db-link" : "")}
          >
            Collections
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/admin/dashboard/dresses"
            className={({ isActive }) => (isActive ? "active-db-link" : "")}
          >
            Dresses
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{ textDecoration: "none" }}
            to="/admin/dashboard/categories"
            className={({ isActive }) => (isActive ? "active-db-link" : "")}
          >
            Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashNav;
