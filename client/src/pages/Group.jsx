import React, { Suspense, useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Tooltip,
  Box,
  Drawer,
  Stack,
  Typography,
  Avatar,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import {
  Add as AddIcon,
  ExitToApp as ExitIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { samplechats } from "../constants/sampleData.js";
const ConfirmLeaveDialog = React.lazy(() =>
  import("../components/dialogs/ConfirmLeaveDialog.jsx")
);

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [GroupName, setGroupName] = useState("");
  const [UpdateGroupName, setUpdateGroupName] = useState("");
  const [IsEditGroup, setIsEditGroup] = useState(false);
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);

  //-----------------------------------------

  const navigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const handleEditGroupName = () => {
    setIsEditGroup(false);
    setGroupName(UpdateGroupName);
  };
  const openConfirmLeave = () => setConfirmLeaveDialog(true);
  const closeConfirmLeave = () => setConfirmLeaveDialog(false);
  const handleAddMembers = () => {};
  const LeaveGroupHandler = () => {
    setConfirmLeaveDialog(false);
    console.log("Leave group");};
  //-----------------------------------------

  useEffect(() => {
    setGroupName(`Group Name ${chatId}`); //temp;
    setUpdateGroupName(`Group Name ${chatId}`); //temp;

    // When we switch the group the values should be reset
    return () => {
      setGroupName("");
      setUpdateGroupName("");
      setIsEditGroup(false);
    };
  }, [chatId]);

  //-------------Components----------------
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupNameBlock = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}
    padding={"3rem"} spacing={"1rem"}>
      {IsEditGroup ? (
        <>
          <TextField
            value={UpdateGroupName}
            onChange={(e) => {
              setUpdateGroupName(e.target.value);
            }}
          />
          <IconButton onClick={handleEditGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{GroupName}</Typography>
          <IconButton onClick={() => setIsEditGroup(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        variant="outlined"
        color="error"
        startIcon={<ExitIcon />}
        onClick={openConfirmLeave}
      >
        Leave Group
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddMembers}
      >
        Add Members
      </Button>
    </Stack>
  );

  //-----------------------------------------

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{ display: { xs: "none", sm: "block" } }}
        bgcolor="bisque"
      >
        <GroupList myGroups={samplechats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {GroupName && (
          <>
            {GroupNameBlock}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              paddding={{
                sm: "1rem",
                xs: "0rem",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"beige"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members  */}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {confirmLeaveDialog && (
        <Suspense fallback={<Backdrop open/>}>
          <ConfirmLeaveDialog
          handleClose={closeConfirmLeave}
          open={confirmLeaveDialog}
          deleteHandler={LeaveGroupHandler}
        />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"} myGroups={samplechats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w} padding="1rem">
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupsListItem key={group._id} group={group} chatId={chatId} />
        ))
      ) : (
        <Typography textAlign={"center"} padding="1rem">
          No groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupsListItem = ({ group, chatId }) => {
  const { avatar, name, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};

export default Group;
