import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/stores.js";
import theme from "./theme";
import "./global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
