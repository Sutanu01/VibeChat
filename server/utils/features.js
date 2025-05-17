import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectToMongo = (uri) => {
  mongoose
    .connect(uri, {
      dbName: "VibeChat",
    })
    .then((data) => {
      console.log(`Connected to MongoDB ${data.connection.host}`);
    })
    .catch((err) => {
      throw new Error("Failed to connect to MongoDB: " + err.message);
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  return res.status(code).cookie("vibechat-token", token, cookieOptions).json({
    success: true,
    token,
    message,
    user,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emitting event: ", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {
  //
};



export {
  connectToMongo,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
};
