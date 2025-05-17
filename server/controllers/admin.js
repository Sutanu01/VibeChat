import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../utils/features.js";




const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;
  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "IITRANCHI";
  const isMatch = secretKey === adminSecretKey;
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Admin Key", 401));
  }
  const token = jwt.sign(secretKey, process.env.JWT_SECRET_KEY);

  return res
    .status(200)
    .cookie("vibechat-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Welcome Admin",
    });
});

const adminLogout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("vibechat-admin-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const getAdminData=TryCatch(async (req, res, next) => {
    return res.status(200).json({
        admin:true,
    });
});

const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: { $in: [_id] } }),
        Chat.countDocuments({ groupChat: false, members: { $in: [_id] } }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );
  res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          name,
          _id,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );
  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const allMessages = TryCatch(async (req, res, next) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "name avatar");
  const transformedMessages = messages.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => ({
      _id,
      attachments,
      content,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    })
  );
  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashBoardStats = TryCatch(async (req, res, next) => {
  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments({}),
      Message.countDocuments({}),
      Chat.countDocuments({}),
    ]);

  const today = new Date();
  const last7days = new Date();
  lastDate.setDate(today.getDate() - 7);

  const last7daysMessages = await Message.find({
    createdAt: {
      $gte: last7days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  const daysInMillisec = 1000 * 60 * 60 * 24;

  last7daysMessages.forEach((message) => {
    const index = Math.floor(
      (today.getTime() - message.createdAt.getTime()) / daysInMillisec
    );
    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});



export { allUsers, allChats, allMessages, getDashBoardStats, adminLogin,adminLogout,getAdminData };
