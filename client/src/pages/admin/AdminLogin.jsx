import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import {useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
const isAdmin = true; // Replace with actual admin check

const AdminLogin = () => {
    const secretKey=useInputValidation("");
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log("Login");
    }
    if(isAdmin)return <Navigate to="/admin/dashboard" />;
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))",
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(5px)",
          }}
        >
              <Typography variant={"h4"} color="rgba(120,110,220)" sx={{ fontFamily: "cursive" }} >Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={submitHandler}
              >
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={secretKey.value}
                  onChange={secretKey.changeHandler}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </form>
        </Paper>
      </Container>
    </div>
  )
}

export default AdminLogin