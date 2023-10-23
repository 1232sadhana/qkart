import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Box, CircularProgress, Grid, InputAdornment, TextField } from "@mui/material";
import { config } from "../App";
import Header from "./Header";
import Cart from "./Cart";

const Products = () => {
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [items, setItems] = useState([]);

  const debounceSearch = (event, debounceTimeout) => {
    // Debounce search functionality
    // Implement this logic
  };

  useEffect(() => {
    // Fetch the products and initial cart data
    // Implement this logic
  }, []);

  const displayProducts = () => {
    // Display products
    // Implement this logic
  };

  return (
    <div>
      <Header>
        {/* Header with logo */}
        {/* Add your header logo here */}
        <img src="logo-url" alt="Logo" className="header-logo" />

        {token ? (
          <div>
            {/* Logged in: Display username & avatar */}
            <span className="header-username">Your Username</span>
            <img src="avatar-url" alt="User Avatar" className="header-avatar" />

            {/* Logged in: Logout button */}
            <button className="header-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* When logged out: Login button */}
            <button className="header-login-button" onClick={handleLogin}>
              Login
            </button>

            {/* When logged out: Register button */}
            <button className="header-register-button" onClick={handleRegister}>
              Register
            </button>
          </div>
        )}
      </Header>

      {/* Search bar */}
      <TextField
        className="search-desktop"
        size="small"
        InputProps={{
          className: "search",
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => debounceSearch(e, debounceTimeout)}
      />

      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => debounceSearch(e, debounceTimeout)}
      />

      <Grid container>
        <Grid container>
          {token ? (
            <Grid container>
              <Grid item xs={12} md={9}>
                {displayProducts()}
              </Grid>
              <Grid item xs={12} md={3}>
                <Cart products={products} items={items} handleQuantity={addToCart} />
              </Grid>
            </Grid>
          ) : (
            displayProducts()
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
