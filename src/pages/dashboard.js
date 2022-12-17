import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { MdClose, MdMenu } from "react-icons/md";
import {
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import FullCard from "../components/fullcard";
import MyDialog from "../components/dialog";
import { SnackbarContext } from "../contexts/snackbar.context";
import category from "../links";
import { HiMoon, HiSun } from "react-icons/hi";
import { useContext, useState } from "react";
import AccountMenu from "../components/account";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent({ child, setThemeMode, themeMode }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { snackbarOpen, snackbarComponent, handleSnackbarClose } =
    useContext(SnackbarContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MdMenu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {child.name}
            </Typography>
            <IconButton
              onClick={() => {
                setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
              }}
            >
              {themeMode !== "light" ? (
                <HiMoon
                  style={{
                    color: "#fff",
                  }}
                />
              ) : (
                <HiSun style={{ color: "#f0c14b" }} />
              )}
            </IconButton>
            <AccountMenu user={user} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MdClose />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {category.map((e, index) => {
              return (
                e.can__see.includes(user.role) && (
                  <Tooltip title={e.name} key={index} placement="right-end">
                    <Link
                      to={e.link}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <ListItem
                        sx={{
                          background:
                            e.link === window.location.pathname && "#0088cc20",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "#0088cc",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          {e.icon}
                        </ListItemIcon>
                        <ListItemText primary={e.name} />
                      </ListItem>
                    </Link>
                  </Tooltip>
                )
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {child.component}
          </Container>
        </Box>
      </Box>
      <FullCard />
      <MyDialog />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarComponent?.severity}
          sx={{ width: "100%" }}
        >
          {snackbarComponent?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default function Dashboard({ child }) {
  const [themeMode, setThemeMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <DashboardContent
        child={child}
        setThemeMode={setThemeMode}
        themeMode={themeMode}
      />
    </ThemeProvider>
  );
}
