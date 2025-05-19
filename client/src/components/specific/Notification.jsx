import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useGetNotificationQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useSelector ,useDispatch} from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import { useAcceptFriendRequestMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hook";
import toast from "react-hot-toast";
const Notification = () => {
  const dispatch = useDispatch();
  const {isNotification} =useSelector((state) => state.misc);
  const { isLoading, data, error, isError } = useGetNotificationQuery();
  
  const [acceptRequest]=useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
      try {
        const res= await acceptRequest({ requestId:_id, accept });
        if(res?.data?.success){
          toast.success(res?.data?.message);

        }
        else {
          toast.error(res?.data?.error || "Something went wrong");
        }
      } catch (error) {
         toast.error("Something went wrong");
         console.log(error);
      }
  };
  useErrors([{ error, isError }]);
  const handleCloseNotifiacation = () => {
    dispatch(setIsNotification(false));
  }
  return (
    <Dialog open={isNotification} onClose={handleCloseNotifiacation}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}> No notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notification;
