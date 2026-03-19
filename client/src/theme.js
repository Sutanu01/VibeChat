import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0c111b",
      paper: "#121a28",
    },
    primary: {
      main: "#4ecdc4",
    },
    secondary: {
      main: "#ffc371",
    },
    text: {
      primary: "#e6edf7",
      secondary: "#9db0cb",
    },
    error: {
      main: "#ff6b6b",
    },
  },
  typography: {
    fontFamily: "Sora, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
