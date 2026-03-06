import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css({
      backgroundColor: theme.palette.secondary.main,
      padding: "5rem",
      color: theme.palette.secondary.contrastText,
      minHeight: "20vh",
    }),
    title: css({
      fontFamily: "'Rubik Dirt', cursive",
      fontSize: "2rem",
      fontWeight: "bold",
    }),
    secondaryContainer: css({
      padding: "1rem",
    }),
    secondaryTitle: css({
      fontFamily: "sans-serif",
      fontSize: "1.8rem",
      fontWeight: "bold",
    }),
  };
};
