import { css } from "@emotion/css";
import { useTheme } from "@mui/material";

export const useStyles = () => {
  const theme = useTheme();

  return {
    outerContainer: css({
      backgroundColor: theme.palette.background.default,
      height: "100%",
      padding: "2rem",
    }),
    searchForm: css({
      marginTop: "1rem",
      marginBottom: "1rem",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "0.75rem",
      padding: "1rem",
      border: `1px solid ${theme.palette.divider}`,
    }),
    searchGrid: css({
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "0.75rem",
    }),
    fallbackBanner: css({
      marginBottom: "1rem",
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
