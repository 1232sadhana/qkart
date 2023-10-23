import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Search } from "@mui/icons-material";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { config } from "../App";
import Header from "./Header"; // Removed reference to ProductCard component

const Products = () => {
  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);
    setDebounceTimeout(timeout);
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

  const performSearch = async (text) => {
    try {
      const response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      setFilteredProducts(response.data);
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          setFilteredProducts([]);
        }
        if (e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
          setFilteredProducts(filteredProducts);
        }
      } else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    }
  };

  const displayProducts = () => {
    return (
      <Grid container margin="1rem" padding="1rem" spacing={2}>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <Grid item xs={6} md={3} key={product._id}>
              {/* ProductCard component removed */}
            </Grid>
          ))
        ) : (
          <div>
            <h4 style={{ color: "#636363" }}>No Products found</h4>
          </div>
        )}
      </Grid>
    );
  };

  return (
    <div>
      <Header>
        <img src="logo-url" alt="Logo" className="header-logo" />

        {token ? (
          <div>
            <span className="header-username">Your Username</span>
            <img src="avatar-url" alt="User Avatar" className="header-avatar" />

            <button
              className="header-logout-button"
              onClick={() => {
                localStorage.clear();
                window.location.reload(); // Refresh the page
              }}
            >
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
        {token ? (
          <Grid container>
            <Grid item xs={12} md={9}>
              {displayProducts()}
            </Grid>
          </Grid>
        ) : (
          displayProducts()
        )}
      </Grid>
    </div>
  );
};

export default Products;
