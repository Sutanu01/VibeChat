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
        background: "linear-gradient(135deg, #1a0023 0%, #4b007d 50%, #2e0053 100%)",
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
            backgroundColor: "#1a0023", // dark purple bg
            color: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(111, 0, 168, 0.6)", // purple glow
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "#b39ddb" }}
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
                backgroundColor: "#2d0036",
                borderRadius: "8px",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b39ddb" },
                "& .MuiFilledInput-root:before": {
                  borderBottomColor: "#6f00a8",
                },
                "& .MuiFilledInput-root:hover:before": {
                  borderBottomColor: "#b39ddb",
                },
                "& .MuiFilledInput-root:after": {
                  borderBottomColor: "#b39ddb",
                },
              }}
            />

            <Button
              sx={{
                marginTop: "1.5rem",
                fontWeight: "bold",
                backgroundColor: "#6f00a8",
                "&:hover": { backgroundColor: "#5a0087" },
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
