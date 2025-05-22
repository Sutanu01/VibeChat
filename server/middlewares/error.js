import { envMode } from "../app.js";

const errorMiddleWare = (err, req, res, next) => {
  err.message ||= "Internal server error";
  err.statusCode ||= 500;
  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(", ");
    err.message = `Duplicate field ${error} entered`;
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.message = `Invalid Format of ${err.path}`;
    err.statusCode = 400;
  }

  const response = {
    success: false,
    message: err.message,
  };
  if (envMode === "DEVELOPMENT") {
    response.error = err;
  }
  return res.status(err.statusCode).json(response);
};

const TryCatch = (passedFunc) => async (req, res, next) => {
  try {
    await passedFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};

export { errorMiddleWare, TryCatch };
