import {
  AppBar,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { X } from "lucide-react";
import CustomButton from "./Button";
import { BUTTON_VARIANT } from "../../enums";
import { forwardRef, type ReactElement, type ReactNode, type Ref } from "react";

interface IProps {
  title: string;
  fullScreen?: boolean;
  open: number;
  children: ReactNode;
  setOpen: (value: number) => void;
  handleSave?: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = (props: IProps) => {
  const {
    title,
    fullScreen = false,
    open,
    children,
    setOpen,
    handleSave,
  } = props;

  const handleClose = () => setOpen(-1);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open >= 0}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#D54545" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <X />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            {handleSave && (
              <CustomButton
                variant={BUTTON_VARIANT.CONTAINED}
                btnText="Save"
                style={{
                  width: "max-content",
                  background: "white !important",
                  color: "#D54545 !important",
                  fontSize: 16,
                  fontWeight: 500,
                }}
                onClick={handleSave}
              />
            )}
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{ p: 3 }}>
          {children}
        </Grid>
      </Dialog>
    </>
  );
};

export default FullScreenDialog;
