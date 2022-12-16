import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AxiosContext from "../contexts/axios.context";
import DialogContext from "../contexts/dialog.context";
import { SnackbarContext } from "../contexts/snackbar.context";

const Connector = ({ users, _id, setReload }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const { Request } = useContext(AxiosContext);
  const { closeDialog } = useContext(DialogContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Request("/auth/connect_telegram", "POST", {
      user_id: selectedUser,
      _id,
    });
    setReload(Date.now());
    closeDialog();
    handleSnackbarOpen({
      message: "Telegramga ulandi",
      severity: "success",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 2,
        padding: 2,
        gap: 2,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" textAlign={"center"}>
        Telegramga ulash
      </Typography>
      <Select
        fullWidth
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        required
      >
        {users.map((user, index) => (
          <MenuItem key={index} value={user.id}>
            {user.first_name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" type="submit">
        Ulash
      </Button>
    </Box>
  );
};

export default Connector;
