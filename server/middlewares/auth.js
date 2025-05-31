import { ErrorHandler } from "../utils/utility.js";
import { VIBECHAT_TOKEN } from "../constants/config.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies[VIBECHAT_TOKEN];
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded.id;
  next();
};

const isAdmin = (req, res, next) => {
  const token = req.cookies["vibechat-admin-token"];
  if (!token) {
    return next(new ErrorHandler("Only admin can access this route", 401));
  }
  const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "IITRANCHI";
  const isMatch = secretKey === adminSecretKey;
  if (!isMatch) {
    return next(new ErrorHandler("Only admin can access this route", 401));
  }
  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(new ErrorHandler("Authentication error", 401));
    const authtoken = socket.request.cookies[VIBECHAT_TOKEN];
    if (!authtoken) return next(new ErrorHandler("Authentication error", 401));
    const decoded = jwt.verify(authtoken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new ErrorHandler("Authentication error", 401));
    socket.user = user;
    return next();
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Authentication error", 401));
  }
};

export { isAuthenticated, isAdmin, socketAuthenticator };
