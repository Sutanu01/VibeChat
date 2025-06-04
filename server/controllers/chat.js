import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/Chat1.js";
import { User } from "../models/User1.js";
import { Message } from "../models/Message1.js";
import {
  deleteFilesFromCloudinary,
  emitEvent,
  uploadFilesToCloudinary,
} from "../utils/features.js";
import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  if (members.length < 2) {
    return next(
      new ErrorHandler("Atleast 3 members are required to create a group", 400)
    );
  }
  const allMembers = [...members, req.user];
  const groupChat = await Chat.create({
    creator: req.user,
    name,
    groupChat: true,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers,{
    message: `You have been added to ${name}`,
    chatId: groupChat._id,
  });
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group chat created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );
  const transformedChats = chats.map(({ _id, name, groupChat, members }) => {
    const otherMember = getOtherMember(members, req.user);
    return {
      _id,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
      groupChat,
      name: groupChat ? name : otherMember.name,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
    };
  });
  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ creator: req.user }).populate(
    "members",
    "name avatar"
  );
  const groups = chats.map(({ _id, name, groupChat, members }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    };
  });
  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  if (!members || members.length < 1) {
    return next(new ErrorHandler("Members are required", 400));
  }
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("Not a Group Chat", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("Only creator can add members", 403));
  }
  const allNewMembersPromise = members.map((memberId) =>
    User.findById(memberId, "name")
  );

  const allNewMembers = await Promise.all(allNewMembersPromise);
  const uniqueMembers = allNewMembers
    .filter(({ i }) => !chat.members.includes(i._id.toString()))
    .map(({ i }) => i._id);

  chat.members.push(...allNewMembers.map(({ i }) => i._id));

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group member limit is reached", 400));
  }
  await chat.save();

  const allUsersName = allNewMembers.map(({ name }) => name).join(", ");
  emitEvent(req, ALERT, chat.members, {
    message: `${allUsersName} added to the group`,
    chatId,
  });
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { chatId, memberId } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("Not a group chat", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("Only creator can remove members", 403));
  }
  const member = chat.members.find(
    (mem) => mem._id.toString() === memberId.toString()
  );
  if (!member) {
    return next(new ErrorHandler("Member not found", 404));
  }
  if (member._id.toString() === req.user.toString()) {
    return next(new ErrorHandler("You cannot remove yourself", 400));
  }
  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group must have 3 members", 400));
  }

  const allChatMembers = chat.members.map((i) => i.toString());
  chat.members = chat.members.filter(
    (mem) => mem._id.toString() !== memberId.toString()
  );
  await chat.save();
  emitEvent(req, ALERT, chat.members, {
    message: `${member.name} removed from the group`,
    chatId,
  });
  emitEvent(req, REFETCH_CHATS, allChatMembers);
  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("Not a group chat", 400));
  }
  const remainingMembers = chat.members.filter(
    (member) => member._id.toString() !== req.user.toString()
  );
  if (remainingMembers.length < 3) {
    return next(new ErrorHandler("Group must have 3 members", 400));
  }
  if (chat.creator.toString() === req.user.toString()) {
    const RandomNumber = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[RandomNumber];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    user.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, {
    chatId,
    message: `${user.name} left the group`,
  });

  return res.status(200).json({
    success: true,
    message: "Leaved Group Successfully",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];

  const chat = await Chat.findById(chatId);
  const me = await User.findById(req.user, "name");
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (files.length < 1) {
    return next(new ErrorHandler("Please upload a file", 400));
  }
  if (files.length > 5) {
    return next(new ErrorHandler("You can upload upto 5 files", 400));
  }
  //Uplaod files to cloudinary
  const attachments = await uploadFilesToCloudinary(files);

  const messageForRealTime = {
    content: "",
    attachments,
    sender: {
      _id: me._id,
      name: me.name,
    },
    chat: chatId,
  };

  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };
  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("Not a group chat", 400));
  }
  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("Only creator can rename group", 403));
  }
  chat.name = name;
  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res.status(200).json({
    success: true,
    message: "Group name changed successfully",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  const members = chat.members;
  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("Only creator can delete group", 403));
  }

  if (!chat.groupChat && !chat.members.includes(req.user)) {
    return next(new ErrorHandler("You are not a member of this chat", 403));
  }
  //Here we have to delete all messages and attachments from cloudinary
  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });
  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_ids.push(public_id);
    });
  });

  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Group deleted successfully",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.members.includes(req.user.toString())) {
    return next(new ErrorHandler("You are not a member of this chat", 403));
  }

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / limit) || 0;

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
};
