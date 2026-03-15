import { Button, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { Post } from "../../components";
import { useGetAllPosts } from "./queries/getAllPosts";
import { useStyles } from "./style";

export const Posts = () => {
  const classes = useStyles();
  const { data: posts = [], isLoading } = useGetAllPosts();

  return (
    <Stack className={classes.outerContainer}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          כל הפוסטים
        </Typography>
        <Tooltip placement="top" title="הוספת פוסט חדש">
          <Button variant="contained">+</Button>
        </Tooltip>
      </Stack>
      {isLoading && <Skeleton variant="rectangular" height={200} />}
      {posts.length === 0 ? (
        <Typography>עוד לא פורסמו פוסטים</Typography>
      ) : (
        <Stack alignItems="center" gap={5} mt={4}>
          {posts.map((post) => (
            <Post {...{ post }} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
