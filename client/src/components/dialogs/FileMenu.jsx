import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
      <div style={{ width: "10rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et ut
        voluptate iure magni accusamus, sequi vitae aspernatur, similique,
        deleniti a. Voluptatem, odit.
      </div>
    </Menu>
  );
};

export default FileMenu;
