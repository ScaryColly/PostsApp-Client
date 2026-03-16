import { css } from "@emotion/css";

export const useStyles = () => {
  return {
    avatarTitle: css({
      fontSize: "0.7rem",
      color: "gray",
      "&:hover": {
        cursor: "pointer",
      },
    }),
    postContainer: css({
      padding: "1rem",
      borderRadius: "1rem",
      width: "50vw",
      maxWidth: "100%",
    }),
    title: css({
      fontWeight: 600,
    }),
  };
};
