import { Dialog, IconButton } from "@mui/material";
import { useContext } from "react";
import DialogContext from "../contexts/dialog.context";
import { MdClose } from "react-icons/md";

const MyDialog = () => {
  const { open, dialogComponent, closeDialog, fullScreen } =
    useContext(DialogContext);
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
    >
      {fullScreen && (
        <IconButton
          onClick={closeDialog}
          sx={{
            position: "fixed",
            top: "0%",
            left: "50%",
            backgroundColor: "#0088cc",
          }}
        >
          <MdClose />
        </IconButton>
      )}

      {dialogComponent}
    </Dialog>
  );
};

export default MyDialog;
