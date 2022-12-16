import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useState } from "react";
import { MdDownload, MdLoop } from "react-icons/md";
import AxiosContext from "../contexts/axios.context";

const tarjimon = (text) => {
  const shartnomalar = [
    { value: "vadalashuv", name: "Vadalashuv" },
    { value: "vakillikShartnomasi", name: "Vakillik shartnomasi" },
    { value: "qarzOldiBerdiShartnomasi", name: "Qarz oldi-berdi shartnomasi" },
    { value: "qarzToLanishShartnomasi", name: "Qarz to'lanish shartnomasi" },
    {
      value: "investorNomidanTovarSotibOlish",
      name: "Investor nomidan tovarlarni sotib olish shartnomasi",
    },
    { value: "tovarOlinganiXabari", name: "Tovar olingani xabari" },
    { value: "nasiyaShartnomasi", name: "Nasiya shartnomasi" },
  ];
  const tarjima = shartnomalar.find(
    (shartnoma) => shartnoma.value === text
  ).name;
  return tarjima;
};

const UploadFile = (props) => {
  const [shartnoma] = useState(props.shartnoma);
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
          await Request("/files/upload", "POST", {
            to: props.user._id,
            file_type: shartnoma.file_type,
            file_for: props.invest.investitsiya_turi,
            document: res.data.result.document,
            investitsiya_id: props.invest._id,
          });
          props.setReload(Date.now());
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      maxWidth="lg"
    >
      <Typography>{tarjimon(shartnoma.file_type)}</Typography>
      {!shartnoma.file_link ? (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <input type="file" onChange={uploadFile} />
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
            href={shartnoma.file_link}
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
            <Typography>{shartnoma.file_name}</Typography>
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
  );
};

export default UploadFile;
