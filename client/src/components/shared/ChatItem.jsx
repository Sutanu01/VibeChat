import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "../styles/StyledComponents";
import AvatarCard from "./AvatarCard";
import { midnightPurple } from "../../constants/color";
const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{ padding: "0rem" }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{
          delay: index * 0.05,
          type: "spring",
          stiffness: 80,
          damping: 10,
        }}
        style={{
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          background: sameSender ? midnightPurple : "unset",
          color: sameSender ? "white" : "grey",
          position: "relative",
        }}
      >
        {avatar && <AvatarCard avatar={avatar} />}
        <Stack>
          <Typography sx={{ fontWeight: "600" }}>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              backgroundColor: "#98ff98",
              color: "#000",
              boxShadow: "0 0 10px #98ff98, 0 0 20px #98ff98",
              position: "absolute",
              right: "1rem",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
