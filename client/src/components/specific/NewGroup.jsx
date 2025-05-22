import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
const NewGroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Select at least one member");

    newGroup("Creating New Group", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };
  const closeHandler = () => dispatch(setIsNewGroup(false));

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant={"outlined"}
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoadingNewGroup}
            variant={"contained"}
            size="large"
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
