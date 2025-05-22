import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UserItem from "../shared/UserItem.jsx";
import { useAsyncMutation, useErrors } from "../../hooks/hook.jsx";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api.js";
import { useSelector, useDispatch } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc.js";
const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );

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
  const closeHandler = () => dispatch(setIsAddMember(false));

  const addMemberSubmitHandler = () => {
    addMembers("Adding Members", {
      chatId,
      members: selectedMembers,
    });
    closeHandler();
  };
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member </DialogTitle>
        <Stack spacing={"1rem"} padding={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button variant="outlined" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Add Members
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
