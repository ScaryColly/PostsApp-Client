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
}: PostProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.postContainer}>
      <Stack direction="row" alignItems="center">
        <Stack>
          <UserAvatar username={username} />
          <Typography className={classes.avatarTitle} gutterBottom>
            {username}
          </Typography>
        </Stack>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" gutterBottom>
        {content}
      </Typography>
    </Paper>
  );
};
