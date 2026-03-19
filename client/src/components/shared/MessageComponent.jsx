import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { lightBlueColor, orange } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { content, attachments = [], sender, createdAt } = message;
  const sameSender = user._id === sender._id;
  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: sameSender ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: sameSender ? 50 : -50 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        background: sameSender
          ? "linear-gradient(135deg, rgba(78,205,196,0.95), rgba(64,184,176,0.94))"
          : "rgba(11, 19, 31, 0.92)",
        color: sameSender ? "#032321" : "#dbe6f7",
        borderRadius: "14px",
        padding: "0.85rem 0.95rem",
        maxWidth: "80%",
        margin: "0.5rem",
        minWidth: "125px",
        border: sameSender
          ? "1px solid rgba(78,205,196,0.55)"
          : "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 8px 18px rgba(0,0,0,0.24)",
      }}
    >
      <Typography
        color={sameSender ? "#073b37" : lightBlueColor}
        fontWeight="600"
        variant="caption"
        sx={{ mb: 0.5 }}
      >
        {sameSender ? "You" : sender.name}
      </Typography>

      {content && (
        <Typography sx={{ mb: attachments.length ? 1 : 0 }}>{content}</Typography>
      )}

      {attachments.map((attachment, index) => {
        const url = attachment.url;
        const file = fileFormat(url);
        return (
          <Box key={index} sx={{ my: 0.5 }}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{ color: sameSender ? "#073b37" : "#dbe6f7", textDecoration: "none" }}
            >
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );
      })}

      <Typography
        variant="caption"
        color={sameSender ? "rgba(0, 40, 36, 0.8)" : "rgba(219, 230, 247, 0.65)"}
        sx={{ display: "block", marginTop: "0.3rem", textAlign: "right" }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default MessageComponent;
