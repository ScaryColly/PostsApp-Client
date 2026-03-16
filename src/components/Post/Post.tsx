import { Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { UserAvatar } from "../UserAvatar";
import { useStyles } from "./style";
import type { PostProps } from "./types";

export const Post: FC<PostProps> = ({
  post: {
    title,
    content,
    createdBy: { username },
  },
  onClick,
}: PostProps) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={2}
      className={classes.postContainer}
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : "default" }}
    >
      <Stack direction="row" alignItems="center">
        <Stack>
          <UserAvatar username={username} />
          <Typography className={classes.avatarTitle}>{username}</Typography>
        </Stack>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" gutterBottom>
        {content}
      </Typography>
    </Paper>
  );
};
