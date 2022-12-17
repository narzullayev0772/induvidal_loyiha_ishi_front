import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MdUpload } from "react-icons/md";
import RecipeReviewCard from "../components/post";
import AxiosContext from "../contexts/axios.context";

const Upload = () => {
  const [blobImage, setBlobImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [text, setText] = useState("");
  const [file_link, setFileLink] = useState(null);
  const { Request } = useContext(AxiosContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [disabled, setDisabled] = useState(true);
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBlobImage(reader.result);
    };
    const formData = new FormData();
    formData.append("file", file);
    const res = await Request("/api/upload", "POST", formData);
    setFileLink(res.data.data.url);
    setDisabled(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
      }}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await Request(`/api/posts/${user._id}`, "POST", {
          title: text,
          content: file_link,
          user,
        });
        if (res.status === 201) {
          e.target.reset();
          window.location.href = "/";
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
          }}
        >
          <input
            style={{
              width: "100%",
              height: "60vh",
              zIndex: 3,
              opacity: 0,
            }}
            name="image"
            type="file"
            accept="image/*"
            onChange={uploadFile}
          />
          <Box
            sx={{
              border: "1px dashed #ccc",
              width: "100%",
              height: "60vh",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              color: "#0088cc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MdUpload size={"3rem"} />
            <Typography sx={{ ml: "1rem" }}>
              {blobImage ? fileName : "Faylni tanlang"}
            </Typography>
          </Box>
        </Box>
        <TextField
          label="Izoh"
          fullWidth
          multiline
          rows={4}
          placeholder="Izoh..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          name="text"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "2rem",
          width: "100%",
        }}
      >
        <RecipeReviewCard
          disabled={true}
          post={{
            title: text,
            content: blobImage,
            user,
          }}
        />
        <Button
          variant="contained"
          disabled={disabled}
          type="submit"
          color="primary"
          sx={{
            width: "max-content",
          }}
        >
          Yuborish
        </Button>
      </Box>
    </Box>
  );
};

export default Upload;
