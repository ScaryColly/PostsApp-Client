import { css } from "@emotion/css";

export const useStyles = () => {
  return {
    box: css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 1rem",
    }),
    navItem: css({
      textDecoration: "none",
      fontSize: "1rem",
      "&:hover": {
        textDecoration: "underline",
      },
    }),
    title: css({
      fontFamily: "'Rubik Dirt', cursive",
      fontSize: "2rem",
      fontWeight: "bold",
    }),
  };
};
