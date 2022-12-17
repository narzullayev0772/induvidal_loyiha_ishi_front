import { Routes, Route } from "react-router-dom";
import { AxiosProvider } from "./contexts/axios.context";
import { DialogProvider } from "./contexts/dialog.context";
import { FullCardProvider } from "./contexts/fullcard.context";
import { SnackbarProvider } from "./contexts/snackbar.context";
import category from "./links";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login.page";
import Register from "./pages/register.page";

export default function App() {
  const me = JSON.parse(localStorage.getItem("user"));
  if (me === null || me === undefined) {
    localStorage.setItem("user", JSON.stringify({ role: "guest" }));
  }
  const role = JSON.parse(localStorage.getItem("user")).role;

  return (
    <Routes>
      {category.map((item, index) => {
        return (
          item.can__see.includes(role) && (
            <Route
              key={index}
              path={item.link}
              element={
                <FullCardProvider>
                  <AxiosProvider>
                    <DialogProvider>
                      <SnackbarProvider>
                        <Dashboard child={item} />
                      </SnackbarProvider>
                    </DialogProvider>
                  </AxiosProvider>
                </FullCardProvider>
              }
            />
          )
        );
      })}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
