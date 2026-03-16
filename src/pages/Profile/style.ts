import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css({
      backgroundColor: theme.palette.background.default,
      height: "100%",
      padding: "2rem",
    }),
    button: css({
      position: "fixed",
      top: "10rem",
      left: "10rem",
    }),
    title: css({
      fontWeight: "bold",
    }),
  };
};
