import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    page: css({
      maxHeight: "90vh",
      backgroundColor: "#fcfbff",
      direction: "rtl",
    }),

    heroSection: css({
      backgroundColor: theme.palette.secondary.main,
      padding: "1rem 1.5rem 1rem",
      borderBottomLeftRadius: "2rem",
      borderBottomRightRadius: "2rem",
      position: "relative",
      overflow: "hidden",

      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 15% 25%, rgba(170,140,220,0.14) 0%, transparent 22%), radial-gradient(circle at 85% 20%, rgba(170,140,220,0.12) 0%, transparent 20%)",
        pointerEvents: "none",
      },
    }),

    container: css({
      maxWidth: "70rem",
      margin: "0 auto",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    }),

    title: css({
      fontSize: "clamp(2rem, 5vw, 3.6rem)",
      fontWeight: 800,
      color: "#1d1733",
      marginBottom: "1rem",
      lineHeight: 1.15,
      letterSpacing: "-0.03em",
    }),

    subtitle: css({
      fontSize: "clamp(1rem, 2vw, 1.35rem)",
      fontWeight: 600,
      color: "#4d3f73",
      marginBottom: "0.9rem",
      lineHeight: 1.7,
    }),

    description: css({
      maxWidth: "48rem",
      margin: "0 auto",
      fontSize: "1rem",
      color: "#5f5a6d",
      lineHeight: 1.9,
    }),

    actionsRow: css({
      marginTop: "2rem",
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    }),

    primaryButton: css({
      backgroundColor: "#7c6cf2 !important",
      color: "#ffffff !important",
      borderRadius: "0.95rem !important",
      padding: "0.8rem 1.8rem !important",
      fontSize: "1rem !important",
      fontWeight: "700 !important",
      boxShadow: "0 0.5rem 1.5rem rgba(124, 108, 242, 0.24) !important",
      textTransform: "none !important",
      minWidth: "11rem",

      "&:hover": {
        backgroundColor: "#6d5ce8 !important",
      },
    }),

    secondaryButton: css({
      color: "#6f5de7 !important",
      border: "1.5px solid #cfc4f6 !important",
      backgroundColor: "rgba(255,255,255,0.72) !important",
      borderRadius: "0.95rem !important",
      padding: "0.8rem 1.8rem !important",
      fontSize: "1rem !important",
      fontWeight: "700 !important",
      textTransform: "none !important",
      minWidth: "11rem",

      "&:hover": {
        backgroundColor: "#ffffff !important",
        borderColor: "#b9aaf2 !important",
      },
    }),

    searchSection: css({
      maxWidth: "70rem",
      margin: "0 auto",
      padding: "2.5rem 1.5rem 1rem",
      textAlign: "center",
    }),

    sectionTitle: css({
      fontSize: "1.1rem",
      fontWeight: 700,
      color: "#342a52",
      marginBottom: "1rem",
    }),

    searchBox: css({
      maxWidth: "42rem",
      margin: "0 auto",

      "& .MuiOutlinedInput-root": {
        borderRadius: "1rem",
        backgroundColor: "#ffffff",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ddd3f8",
      },

      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#c8baf5",
      },

      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7c6cf2",
        borderWidth: "2px",
      },

      "& .MuiInputBase-input": {
        textAlign: "right",
        padding: "0.95rem 1rem",
      },
    }),

    secondaryContainer: css({
      maxWidth: "75rem",
      margin: "0 auto",
      padding: "2.5rem 1.5rem 1rem",
    }),

    secondaryTitle: css({
      textAlign: "center",
      fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
      fontWeight: 800,
      color: "#1f1735",
      marginBottom: "2rem",
      lineHeight: 1.2,
    }),

    cardsGrid: css({
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "1.25rem",

      [theme.breakpoints.down("lg")]: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },

      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    }),

    card: css({
      backgroundColor: "#ffffff",
      border: "1px solid #efe7fb",
      borderRadius: "1.4rem",
      padding: "1.5rem 1.25rem",
      boxShadow: "0 0.5rem 1.5rem rgba(110, 89, 180, 0.08)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",

      "&:hover": {
        transform: "translateY(-0.2rem)",
        boxShadow: "0 0.9rem 2rem rgba(110, 89, 180, 0.12)",
      },
    }),

    cardTitle: css({
      fontSize: "1.2rem",
      fontWeight: 800,
      color: "#2d2345",
      marginBottom: "0.75rem",
    }),

    cardDescription: css({
      fontSize: "0.98rem",
      color: "#6d667d",
      lineHeight: 1.8,
      maxWidth: "16rem",
      margin: "0 auto",
    }),

    howItWorksSection: css({
      maxWidth: "75rem",
      margin: "0 auto",
      padding: "3rem 1.5rem 4rem",
    }),

    stepsGrid: css({
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "1.25rem",

      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
    }),

    stepCard: css({
      background: "linear-gradient(180deg, #ffffff 0%, #faf7ff 100%)",
      border: "1px solid #ede4fb",
      borderRadius: "1.5rem",
      padding: "1.7rem 1.2rem",
      textAlign: "center",
      boxShadow: "0 0.5rem 1.5rem rgba(129, 108, 199, 0.08)",
    }),

    stepNumber: css({
      width: "3rem",
      height: "3rem",
      margin: "0 auto 1rem",
      borderRadius: "50%",
      backgroundColor: "#eee7ff",
      color: "#6f5de7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: "1.25rem",
    }),

    stepText: css({
      fontSize: "1.02rem",
      fontWeight: 700,
      color: "#3d315d",
      lineHeight: 1.8,
    }),
  };
};