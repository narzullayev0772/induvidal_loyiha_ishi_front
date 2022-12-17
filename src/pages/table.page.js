import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import { MdDelete, MdLoop } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import AxiosContext from "../contexts/axios.context";
import DialogContext from "../contexts/dialog.context";
import Mydialog from "../components/mydialog";
import { SnackbarContext } from "../contexts/snackbar.context";
import UpdateUser from "../components/update";

export default function UsersTable() {
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { Request } = useContext(AxiosContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    Request("/api/users", "GET").then((res) => {
      setRows(res.data.data);
    });
  }, [reload]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Posts count</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        {rows?.length > 0 && (
          <TableBody>
            {rows.map((row, index) => (
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
                  <Typography variant="caption">{row.posts.length}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography
                    variant="caption"
                    sx={{
                      padding: "2px 10px",
                      border: "1px solid orange",
                      borderRadius: "15px",
                    }}
                  >
                    {row.role}
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => {
                    openDialog(<UpdateUser user={row} />);
                  }}
                >
                  <IconButton variant="contained" color="warning" size="small">
                    <MdLoop />
                  </IconButton>
                </TableCell>
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
                              await Request(`/api/users/${row._id}`, "DELETE");
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
        )}
      </Table>
    </TableContainer>
  );
}
