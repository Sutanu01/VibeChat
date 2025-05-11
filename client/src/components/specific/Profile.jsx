import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid #fff",
        }}
      />
      <ProfileCard heading={"Name"} text={"Name"} Icon={FaceIcon} />
      <ProfileCard heading={"Bio"} text={"I am a software engineer"} />
      <ProfileCard
        heading={"Username"}
        text={"@username"}
        Icon={UserNameIcon}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment(`2024-07-18T18:30:00.000Z`).fromNow()}
        Icon={CalendarIcon}
      />
    </Stack>
  );
};
const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    spacing={"1rem"}
    direction={"row"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && <Icon />}
    <Stack  >
      <Typography variant="body1">{text}</Typography>
      <Typography color={"grey"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);
export default Profile;
