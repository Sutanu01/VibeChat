import {
  Groups as GroupsIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Notifications as NotificationIcon,
  AccountCircle as ProfileIcon,
  PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
import { resetNotificationCount } from "../../redux/reducers/chat";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
const NotificationDialog = lazy(() => import("../specific/Notification"));

const Header = ({handleProfileToggle}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification,isNewGroup } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);


  const handleMobile = () => dispatch(setIsMobile(true));
  const openSearch = () => dispatch(setIsSearch(true));
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  }

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" },
            fontFamily:'cursive',fontSize:'1.5rem',fontWeight:'bold' }}
            >
              VibeChat
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title="Add Friend"
                icon={<PersonAddIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title="New Group"
                icon={<GroupsIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Manage Groups"
                icon={<SettingsIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="Notification"
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
               <IconBtn
                title="profile"
                icon={<ProfileIcon />}
                onClick={handleProfileToggle}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error" >{icon}</Badge> : icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
