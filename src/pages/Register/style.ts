import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    stack: css({
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      width: "100%",
      minHeight: "90.5vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      overflow: "hidden",
      boxSizing: "border-box",
      height: "100%",
    }),

    paper: css({
      width: "100%",
      maxWidth: "32rem",
      maxHeight: "85vh",
      padding: "1.5rem",
      borderRadius: "1.5rem",
      boxSizing: "border-box",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
    }),

    form: css({
      width: "100%",
    }),

    contentStack: css({
      width: "100%",
      gap: "0.9rem",
    }),

    avatarSection: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
    }),

    avatar: css({
      width: "4.8rem",
      height: "4.8rem",
      fontSize: "1.5rem",
    }),

    uploadButton: css({
      fontSize: "0.9rem",
      padding: "0.35rem 0.9rem",
    }),

    title: css({
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      lineHeight: 1.1,
      marginBottom: "0.35rem",
    }),

    subtitle: css({
      textAlign: "center",
      marginBottom: "0.75rem",
      fontSize: "0.95rem",
    }),

    input: css({
      "& .MuiInputBase-root": {
        minHeight: "3.1rem",
      },
    }),

    submitButton: css({
      minHeight: "3rem",
      fontSize: "1rem",
      fontWeight: 600,
    }),

    googleWrapper: css({
      display: "flex",
      justifyContent: "center",
      transform: "scale(0.95)",
      transformOrigin: "center",
    }),

    bottomText: css({
      textAlign: "center",
      fontSize: "0.95rem",
      marginTop: "0.2rem",
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
