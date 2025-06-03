import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { orangeLight, orange } from "../constants/color";

const Home = () => {
  return (
    <Box
      bgcolor={orangeLight}
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        p={"2rem"}
        variant="h4"
        textAlign={"center"}
        sx={{
          color: orange,
          fontWeight: "900",
          fontSize: "3rem",
          fontFamily: "cursive",
          letterSpacing: "1px",
        }}
      >
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
