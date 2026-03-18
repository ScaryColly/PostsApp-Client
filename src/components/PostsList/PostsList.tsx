import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Post } from "../Post";
import type { PostsListProps } from "./types";

const DEFAULT_PAGE_SIZE = 5;

export const PostsList = ({
  posts,
  onPostClick,
  onEditClick,
  onDeleteClick,
  pageSize = DEFAULT_PAGE_SIZE,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: PostsListProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [visiblePostsCount, setVisiblePostsCount] = useState(pageSize);

  const clampedVisibleCount = Math.min(visiblePostsCount, posts.length);
  const visiblePosts = useMemo(
    () => posts.slice(0, clampedVisibleCount),
    [posts, clampedVisibleCount],
  );
  const hasMoreLocalPosts = clampedVisibleCount < posts.length;
  const shouldRenderLoadTrigger = hasMoreLocalPosts || hasMore;

  useEffect(() => {
    if (!shouldRenderLoadTrigger || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        if (hasMoreLocalPosts) {
          setVisiblePostsCount((previousCount) =>
            Math.min(previousCount + pageSize, posts.length),
          );
          return;
        }

        if (hasMore && !isLoadingMore) {
          onLoadMore?.();
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [
    shouldRenderLoadTrigger,
    hasMoreLocalPosts,
    hasMore,
    isLoadingMore,
    onLoadMore,
    pageSize,
    posts.length,
  ]);

  if (posts.length === 0) {
    return <Typography>עוד לא פורסמו פוסטים</Typography>;
  }

  return (
    <Stack alignItems="center" gap={5} mt={4}>
      {visiblePosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onClick={() => onPostClick?.(post)}
          onEditClick={() => onEditClick?.(post)}
          onDeleteClick={() => onDeleteClick?.(post)}
          isEditable={Boolean(onEditClick || onDeleteClick)}
        />
      ))}
      {shouldRenderLoadTrigger && (
        <Box ref={loadMoreRef} sx={{ py: 2 }}>
          <CircularProgress size={28} />
        </Box>
      )}
    </Stack>
  );
};
