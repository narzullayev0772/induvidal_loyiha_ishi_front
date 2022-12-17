import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setReload }) => {
  const [json, setJson] = useState({});
  const [error, setError] = useState(null);

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 400,
        height: "100vh",
      }}
    >
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
          width: "100%",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await axios.post(
            process.env.REACT_APP_API + "/api/auth/register",
            json
          );
          if (res.status === 201) {
            window.location.href = "/login";
          } else {
            setError(res.data.response);
          }
        }}
      >
        <Typography textAlign={"center"}>Register</Typography>
        <Typography textAlign={"center"} color={"tomato"}>
          {error}
        </Typography>

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
          label="username"
          variant="outlined"
          onChange={(e) =>
            setJson({
              ...json,
              username: e.target.value,
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
        <Link
          to={"/login"}
          style={{
            color: "#0088cc",
            textAlign: "center",
          }}
        >
          Go SignIn
        </Link>
      </Box>
    </Container>
  );
};

export default Register;
