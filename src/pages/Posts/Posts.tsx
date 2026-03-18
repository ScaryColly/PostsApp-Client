import {
  Alert,
  Box,
  Button,
  Link,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsList } from "../../components";
import { PostModal } from "../../components/PostModal/PostModal";
import { useAuth } from "../../context/AuthContext";
import { SearchPostsError } from "../../requests/postSearch";
import type { PostFormValues, UpsertPost } from "../../requests/posts";
import { useCreatePost } from "./queries/createPost";
import { useGetAllPosts } from "./queries/getAllPosts";
import { usePostSearchQuery } from "./queries/usePostSearchQuery";
import { useStyles } from "./style";

const SEARCH_PAGE_LIMIT = 20;

export const Posts = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const classes = useStyles();

  const { data: posts = [], isLoading } = useGetAllPosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryInput, setQueryInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();

  const {
    data: searchData,
    isFetching: isSearching,
    isPending: isSearchPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: searchError,
    refetch: retrySearch,
  } = usePostSearchQuery({
    query: activeQuery,
    limit: SEARCH_PAGE_LIMIT,
  });

  useEffect(() => {
    const error = searchError;
    if (error instanceof SearchPostsError && error.code === "unauthorized") {
      void logout().finally(() => {
        navigate("/login");
      });
    }
  }, [searchError, logout, navigate]);

  const validationErrors =
    searchError instanceof SearchPostsError && searchError.code === "validation"
      ? (searchError.details ?? {})
      : {};

  const isSearchMode = activeQuery.trim().length > 0;
  const searchItems = useMemo(
    () => searchData?.pages.flatMap((pageResult) => pageResult.items) ?? [],
    [searchData],
  );
  const postsToRender = isSearchMode ? searchItems : posts;
  const hasSearchFallback = Boolean(
    searchData?.pages.some((pageResult) => pageResult.meta.fallbackUsed),
  );
  const shouldShowLoading = isSearchMode
    ? (isSearchPending || isSearching) && searchItems.length === 0
    : isLoading || isCreatingPost;

  const openCreatePostModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreatePost = (post: PostFormValues) => {
    const newPost: UpsertPost = {
      ...post,
      createdBy: user?._id || "",
      createdAt: new Date().toISOString(),
    };

    addPost(newPost);
  };

  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setActiveQuery(queryInput.trim());
  };

  const handleSearchReset = () => {
    setQueryInput("");
    setActiveQuery("");
  };

  return (
    <Stack className={classes.outerContainer}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={classes.title} variant="h4" gutterBottom>
          כל הפוסטים
        </Typography>
        {!!user && (
          <Tooltip placement="top" title="הוספת פוסט חדש">
            <Button variant="contained" onClick={openCreatePostModal}>
              +
            </Button>
          </Tooltip>
        )}
      </Stack>
      {!user && (
        <Typography
          className={classes.secondaryText}
          variant="body1"
          color="textSecondary"
        >
          אנא{" "}
          <Link className={classes.link} onClick={() => navigate("/login")}>
            התחבר/י
          </Link>{" "}
          כדי ליצור פוסטים, לבצע חיפוש חכם ולגשת לכל הפיצ'רים
        </Typography>
      )}
      {!!user && (
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          className={classes.searchForm}
        >
          <Stack className={classes.searchGrid}>
            <TextField
              label="חיפוש פוסטים"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              error={Boolean(validationErrors.query)}
              helperText={validationErrors.query}
              required
              fullWidth
              className={classes.input}
              size="small"
            />
          </Stack>
          <Stack direction="row" gap={1.5} mt={2}>
            <Button type="submit" variant="contained">
              חפש
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleSearchReset}
            >
              נקה
            </Button>
          </Stack>
        </Box>
      )}
      {hasSearchFallback && (
        <Alert severity="info" className={classes.fallbackBanner}>
          שימוש בפרשנות חיפוש חלופית
        </Alert>
      )}
      {searchError instanceof SearchPostsError &&
        searchError.code !== "validation" &&
        searchError.code !== "unauthorized" && (
          <Alert
            severity="error"
            action={
              isSearchMode ? (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => void retrySearch()}
                >
                  נסה שוב
                </Button>
              ) : undefined
            }
          >
            חיפוש הפוסטים נכשל. אנא נסה שוב.
          </Alert>
        )}
      {shouldShowLoading ? (
        <Skeleton variant="rounded" height={200} />
      ) : (
        <PostsList
          posts={postsToRender}
          hasMore={isSearchMode ? Boolean(hasNextPage) : false}
          isLoadingMore={isSearchMode ? isFetchingNextPage : false}
          onLoadMore={
            isSearchMode
              ? () => {
                  void fetchNextPage();
                }
              : undefined
          }
        />
      )}
      {isSearchMode && (
        <Stack alignItems="center" justifyContent="center" mt={2} gap={1}>
          {!hasNextPage && searchItems.length > 0 && (
            <Typography color="text.secondary">הגעת לסוף התוצאות</Typography>
          )}
        </Stack>
      )}
      <PostModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        onCreatePost={handleCreatePost}
        isSubmitting={isCreatingPost}
      />
    </Stack>
  );
};
