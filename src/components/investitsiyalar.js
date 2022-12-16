import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { read, utils } from "xlsx";
import AxiosContext from "../contexts/axios.context";
import { SnackbarContext } from "../contexts/snackbar.context";
import User from "../components/user";
import { FullCardContext } from "../contexts/fullcard.context";

const Invests = ({ setReload, investor, closeDialog }) => {
  const { Request } = useContext(AxiosContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const [disabled, setDisabled] = useState(true);
  const { setFullCard, setFullCardComponent } = useContext(FullCardContext);
  const excelReader = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, {
        header: 1,
      });
      const invests = data.map((invest) => {
        return {
          investitsiya_turi: invest[0],
          investitsiya_summasi: invest[1],
          investitsiya_muddati: invest[2],
          start_date: invest[3],
          end_date: invest[4],
          investitsiya_status: invest[5],
          investitsiya_total: invest[6],
          investitsiya_foyda: invest[7],
        };
      });
      const res = await Request(
        `/all/users/${investor._id}/addInvest`,
        "PUT",
        invests
      );
      closeDialog();
      if (res.status === 200)
        handleSnackbarOpen({
          message: "Investitsiyalar saqlandi",
          severity: "success",
        });
      else
        handleSnackbarOpen({
          message: "Xatolik ro'y berdi! Investitsiyalar saqlanmadi",
          severity: "error",
        });
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "center",
      }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const file = formData.get("excel-file");
        excelReader(file);
        setReload(Date.now());
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="body1" width={"inherit"}>
          {investor.name}ning investitsiyalari
        </Typography>
        <input
          type="file"
          name="excel-file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => {
            if (e.target.files[0]) setDisabled(false);
          }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#ccc",
            padding: 1,
            borderBottom: "1px solid #e0e0e0",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            width={"inherit"}
            textTransform="capitalize"
          >
            Investitsiya
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Kiritilgan Summa
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Sotilgan Tovarlar
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Ko'rilgan foyda
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Kelishilgan muddat
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Boshlanishi
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Tugashi
          </Typography>
          <Typography variant="caption" width={"inherit"}>
            Status
          </Typography>
        </Box>
        {investor.investitsiyalar.map((invest, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: index % 2 !== 0 ? "#f5f5f5" : "#fff",
              padding: 1,
              borderBottom: "1px solid #e0e0e0",
              textAlign: "center",
            }}
            onClick={() => {
              setFullCard(true);
              setFullCardComponent(
                <User user={investor} setReload={setReload} invest={invest} />
              );
            }}
          >
            <Typography
              variant="caption"
              width={"inherit"}
              textTransform="capitalize"
            >
              {invest.investitsiya_turi}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.investitsiya_summasi}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.investitsiya_total}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.investitsiya_foyda}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.investitsiya_muddati}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.start_date}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.end_date}
            </Typography>
            <Typography variant="caption" width={"inherit"}>
              {invest.investitsiya_status === "active" ? "✅" : "❌"}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button type="submit" variant="contained" fullWidth disabled={disabled}>
        Saqlash
      </Button>
    </Box>
  );
};

export default Invests;
