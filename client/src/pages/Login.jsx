import React, { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";


const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const toggleLogin = () => setisLogin(!isLogin);
  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const bio = useInputValidation("");
  const password = useInputValidation();
  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
  };
  const handleSignUp = (e) => {
    e.preventDefault();
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))",
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(5px)",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant={"h4"} color="rgba(120,110,220)" sx={{ fontFamily: "cursive" }} >Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color={"error"}>{username.error}</Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Sign IN
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant={"h5"}
                color="rgba(120,110,220)"
                sx={{ fontFamily: "cursive" }}
              >
                REGISTER
              </Typography>

              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"5.2rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": { bgcolor: "rgba(0,0,0,0.9)" },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon
                        sx={{
                          width: "1rem",
                          height: "1rem",
                          objectFit: "contain",
                        }}
                      />
                      <VisuallyHiddenInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography m={"1rem"} color={"error"}>
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color={"error"}>{username.error}</Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  sx={{ marginTop: "1rem" }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Sign IN
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Already have an account? Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
