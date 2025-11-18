import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./Button";
import { BUTTON_VARIANT } from "../../enums";

interface IProps {
  open: number;
  setOpen: (value: number) => void;
  handleConfirm: () => void;
}

const DeletePopup = (props: IProps) => {
  const { open, setOpen, handleConfirm } = props;

  const handleClose = () => setOpen(-1);

  return (
    <Dialog
      open={open > 0}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          By Confirming this, This Record will be removed from everywhere. You
          are not able to undo it. Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          btnText="No"
          variant={BUTTON_VARIANT.OUTLINED}
          style={{ width: "max-content" }}
          onClick={handleClose}
        />
        <CustomButton
          btnText="Confirm"
          style={{ width: "max-content" }}
          onClick={handleConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
