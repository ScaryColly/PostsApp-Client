import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    stack: css({
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      height: "100%",
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
      fontFamily: '"Playpen Sans Hebrew", sans-serif',
      fontSize: "1.8rem",
      fontWeight: "bold",
    }),
  };
};
