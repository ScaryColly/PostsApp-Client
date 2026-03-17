import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    container: css({
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "min(92vw, 560px)",
      maxHeight: "90vh",
      overflowY: "auto",
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.text.primary}`,
      boxShadow: theme.shadows[24],
      borderRadius: 12,
      padding: theme.spacing(3),
      direction: "rtl",
    }),
    header: css({
      marginBottom: theme.spacing(2),
      fontSize: "2rem",
      fontWeight: "bold",
    }),
    viewContent: css({
      whiteSpace: "pre-wrap",
      lineHeight: 1.6,
    }),
    form: css({
      display: "grid",
      gap: theme.spacing(2),
      marginTop: theme.spacing(2),
    }),
    footer: css({
      display: "flex",
      justifyContent: "flex-end",
      gap: theme.spacing(1),
      marginTop: theme.spacing(2),
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
    previewImage: css({
      width: "100%",
      maxHeight: "18rem",
      objectFit: "cover",
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    }),
  };
};
