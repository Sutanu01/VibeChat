import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 18% 22%, rgba(78,205,196,0.16), transparent 34%), radial-gradient(circle at 80% 20%, rgba(255,195,113,0.14), transparent 34%), #0c111b",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(15, 23, 37, 0.9)",
            color: "#e6edf7",
            borderRadius: "16px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#e6edf7" }}
          >
            Admin Login
          </Typography>
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
              label="Secret Key"
              type="password"
              margin="normal"
              variant="filled"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                input: { color: "#e6edf7" },
                "& .MuiInputLabel-root": { color: "#9db0cb" },
                "& .MuiFilledInput-root:before": {
                  borderBottomColor: "#4ecdc4",
                },
                "& .MuiFilledInput-root:hover:before": {
                  borderBottomColor: "#8ae3dc",
                },
                "& .MuiFilledInput-root:after": {
                  borderBottomColor: "#8ae3dc",
                },
              }}
            />

            <Button
              sx={{
                marginTop: "1.5rem",
                fontWeight: "bold",
                color: "#052928",
                backgroundColor: "#4ecdc4",
                "&:hover": { backgroundColor: "#8ae3dc" },
              }}
              variant="contained"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
