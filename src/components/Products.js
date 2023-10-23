import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Grid } from "@mui/material";
import { config } from "../App";
import Header from "./Header";
import { Link } from "react-router-dom"; // You need to import Link from react-router-dom

const Products = () => {
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const clearLocalStorage = () => {
    // Clear local storage items when logged in and clicking the logout button
    localStorage.clear();
    // Redirect to the home page or any other page you prefer
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.endpoint}/products`);
        setFilteredProducts(response.data);
      } catch (e) {
        if (e.response && e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
        }
      }
    };

    fetchProducts();
  }, [enqueueSnackbar]);

  return (
    <div>
      <Header>
        <img src="logo-url" alt="Logo" className="header-logo" />

        {token ? (
          <div>
            {/* Display the user's username and avatar when logged in */}
            <span className="header-username">Your Username</span>
            <img src="avatar-url" alt="User Avatar" className="header-avatar" />

            {/* Display a logout button when logged in */}
            <button className="header-logout-button" onClick={clearLocalStorage}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* Display a login button that routes to the login page when logged out */}
            <Link to="/login" className="header-login-button">
              Login
            </Link>
            {/* Display a register button that routes to the register page when logged out */}
            <Link to="/register" className="header-register-button">
              Register
            </Link>
          </div>
        )}
      </Header>

      <Grid container>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product._id}>
              {/* Display product information here */}
            </div>
          ))
        ) : (
          <h4 style={{ color: "#636363" }}>No Products found</h4>
        )}
      </Grid>
    </div>
  );
};

export default Products;
