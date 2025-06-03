import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container
      maxWidth=""
      sx={{ height: "100vh", width: "100vw", backgroundColor: "#1a0023" }}
    >
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <ErrorIcon sx={{ fontSize: "10rem", color: "#6f00a8" }} />
        <Typography variant="h1" sx={{ color: "#fff" }}>404</Typography>
        <Typography variant="h3" sx={{ color: "#b39ddb" }}>Not Found</Typography>
        <Link to="/" style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1rem",
          background: "#2d0036",
          borderRadius: "8px",
        }}>
          Go back to Home Page
        </Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
