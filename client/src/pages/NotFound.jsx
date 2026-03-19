import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container
      maxWidth=""
      sx={{
        height: "100vh",
        width: "100vw",
        background:
          "radial-gradient(circle at 22% 15%, rgba(78,205,196,0.18), transparent 34%), radial-gradient(circle at 80% 18%, rgba(255,195,113,0.16), transparent 34%), #0c111b",
      }}
    >
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <ErrorIcon sx={{ fontSize: "9rem", color: "#4ecdc4" }} />
        <Typography variant="h1" sx={{ color: "#e6edf7", fontWeight: 800 }}>
          404
        </Typography>
        <Typography variant="h3" sx={{ color: "#9db0cb" }}>
          Not Found
        </Typography>
        <Link to="/" style={{
          color: "#052928",
          textDecoration: "none",
          fontSize: "1.1rem",
          fontWeight: "bold",
          padding: "0.9rem 1.4rem",
          background: "linear-gradient(135deg, #4ecdc4, #8ae3dc)",
          borderRadius: "999px",
          boxShadow: "0 10px 25px rgba(78,205,196,0.26)",
        }}>
          Go back to Home Page
        </Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
