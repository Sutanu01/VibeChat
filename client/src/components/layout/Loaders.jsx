import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <Grid
      container
      height={"100vh"}
      spacing={"1rem"}
      sx={{
        p: 1,
        background:
          "radial-gradient(circle at 15% 10%, rgba(78,205,196,0.08), transparent 35%), #0c111b",
      }}
    >
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          height={"100%"}
          sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: "1rem" }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"} height="100%">
          <Skeleton
            variant="rounded"
            animation="wave"
            height={80}
            sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: "1rem" }}
          />
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rounded"
              height={"4.5rem"}
              sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: "1rem" }}
            />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          height={"100%"}
          sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: "1rem" }}
        />
      </Grid>
    </Grid>
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