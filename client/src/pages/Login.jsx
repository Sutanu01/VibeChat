import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(78,205,196,0.18), transparent 34%), radial-gradient(circle at 80% 20%, rgba(255,195,113,0.14), transparent 34%), #0c111b",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(15, 23, 37, 0.9)",
            color: "#e6edf7",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={3}
            fontWeight={600}
            sx={{ color: "#e6edf7" }}
          >
            {isLogin ? "Welcome Back 👋" : "Create an Account"}
          </Typography>

          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      bgcolor: "grey",
                      borderRadius: "50%",
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    color="error"
                    variant="caption"
                    textAlign="center"
                    display="block"
                    mt={1}
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="filled"
                  value={name.value}
                  onChange={name.changeHandler}
                  required
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    input: { color: "#e6edf7" },
                    "& .MuiInputLabel-root": { color: "#9db0cb" },
                  }}
                />

                <TextField
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="filled"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  required
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    input: { color: "#e6edf7" },
                    "& .MuiInputLabel-root": { color: "#9db0cb" },
                  }}
                />
              </>
            )}

            <TextField
              fullWidth
              label="Username"
              margin="normal"
              variant="filled"
              value={username.value}
              onChange={username.changeHandler}
              required
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                input: { color: "#e6edf7" },
                "& .MuiInputLabel-root": { color: "#9db0cb" },
              }}
            />
            {username.error && (
              <Typography color="error" variant="caption">
                {username.error}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="filled"
              value={password.value}
              onChange={password.changeHandler}
              required
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                input: { color: "#e6edf7" },
                "& .MuiInputLabel-root": { color: "#9db0cb" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: "bold",
                color: "#052928",
                backgroundColor: "#4ecdc4",
                "&:hover": { backgroundColor: "#8ae3dc" },
              }}
              disabled={isLoading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography textAlign="center" mt={2} sx={{ color: "#9db0cb" }}>
              OR
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              onClick={toggleLogin}
              sx={{
                mt: 1,
                color: "#4ecdc4",
                borderColor: "#4ecdc4",
                "&:hover": {
                  borderColor: "#8ae3dc",
                  backgroundColor: "rgba(78, 205, 196, 0.12)",
                },
              }}
              disabled={isLoading}
            >
              {isLogin ? "Sign Up Instead" : "Login Instead"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
