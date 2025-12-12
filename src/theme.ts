import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "64px !important",
          padding: "16px !important",
        },
      },
    },
  },
});
