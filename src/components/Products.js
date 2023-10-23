import React from "react";
import Header from "./Header";

const Products = () => {
  return (
    <div>
      <Header>
        {/* Header with logo */}
        <img src="logo-url" alt="Logo" className="header-logo" />

        {localStorage.getItem("token") ? (
          <div>
            {/* Logged in: Display username & avatar */}
            <span className="header-username">Your Username</span>
            <img src="avatar-url" alt="User Avatar" className="header-avatar" />

            {/* Logged in: Logout button to clear localStorage */}
            <button
              className="header-logout-button"
              onClick={() => {
                localStorage.removeItem("token");
                // Add code to navigate to the logout page if needed
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* When logged out: Login button to route to login page */}
            <button
              className="header-login-button"
              onClick={() => {
                // Add code to navigate to the login page if needed
              }}
            >
              Login
            </button>

            {/* When logged out: Register button to route to register page */}
            <button
              className="header-register-button"
              onClick={() => {
                // Add code to navigate to the register page if needed
              }}
            >
              Register
            </button>
          </div>
        )}
      </Header>

      {/* Your product content */}
      {/* ... */}
    </div>
  );
};

export default Products;
