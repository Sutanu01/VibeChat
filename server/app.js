import express from "express";
import { connectToMongo } from "./utils/features.js";
import { Server } from "socket.io";
import { errorMiddleWare } from "./middlewares/error.js";
import { createServer } from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
export const userSocketIDs = new Map();

const app = express();
app.use(express.json());
app.use(errorMiddleWare);
app.use(cookieParser());

dotenv.config({ path: "./.env" });

connectToMongo(MONGO_URI);

const server = createServer(app);
const io = new Server(server, {});

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});

io.on("connection", (socket) => {
  const user = {
    _id: "adaadada",
    name: "addada",
  };
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
