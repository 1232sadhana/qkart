import React from "react";
import Header from "./Header";

const Products = () => {
  const handleLogin = () => {
    // Implement the logic to navigate to the login page
  };

  const handleRegister = () => {
    // Implement the logic to navigate to the register page
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Implement any other necessary logic, e.g., navigating to the logout page
  };

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
            <button className="header-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* When logged out: Login button to route to login page */}
            <button className="header-login-button" onClick={handleLogin}>
              Login
            </button>

            {/* When logged out: Register button to route to register page */}
            <button className="header-register-button" onClick={handleRegister}>
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

