import express from "express";
import {
  Login,
  newUser,
  getMyProfile,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
  Logout,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  validateHandler,
  registerValidator,
  LoginValidator,
  sendRequestValidator,
  acceptRequestValidator,
} from "../lib/validators.js";
const Router = express.Router();

Router.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
Router.post("/login", LoginValidator(), validateHandler, Login);

Router.use(isAuthenticated);

Router.get("/me", getMyProfile);
Router.get("/logout", Logout);
Router.get("/search", searchUser);
Router.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

Router.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

Router.get("/notifications",getMyNotifications)

Router.get("/friends",getMyFriends)




export default Router;
