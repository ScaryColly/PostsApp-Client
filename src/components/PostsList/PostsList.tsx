import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Post as PostType } from "../../types";
import { Post } from "../Post";

const DEFAULT_PAGE_SIZE = 5;

type PostsListProps = {
  posts: PostType[];
  onPostClick?: (post: PostType) => void;
  pageSize?: number;
};

export const PostsList = ({
  posts,
  onPostClick,
  pageSize = DEFAULT_PAGE_SIZE,
}: PostsListProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [visiblePostsCount, setVisiblePostsCount] = useState(pageSize);

  const clampedVisibleCount = Math.min(visiblePostsCount, posts.length);
  const visiblePosts = useMemo(
    () => posts.slice(0, clampedVisibleCount),
    [posts, clampedVisibleCount],
  );
  const hasMorePosts = clampedVisibleCount < posts.length;

  useEffect(() => {
    if (!hasMorePosts || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setVisiblePostsCount((previousCount) =>
          Math.min(previousCount + pageSize, posts.length),
        );
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMorePosts, pageSize, posts.length]);

  if (posts.length === 0) {
    return <Typography>עוד לא פורסמו פוסטים</Typography>;
  }

  return (
    <Stack alignItems="center" gap={5} mt={4}>
      {visiblePosts.map((post) => (
        <Post key={post.id} post={post} onClick={() => onPostClick?.(post)} />
      ))}
      {hasMorePosts && (
        <Box ref={loadMoreRef} sx={{ py: 2 }}>
          <CircularProgress size={28} />
        </Box>
      )}
    </Stack>
  );
};
