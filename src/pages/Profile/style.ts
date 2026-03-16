import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    outerContainer: css({
      backgroundColor: theme.palette.background.default,
      minHeight: "calc(100vh - 4.5rem)",
      padding: "0.75rem 1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      boxSizing: "border-box",
    }),

    pageWrapper: css({
      width: "100%",
      maxWidth: "52rem",
      display: "flex",
      justifyContent: "center",
    }),

    paper: css({
      width: "100%",
      borderRadius: "2rem",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }),

    banner: css({
      height: "5rem",
      backgroundColor: theme.palette.secondary.main,
    }),

    avatarSection: css({
      marginTop: "-2.4rem",
      padding: "0 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),

    avatarWrapper: css({
      position: "relative",
      width: "5.5rem",
      height: "5.5rem",
    }),

    avatar: css({
      width: "5.5rem !important",
      height: "5.5rem !important",
      border: `0.22rem solid ${theme.palette.background.paper}`,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
      fontSize: "1.8rem !important",
    }),

    avatarEditButton: css({
      position: "absolute",
      top: "0.1rem",
      right: "0",
      width: "2rem",
      height: "2rem",
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.primary.main,
    }),

    hiddenInput: css({
      display: "none",
    }),

    title: css({
      marginTop: "0.7rem",
      fontSize: "1.6rem",
      fontWeight: "bold",
      color: theme.palette.primary.main,
      textAlign: "center",
    }),

    subtitle: css({
      marginTop: "0.3rem",
      fontSize: "0.9rem",
      color: theme.palette.primary.main,
      opacity: 0.7,
      textAlign: "center",
    }),

    content: css({
      padding: "0.9rem 1rem 1rem",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
    }),

    sectionCard: css({
      borderRadius: "1.5rem",
      padding: "0.9rem",
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.secondary.main}`,
      boxSizing: "border-box",
    }),

    sectionTitle: css({
      fontWeight: 700,
      fontSize: "1rem",
      color: theme.palette.primary.main,
      marginBottom: "0.4rem",
    }),

    infoRow: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.3rem 0",
    }),

    infoLeft: css({
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
    }),

    infoIconBox: css({
      width: "2.1rem",
      height: "2.1rem",
      borderRadius: "0.7rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    }),

    infoLabel: css({
      fontWeight: 600,
      color: theme.palette.primary.main,
      opacity: 0.75,
      fontSize: "0.9rem",
    }),

    infoValue: css({
      fontWeight: 700,
      color: theme.palette.primary.main,
      fontSize: "0.9rem",
    }),

    divider: css({
      borderColor: theme.palette.secondary.main,
      margin: "0.1rem 0",
    }),

    statsGrid: css({
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "0.6rem",
    }),

    /* -------- STAT CARD (HALF SIZE) -------- */

    statCard: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
      minHeight: "4rem",   // חצי מהגובה הקודם
      padding: "0.5rem",
      borderRadius: "1rem",
      backgroundColor: theme.palette.secondary.main,
      textAlign: "center",
    }),

    statIconBox: css({
      width: "1.9rem",
      height: "1.9rem",
      borderRadius: "0.6rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.main,
    }),

    statValue: css({
      fontSize: "0.95rem",
      fontWeight: 800,
      color: theme.palette.primary.main,
      lineHeight: 1,
    }),

    statLabel: css({
      fontSize: "0.75rem",
      color: theme.palette.primary.main,
      opacity: 0.75,
      lineHeight: 1,
    }),

    formNote: css({
      fontSize: "0.85rem",
      opacity: 0.7,
      color: theme.palette.primary.main,
    }),

    textField: css({
      "& .MuiOutlinedInput-root": {
        borderRadius: "0.9rem",
        backgroundColor: theme.palette.background.paper,
      },
    }),

    actionsRow: css({
      display: "flex",
      gap: "0.6rem",
      flexWrap: "wrap",
      paddingTop: "0.2rem",
    }),

    primaryButton: css({
      borderRadius: "999px",
      padding: "0.65rem 1rem",
      fontWeight: 700,
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.contrastText} !important`,
      flex: 1,
    }),

    secondaryButton: css({
      borderRadius: "999px",
      padding: "0.65rem 1rem",
      fontWeight: 700,
      borderColor: `${theme.palette.primary.main} !important`,
      color: `${theme.palette.primary.main} !important`,
      flex: 1,
    }),
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

  };
};

