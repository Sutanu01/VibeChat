import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};
const registerValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("username", "Please enter Username").notEmpty(),
  body("bio", "Please enter Bio").notEmpty(),
  body("passsword", "Please enter Passsword").notEmpty(),
];

const LoginValidator = () => [
  body("username", "Please enter Username").notEmpty(),
  body("passsword", "Please enter Passsword").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please enter Name").notEmpty(),
  body("Members")
    .notEmpty()
    .withMessage("Please Enter  Members")
    .isArray({ min: 2, max: 99 })
    .withMessage("Please Enter 2 to 99 Members"),
];

const addMemberValidator = () => [
  body("chatId").notEmpty().withMessage("Please Enter Chat Id"),
  body("members")
    .notEmpty()
    .withMessage("Please Enter  Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Please Enter 1 to 97 Members"),
];

const removeMemberValidator = () => [
  body("chatId").notEmpty().withMessage("Please Enter Chat Id"),
  body("userId").notEmpty().withMessage("Please Enter  userId"),
];

const sendAttachmentsValidator = () => [
  body("chatId").notEmpty().withMessage("Please Enter Chat Id"),
];

const chatIdValidator = () => [
  param("id").notEmpty().withMessage("Please Enter Chat Id"),
];

const renameValidator = () => [
  param("id").notEmpty().withMessage("Please Enter Chat Id"),
  body("name").notEmpty().withMessage("Please Enter New Name"),
];

const sendRequestValidator = () => [
  body("userId").notEmpty().withMessage("Please Enter user ID"),
];
const acceptRequestValidator = () => [
  body("requestId").notEmpty().withMessage("Please Enter Request ID"),
  body("accept")
    .notEmpty()
    .withMessage("Please Enter Accept or Reject")
    .isBoolean()
    .withMessage("Must be boolean"),
];


const adminLoginValidator = () => [
  body("secretKey","Please enter secret key").notEmpty(),
];


export {
  acceptRequestValidator,
  addMemberValidator, adminLoginValidator, chatIdValidator,
  LoginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler
};

