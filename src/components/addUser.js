import { Box, Button, Container, TextField } from "@mui/material";
import { useContext, useState } from "react";
import AxiosContext from "../contexts/axios.context";
import { FullCardContext } from "../contexts/fullcard.context";
import { SnackbarContext } from "../contexts/snackbar.context";

const AddUser = ({ setReload }) => {
  const [json, setJson] = useState({});
  const { Request } = useContext(AxiosContext);
  const { setFullCard } = useContext(FullCardContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
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
          await Request("/auth/register", "POST", json);
          setFullCard(false);
          setReload(Date.now());
          handleSnackbarOpen({
            message: "Qo'shildi",
            severity: "success",
          });
        }}
      >
        <TextField
          label="Ismi"
          variant="outlined"
          onChange={(e) =>
            setJson({
              ...json,
              name: e.target.value,
            })
          }
        />
        <TextField
          label="Telefon raqami"
          variant="outlined"
          onChange={(e) =>
            setJson({
              ...json,
              phone: e.target.value,
            })
          }
        />
        <TextField
          label="login"
          variant="outlined"
          onChange={(e) =>
            setJson({
              ...json,
              login: e.target.value,
            })
          }
        />
        <TextField
          label="password"
          variant="outlined"
          onChange={(e) =>
            setJson({
              ...json,
              password: e.target.value,
            })
          }
        />

        <Button type="submit" variant="contained">
          Saqlash
        </Button>
      </Box>
    </Container>
  );
};

export default AddUser;
