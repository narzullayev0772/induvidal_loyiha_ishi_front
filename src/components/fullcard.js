import { Box, IconButton } from "@mui/material";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { FullCardContext } from "../contexts/fullcard.context";

const FullCard = () => {
  const { fullCardComponent, fullCard, setFullCard } =
    useContext(FullCardContext);
  return (
    <Box
      sx={{
        backgroundColor: "#f1f1f190",
        backdropFilter: "blur(10px)",
        position: "absolute",
        top: 0,
        left: 0,
        transform: fullCard ? "translateY(0)" : "translateY(-100%)",
        zIndex: fullCard ? 1401 : -1,
        opacity: fullCard ? 1 : 0,
        transition: "all 0.6s ease-in-out",
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1202,
          }}
          onClick={() => {
            setFullCard(false);
          }}
        >
          <MdClose />
        </IconButton>
      </Box>
      <Box p={2}>{fullCardComponent}</Box>
    </Box>
  );
};

export default FullCard;
