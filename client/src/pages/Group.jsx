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
  Skeleton,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  ExitToApp as ExitIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Menu as MenuIcon,
  Add,
} from "@mui/icons-material";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard.jsx";
import UserItem from "../components/shared/UserItem.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useAddGroupMembersMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api.js";
import { useAsyncMutation, useErrors } from "../hooks/hook.jsx";
import { LayoutLoader } from "../components/layout/Loaders.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc.js";
const ConfirmLeaveDialog = React.lazy(() =>
  import("../components/dialogs/ConfirmLeaveDialog.jsx")
);
const AddMemberDialog = React.lazy(() =>
  import("../components/dialogs/AddMemberDialog.jsx")
);

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myGroups = useMyGroupsQuery("");
  const { isAddMember } = useSelector((state) => state.misc);
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [GroupName, setGroupName] = useState("");
  const [UpdateGroupName, setUpdateGroupName] = useState("");
  const [IsEditGroup, setIsEditGroup] = useState(false);
  const [confirmLeaveDialog, setConfirmLeaveDialog] = useState(false);
  const [members, setMembers] = useState([]);

  //-----------------------------------------

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setUpdateGroupName(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName("");
      setUpdateGroupName("");
      setMembers([]);
      setIsEditGroup(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const handleEditGroupName = () => {
    setIsEditGroup(false);
    updateGroup("Updating Group Name", {
      chatId,
      name: UpdateGroupName,
    });
  };
  const openConfirmLeave = () => setConfirmLeaveDialog(true);
  const closeConfirmLeave = () => setConfirmLeaveDialog(false);

  const handleAddMembers = () => {
    dispatch(setIsAddMember(true));
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing member", { chatId, userId });
  };

  const LeaveGroupHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmLeave();
    navigate("/groups");
  };
  //-----------------------------------------

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
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={"3rem"}
      spacing={"1rem"}
    >
      {IsEditGroup ? (
        <>
          <TextField
            value={UpdateGroupName}
            onChange={(e) => {
              setUpdateGroupName(e.target.value);
            }}
          />
          <IconButton
            onClick={handleEditGroupName}
            disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{GroupName}</Typography>
          <IconButton
            onClick={() => setIsEditGroup(true)}
            disabled={isLoadingGroupName}
          >
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

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid item sm={4} sx={{ display: { xs: "none", sm: "block" } }}>
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
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
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members  */}
              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded={true}
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog ChatId={chatId} />
        </Suspense>
      )}
      {/* Confirm Leave Dialog */}
      {confirmLeaveDialog && (
        <Suspense fallback={<Backdrop open />}>
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
        <GroupList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        backgroundColor: "bisque",
        height: "100vh",
        overflow: "auto",
        padding: "1rem",
      }}
    >
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
