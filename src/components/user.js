import { Box, Container, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { MdDownload, MdLoop } from "react-icons/md";
import AxiosContext from "../contexts/axios.context";
import UploadFile from "./uploadFile";

const User = ({ user, setReload, invest }) => {
  const { Request } = useContext(AxiosContext);
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("document", e.target.files[0]);
    try {
      axios
        .post(
          "https://api.telegram.org/bot5676790367:AAGU5-Mi7WFDt6O4a4Rd7LjjY2TFCNgpZi4/sendDocument?chat_id=-1001522786434",
          formData
        )
        .then(async (res) => {
          await Request("/files/hisobot_rasmi", "POST", {
            to: user._id,
            document: res.data.result.document,
            investitsiya_id: invest._id,
          });
          setReload(Date.now());
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography>{user.name}ga tegishli ma'lumotlar</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          maxWidth="lg"
        >
          <Typography>Hisobot Rasmi</Typography>
          {invest.hisobot_rasmi === "" ? (
            <Box
              sx={{
                position: "relative",
              }}
            >
              <input type="file" onChange={uploadFile} accept="image/*" />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <a
                href={invest.hisobot_rasmi}
                download
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#0088cc",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <MdDownload />
                <Typography>{invest.hisobot_rasmi}</Typography>
              </a>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    opacity: 0,
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                  onChange={uploadFile}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    left: 0,
                    zIndex: "-1",
                    cursor: "pointer",
                    color: "orange",
                  }}
                >
                  <MdLoop />
                </IconButton>
              </Box>
            </Box>
          )}
        </Container>
        {invest.shartnomalar.map((shartnoma, index) => (
          <UploadFile
            key={index}
            shartnoma={shartnoma}
            user={user}
            setReload={setReload}
            invest={invest}
          />
        ))}
      </Box>
    </>
  );
};

export default User;
