import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#161616",
      contrastText: "#FDE6FF",
    },
    secondary: {
      main: "#FDE6FF",
      contrastText: "#161616",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"DynaPuff", "Helvetica", "Arial", sans-serif',
  },
});
