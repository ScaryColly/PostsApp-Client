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
    postImage: css({
      width: "100%",
      maxHeight: "22rem",
      objectFit: "contain",
      display: "block",
      borderRadius: "0.75rem",
      marginTop: "0.5rem",
      border: "1px solid #e0e0e0",
      backgroundColor: "#f7f7f7",
    }),
  };
};
