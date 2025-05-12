import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { sampleusers } from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
const AddMemberDialog = ({ addMember, isLoadingAddMembers, ChatId }) => {
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };
  const [members, setMembers] = useState(sampleusers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const closeHandler = () => {
    selectMemberHandler([]);
    setMembers(sampleusers);
  };
  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member </DialogTitle>
        <Stack spacing={"1rem"} padding={"1rem"}>
          {members.length ? (
            members.map((user) => (
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
