import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check if the user is logged in based on the presence of the "token" in local storage
    if (localStorage.getItem("token")) {
      setLoginStatus(true);
    }
  }, []); // No need to include loginStatus in the dependency array

  const logout = () => {
    // Clear user-related data from local storage when logging out
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    history.push("/", { from: "Header" });
    // You don't need to manually reload the page
  };

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon" />
      </Box>
      <Box>{props.children}</Box>
      {props.hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/", { from: "Header" })}
        >
          Back to explore
        </Button>
      ) : loginStatus ? (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Avatar src="avatar.png" alt={localStorage.getItem("username")} />
          <p>{localStorage.getItem("username")}</p>
          <Button variant="text" onClick={logout}>
            LOGOUT
          </Button>
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button
            variant="text"
            onClick={() => history.push("/login", { from: "Header" })}
          >
            LOGIN
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push("/register", { from: "Header" })}
          >
            REGISTER
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
