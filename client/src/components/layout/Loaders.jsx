import React from "react";
import { Grid, Skeleton, Stack ,Box} from "@mui/material";

export const LayoutLoader = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }} height={"4rem"} padding={"0.3rem"}>
        <Skeleton variant="rectangular" height={"100%"} />
    </Box>
    <Grid container height={"calc(100vh - 4rem)"} alignItems="stretch">
      <Grid
        item
        sm={4}
        md={3}
        lg={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100%"} />
      </Grid>

      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing="1rem" paddingLeft={"0.5rem"} paddingRight={"0.5rem"} >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={"7rem"}
              width={"auto"}
            />
          ))}
        </Stack>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Skeleton variant="rectangular" height={"100%"} />
      </Grid>
    </Grid>
    </>
  );
};
