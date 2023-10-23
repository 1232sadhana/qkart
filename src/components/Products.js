import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Grid } from "@mui/material";
import { config } from "../App";
import Header from "./Header";
import "./Products.css";
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

  return (
    <div>
      <Header hasHiddenAuthButtons={!token}>
        <img src="logo-url" alt="Logo" className="header-logo" />
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

