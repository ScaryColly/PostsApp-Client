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
    title: css({
      fontWeight: "bold",
    }),
    commentCard: css({
      padding: "1rem",
      borderRadius: "0.75rem",
      width: "100%",
    }),
    commentContent: css({
      marginTop: "0.25rem",
    }),
    authorLabel: css({
      fontSize: "0.75rem",
      color: "gray",
    }),
    noComments: css({
      color: "gray",
      textAlign: "center",
      marginTop: "2rem",
    }),
    input: css({
      direction: "rtl",
      "& .MuiInputLabel-root": {
        right: theme.spacing(3),
        left: "auto",
        transformOrigin: "top right",
      },
      "& .MuiInputBase-input": {
        direction: "rtl",
        textAlign: "right",
      },
      "& .MuiOutlinedInput-notchedOutline legend": {
        textAlign: "right",
      },
    }),
  };
};
