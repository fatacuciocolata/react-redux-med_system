
import React from "react"
import { NavLink } from "react-router-dom";

export const Header = () => {

    return (
      <div className="menu">
        <NavLink activeClassName="active" className="logo" to="/">PAS</NavLink>
        <div className="links">
          <NavLink activeClassName="active" to="/patients">Patients</NavLink>
          <NavLink activeClassName="active" to="/appointments">Appointments</NavLink>
        </div>
      </div>
    );
  };