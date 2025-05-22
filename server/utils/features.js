import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

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
      throw new Error("Failed to connect to MongoDB: " + err);
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
  const io = req.app.get("io");
  const userSocket = getSockets(users);
  io.to(userSocket).emit(event, data);

};




const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading file to Cloudinary:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (error) {
     throw new Error("Error uploading files to Cloudinary: " + error);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {
  //
};

export {
  connectToMongo,
  sendToken,
  cookieOptions,
  emitEvent,
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
};
