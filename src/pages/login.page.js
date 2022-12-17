import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.target);
            const json = Object.fromEntries(formData);
            const { data } = await axios.post(
              process.env.REACT_APP_API + "/api/auth/login",
              json
            );

            login(data.token, data.data);

            window.location.href = "/";
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Login"
          variant="outlined"
          size="small"
          name="username"
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          name="password"
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Link
          to={"/register"}
          style={{
            color: "#0088cc",
            textAlign: "center",
          }}
        >
          Go SignUp
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
