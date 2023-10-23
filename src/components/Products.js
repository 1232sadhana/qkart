import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Grid } from "@mui/material";
import { config } from "../App";
import Header from "./Header";

const Products = () => {
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Header>
        <img src="logo-url" alt="Logo" className="header-logo" />

        {token ? (
          <div>
            <span className="header-username">{localStorage.getItem("username")}</span>
            <img src="avatar-url" alt="User Avatar" className="header-avatar" />

            <button className="header-logout-button" onClick={clearLocalStorage}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="header-login-button"
              onClick={() => {
                // Implement your logic to route to the login page
              }}
            >
              Login
            </button>
            <button
              className="header-register-button"
              onClick={() => {
                // Implement your logic to route to the register page
              }}
            >
              Register
            </button>
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
