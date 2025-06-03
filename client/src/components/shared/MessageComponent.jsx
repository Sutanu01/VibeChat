import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { lightBlueColor ,orange } from "../../constants/color";
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
        backgroundColor: "white",
        color: "black",
        borderRadius: "8px",
        padding: "0.75rem",
        maxWidth: "80%",
        margin: "0.5rem",
        minWidth: "125px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        color={lightBlueColor}
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
              style={{ color: "black", textDecoration: "none" }}
            >
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );
      })}

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", marginTop: "0.3rem", textAlign: "right" }}
      >
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default MessageComponent;
