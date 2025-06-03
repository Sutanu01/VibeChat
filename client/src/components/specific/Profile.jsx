import {
  CalendarMonth as CalendarIcon,
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography, Button,Box } from "@mui/material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../../constants/config";
import {orange} from "../../constants/color";
const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };
  return (
    <Box sx={{
    width: "100%",
    height: "100%",
    backgroundColor: orange,
    borderRadius: "10px",
  }}>
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}
      sx={{
      padding: "2rem",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      height: "100%",
    }}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
      <Button
        onClick={logoutHandler}
        startIcon={<LogoutIcon />}
        sx={{
          mt: "auto",
          borderRadius: "2rem",
          px: 4,
          py: 1,
          color: "white",
          background:
            "linear-gradient(270deg, #ff6a00, #ee0979, #ff6a00, #ee0979)",
          backgroundSize: "400% 400%",
          border: "none",
          fontWeight: "bold",
          transition: "background-position 3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundPosition: "100% 0",
            transform: "scale(1.05)",
            boxShadow: "0 0 10px #ee0979",
          },
        }}
      >
        Logout
      </Button>
    </Stack>
    </Box>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
