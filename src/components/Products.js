import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src="logo-url" alt="Logo" />
      </div>
      <div className="header-buttons">
        {token ? (
          <div className="header-user-info">
            <span className="header-username">{username}</span>
            <img src={avatar} alt="User Avatar" className="header-avatar" />
            <button className="header-logout-button" onClick={clearLocalStorage}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="header-login-button">
              Login
            </Link>
            <Link to="/register" className="header-register-button">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
