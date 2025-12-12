import { useEffect } from "react";
import { useAuthStore } from "@hooks/useAuthStore";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { theme } from "@/theme";

function App() {
  const setUserId = useAuthStore((state) => state.setUserId);

  useEffect(() => {
    const fetchedId = "user_999";
    setUserId(fetchedId);
  }, [setUserId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
