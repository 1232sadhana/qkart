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
    // Check if the user is logged in
    if (localStorage.getItem("username") && localStorage.getItem("token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    setLoginStatus(false); // Update the login status
    history.push("/login"); // Redirect to the login page
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
          onClick={() => history.push("/")}
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
          <Button variant="text" onClick={() => history.push("/login")}>
            LOGIN
          </Button>
          <Button
            variant="contained"
            onClick={() => history.push("/register")}
          >
            REGISTER
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
