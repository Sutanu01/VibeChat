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
        backgroundColor: "#2d0036", // lighter background tone
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
            backgroundColor: "#1a0023", // dark bg same as NotFound
            color: "#fff",
            boxShadow: "0 8px 32px rgba(111, 0, 168, 0.6)", // purple shadow
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={3}
            fontWeight={600}
            sx={{ color: "#b39ddb" }}
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
                    backgroundColor: "#2d0036",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    "& .MuiInputLabel-root": { color: "#b39ddb" },
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
                    backgroundColor: "#2d0036",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    "& .MuiInputLabel-root": { color: "#b39ddb" },
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
                backgroundColor: "#2d0036",
                borderRadius: "8px",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b39ddb" },
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
                backgroundColor: "#2d0036",
                borderRadius: "8px",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b39ddb" },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: "bold",
                backgroundColor: "#6f00a8",
                "&:hover": { backgroundColor: "#5a0087" },
              }}
              disabled={isLoading}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography textAlign="center" mt={2} sx={{ color: "#b39ddb" }}>
              OR
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              onClick={toggleLogin}
              sx={{
                mt: 1,
                color: "#6f00a8",
                borderColor: "#6f00a8",
                "&:hover": {
                  borderColor: "#5a0087",
                  backgroundColor: "rgba(111, 0, 168, 0.1)",
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
