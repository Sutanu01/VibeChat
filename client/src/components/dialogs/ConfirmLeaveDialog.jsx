import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const ConfirmLeaveDialog = ({ open, handleClose, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Leave Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to leave this group? You can always rejoin
          later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteHandler} color="error" autoFocus>
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLeaveDialog;
