import express from "express";
import { connectToMongo } from "./utils/features.js";
import { Server } from "socket.io";
import { errorMiddleWare } from "./middlewares/error.js";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
export const CLIENT_URL = process.env.CLIENT_URL;
export const userSocketIDs = new Map();

const app = express();
app.use(express.json());
app.use(errorMiddleWare);
app.use(cookieParser());
app.use(cors(corsOptions));

connectToMongo(MONGO_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);
app.get("/", (req, res) => {
  res.send("Server is running");
});

io.use((socket, next) => {
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});

io.on("connection", (socket) => {
  const user =socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("a user connected", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealtime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      chat: chatId,
      sender: user._id,
    };

    const memberSocket = getSockets(members);
    io.to(memberSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealtime,
    });
    io.to(memberSocket).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.error("Error saving message to database:", error);
      return;
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

server.listen(PORT, () => {
  console.log(
    `Server is running on port http://localhost:${PORT}/  in ${envMode} mode`
  );
});
