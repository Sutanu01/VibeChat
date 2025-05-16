import express from "express";
import { connectToMongo } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";

const app = express();
app.use(express.json());
app.use(errorMiddleWare);
app.use(cookieParser());

dotenv.config({ path: "./.env" });

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connectToMongo(MONGO_URI);

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
