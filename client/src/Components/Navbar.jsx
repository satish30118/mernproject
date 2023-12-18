import React from "react";
import {NavLink} from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <>
        <div className="navbar">

          <div className="nav-left">
            <div className="nav-logo">
              {/* <img src="" alt="Logo" /> */}
              <h2>Universe</h2>
            </div>
          </div>

          <div className="nav-right">
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"}>Contact</NavLink>
              </li>
              
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/aboutme "}>About Me</NavLink>
              </li>
            </ul>

          </div>
        </div>
    </>
  );
}
