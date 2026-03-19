import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at 18% 22%, rgba(78,205,196,0.16), transparent 35%), radial-gradient(circle at 78% 20%, rgba(255,195,113,0.14), transparent 35%), #0f1725",
      }}
    >
      <Typography
        p={"2rem"}
        variant="h4"
        textAlign={"center"}
        sx={{
          color: "#e6edf7",
          fontWeight: "900",
          fontSize: { xs: "2rem", sm: "2.6rem" },
          letterSpacing: "0.02em",
          textShadow: "0 8px 28px rgba(0,0,0,0.28)",
        }}
      >
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
