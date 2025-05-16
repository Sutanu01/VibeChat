import { ErrorHandler } from "../utils/utility.js";
const isAuthenticated = (req, res, next) => {
  const token = req.cookies["yapyap-token"];
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded._id;
  next();
};

export { isAuthenticated };
