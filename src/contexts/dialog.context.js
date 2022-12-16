import { createContext, useState } from "react";

const DialogContext = createContext();

export default DialogContext;

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [dialogComponent, setDialogComponent] = useState(null);

  const openDialog = (component, fullScreen) => {
    setDialogComponent(component);
    setOpen(true);
    setFullScreen(fullScreen);
  };

  const closeDialog = () => {
    setDialogComponent(null);
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        dialogComponent,
        openDialog,
        closeDialog,
        fullScreen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
