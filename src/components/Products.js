import React, { useState } from "react";
import Header from "./Header";

const Products = () => {
  const userToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!userToken);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header>
        <div className="header-logo">
          {/* Add your logo component here */}
        </div>
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <div>
              {/* Add username and avatar here */}
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => window.location.href = '/login'}>Login</button>
            <button onClick={() => window.location.href = '/register'}>Register</button>
          </div>
        )}
      </Header>

      {/* Rest of your Products page content */}
    </div>
  );
};

export default Products;
