import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import {
  newGroupValidator,
  validateHandler,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator,
} from "../lib/validators.js";
const Router = express.Router();

Router.use(isAuthenticated);




Router.post("/new", newGroupValidator(), validateHandler, newGroupChat);
Router.get("/my", getMyChats);
Router.get("/my/groups", getMyGroups);

Router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
Router.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

Router.delete("leave/:id", chatIdValidator(), validateHandler, leaveGroup);

Router.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

Router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

Router.route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);
export default Router;
