import {
  Alert,
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(1);

  const { mutateAsync: addPost, isPending: isCreatingPost } = useCreatePost();

  const {
    data: searchData,
    isFetching: isSearching,
    isPending: isSearchPending,
    error: searchError,
    refetch: retrySearch,
  } = usePostSearchQuery({
    query: activeQuery,
    page,
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
  const postsToRender = isSearchMode ? (searchData?.items ?? []) : posts;
  const hasSearchFallback = Boolean(searchData?.meta.fallbackUsed);
  const canGoToNextSearchPage = Boolean(searchData?.hasMore);
  const canGoToPreviousSearchPage = page > 1;
  const shouldShowLoading = isSearchMode
    ? isSearchPending || isSearching
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
    setPage(1);
  };

  const handleSearchReset = () => {
    setQueryInput("");
    setActiveQuery("");
    setPage(1);
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
        <PostsList posts={postsToRender} />
      )}
      {isSearchMode && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={2}
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() =>
              setPage((previousPage) => Math.max(1, previousPage - 1))
            }
            disabled={!canGoToPreviousSearchPage || isSearching}
          >
            Previous
          </Button>
          <Typography>Page {searchData?.page || page}</Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((previousPage) => previousPage + 1)}
            disabled={!canGoToNextSearchPage || isSearching}
          >
            Next
          </Button>
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
