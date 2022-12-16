import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FullCardContext } from "../contexts/fullcard.context";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { MdDelete, MdPersonAdd } from "react-icons/md";
import AddUser from "../components/addUser";
import { useContext, useEffect, useState } from "react";
import AxiosContext from "../contexts/axios.context";
import DialogContext from "../contexts/dialog.context";
import Mydialog from "../components/mydialog";
import { SnackbarContext } from "../contexts/snackbar.context";
import Invests from "../components/investitsiyalar";

export default function UsersTable() {
  const { setFullCard, setFullCardComponent } = useContext(FullCardContext);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { Request } = useContext(AxiosContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    Request("/api/users", "GET").then((res) => {
      setRows(res.data);
    });
  }, [reload]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          my: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<MdPersonAdd />}
          onClick={() => {
            setFullCard(true);
            setFullCardComponent(<AddUser setReload={setReload} />);
          }}
        >
          Investor Qo'shish
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#ccc",
              }}
            >
              <TableCell>Investorlar</TableCell>
              <TableCell align="right">Investitsiyalar</TableCell>
              <TableCell align="right">Telegram</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">O'chirish</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:odd": {
                      backgroundColor: "#00000010",
                    },
                    "&:hover": {
                      backgroundColor: "#00000010",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption">
                      Jami({row.investitsiyalar.length}) :
                    </Typography>
                    <Tooltip title="Ko'rish">
                      <IconButton
                        variant="contained"
                        size="small"
                        onClick={() => {
                          openDialog(
                            <Invests
                              investor={row}
                              closeDialog={closeDialog}
                              setReload={setReload}
                            />,
                            true
                          );
                        }}
                      >
                        💲
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="right"></TableCell>
                  <TableCell align="right">
                    <IconButton
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        openDialog(
                          <Mydialog
                            title={"Rostdan ham o'chirishni istaysizmi?"}
                            onNo={closeDialog}
                            onYes={async () => {
                              try {
                                await Request(
                                  `/all/users/${row._id}`,
                                  "DELETE"
                                );
                                setReload((prev) => prev + 1);
                                closeDialog();
                                handleSnackbarOpen({
                                  message: "O'chirildi",
                                  severity: "success",
                                });
                              } catch (error) {
                                console.log(error);
                                handleSnackbarOpen({
                                  message: "Xatolik yuz berdi",
                                  severity: "error",
                                });
                              }
                            }}
                          />
                        );
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
