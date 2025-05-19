import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["vibechat-token"];
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded._id;
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
export { isAuthenticated , isAdmin};
