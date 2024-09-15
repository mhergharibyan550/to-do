import React, { useContext } from "react";
import "./NavBar.scss";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <a href="/" className="brand-logo">
          MERN Todo App
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isLoggedIn ? (
            <li>
              <a href="/" onClick={logout}>
                Log Out
              </a>
            </li>
          ) : (
            <li>
              <a href="/">Log In</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
