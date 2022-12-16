import { Box, Button, Divider, Typography } from "@mui/material";

const Mydialog = ({ title, onYes, onNo }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "center",
      }}
    >
      <Typography>{title}</Typography>
      <Divider
        sx={{
          width: "100%",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button onClick={onYes}>Ha</Button>
        <Button onClick={onNo}>Yoq</Button>
      </Box>
    </Box>
  );
};

export default Mydialog;
