import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";
const RenderAttachment = ( file, url ) => {
    switch (file) {
      case "video":
        return <video src={url} controls preload="none" style={{ width: "200px" }} />;
      case "audio":
        return <audio src={url} controls preload="none" />;
      case "image":
        return (
          <img
            src={transformImage(url, 200)}
            alt="Attachment"
            style={{ width: "200px", height: "150px", objectFit: "contain" }}
          />
        );
      default:
        return <FileOpenIcon />;
    }
  };
  

export default RenderAttachment;
