import {
  Add as AddIcon,
  Groups as GroupsIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
  Notifications as NotificationIcon,
  AccountCircle as ProfileIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, Suspense, useState } from "react";
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

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);
  const [groupMenuAnchor, setGroupMenuAnchor] = useState(null);


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

  const openGroupMenu = (event) => setGroupMenuAnchor(event.currentTarget);
  const closeGroupMenu = () => setGroupMenuAnchor(null);

  const handleNewGroupMenuClick = () => {
    closeGroupMenu();
    openNewGroup();
  };

  const handleManageGroupMenuClick = () => {
    closeGroupMenu();
    navigateToGroup();
  };
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "rgba(12, 17, 27, 0.82)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
          elevation={0}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: "1.3rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#e6edf7",
              }}
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
                title="Groups"
                icon={<GroupsIcon />}
                onClick={openGroupMenu}
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

        <Menu
          anchorEl={groupMenuAnchor}
          open={Boolean(groupMenuAnchor)}
          onClose={closeGroupMenu}
          PaperProps={{
            sx: {
              bgcolor: "#0f1725",
              color: "#dce8fa",
              border: "1px solid rgba(255,255,255,0.08)",
              minWidth: 190,
            },
          }}
        >
          <MenuItem onClick={handleNewGroupMenuClick}>
            <AddIcon fontSize="small" sx={{ mr: 1.2 }} /> New Group
          </MenuItem>
          <MenuItem onClick={handleManageGroupMenuClick}>
            <SettingsIcon fontSize="small" sx={{ mr: 1.2 }} /> Manage Groups
          </MenuItem>
        </Menu>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open><CircularProgress color="inherit" /></Backdrop>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open><CircularProgress color="inherit" /></Backdrop>}>
          <NewGroupDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open><CircularProgress color="inherit" /></Backdrop>}>
          <NotificationDialog />
        </Suspense>
      )}
    </>
  );
};
const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{
          color: "#c7d4ea",
          transition: "all 0.25s ease",
          "&:hover": {
            color: orange,
            bgcolor: "rgba(255,255,255,0.07)",
          },
        }}
      >
        {value ? <Badge badgeContent={value} color="error" >{icon}</Badge> : icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
