import { createContext, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarComponent, setSnackbarComponent] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbarComponent(null);
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (component) => {
    setSnackbarComponent(component);
    setSnackbarOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarOpen,
        snackbarComponent,
        handleSnackbarClose,
        handleSnackbarOpen,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
