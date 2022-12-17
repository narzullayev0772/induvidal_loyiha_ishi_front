import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import AxiosContext from "../contexts/axios.context";
import { SnackbarContext } from "../contexts/snackbar.context";
import DialogContext from "../contexts/dialog.context";

const UpdateUser = ({ setReload, user }) => {
  const { Request } = useContext(AxiosContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const { closeDialog } = useContext(DialogContext);
  return (
    <Container maxWidth="md">
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get("name");
          const phone = formData.get("phone");
          const role = formData.get("role") === "on" ? "admin" : "user";

          await Request(`/api/users/${user._id}`, "PUT", {
            name,
            phone,
            role,
          });
          closeDialog();
          handleSnackbarOpen({
            message: "o'zgartirildi",
            severity: "success",
          });
        }}
      >
        <TextField
          label="Ismi"
          variant="outlined"
          value={user.name}
          name="name"
        />
        <TextField
          label="Telefon raqami"
          variant="outlined"
          value={user?.phone}
          name="phone"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>Admin qilish</Typography>
          <Checkbox name="role" defaultChecked={user.role === "admin"} />
        </Box>

        <Button type="submit" variant="contained">
          Saqlash
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateUser;
