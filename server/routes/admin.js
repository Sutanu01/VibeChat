import express from "express";
import {
  allUsers,
  allChats,
  allMessages,
  getDashBoardStats,
  adminLogin,
  adminLogout,
  getAdminData
} from "../controllers/admin.js";
import {isAdmin } from "../middlewares/auth.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
const Router = express.Router();

Router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
Router.get("/logout",adminLogout);


Router.use(isAdmin);

Router.get("/",getAdminData);
Router.get("/users", allUsers);
Router.get("/chats", allChats);
Router.get("/messages", allMessages);
Router.get("/stats", getDashBoardStats);

export default Router;
