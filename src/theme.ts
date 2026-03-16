import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#161616",
      contrastText: "#F3E8FF",
    },
    secondary: {
      main: "#F3E8FF",
      contrastText: "#161616",
    },
    background: {
      default: "#F3E8FF",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Playpen Sans Hebrew", sans-serif',
  },
});
