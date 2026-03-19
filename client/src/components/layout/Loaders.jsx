import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = ({ exiting = false }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        background:
          "radial-gradient(circle at 20% 18%, rgba(78,205,196,0.16), transparent 34%), radial-gradient(circle at 80% 20%, rgba(255,195,113,0.14), transparent 34%), #0c111b",
        transition: "opacity 280ms ease, transform 280ms ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.02)" : "scale(1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.02em",
          color: "#e6edf7",
        }}
      >
        VibeChat
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <BouncingSkeleton
          variant="circular"
          width={12}
          height={12}
          sx={{ bgcolor: "#4ecdc4", animationDelay: "0ms" }}
        />
        <BouncingSkeleton
          variant="circular"
          width={12}
          height={12}
          sx={{ bgcolor: "#7ec8e3", animationDelay: "120ms" }}
        />
        <BouncingSkeleton
          variant="circular"
          width={12}
          height={12}
          sx={{ bgcolor: "#ffc371", animationDelay: "240ms" }}
        />
      </Stack>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(230,237,247,0.7)",
          letterSpacing: "0.03em",
        }}
      >
        loading your space
      </Typography>
    </Box>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { TypingLoader, LayoutLoader };