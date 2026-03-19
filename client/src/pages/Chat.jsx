import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { greyColor, orange } from "../constants/color";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/event.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api.js";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc.js";
import { removeNewMessagesAlert } from "../redux/reducers/chat.js";
import { TypingLoader } from "../components/layout/Loaders.jsx";
import { useNavigate } from "react-router-dom";
const ChatComponent = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const socket = getSocket();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error,
    },
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error,
    },
  ];

  const members = chatDetails.data?.chat?.members;

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!members) return;

    if (!typing) {
      socket.emit(START_TYPING, { members, chatId });
      setTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setTyping(false);
    }, 2000);
  };

  const handleFileMenuOpen = (e) => {
    setFileMenuAnchor(e.currentTarget);
    dispatch(setIsFileMenu(true));
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  useEffect(() => {
    if (!members?.length || !user?._id || !chatId) return;

    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId, members, user?._id, dispatch, setOldMessages, socket]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "696969696969696969696969",
          name: "ADMIN",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandlers = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListner,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={greyColor}
        height={"90%"}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          background:
            "radial-gradient(circle at 15% 18%, rgba(78,205,196,0.12), transparent 34%), radial-gradient(circle at 82% 20%, rgba(255,195,113,0.1), transparent 34%), #0f1725",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {allMessages.map((message) => (
          <MessageComponent key={message._id} message={message} user={user} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        onSubmit={handleChatSubmit}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
          backgroundColor={"rgba(10, 16, 26, 0.92)"}
          sx={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
              color: "#8fa8c8",
            }}
            onClick={handleFileMenuOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChangeHandler}
          />
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "#032322",
              marginLeft: "1rem",
              padding: "0.6rem",
              "&:hover": {
                bgcolor: "#8ae3dc",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
};
const Chat = AppLayout(ChatComponent);
export default Chat;
