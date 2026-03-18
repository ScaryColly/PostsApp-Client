import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPosts, SearchPostsError } from "../../../requests/postSearch";

export type UsePostSearchParams = {
  query: string;
  limit?: number;
};

export const getPostSearchResetKey = (query: string) => {
  return JSON.stringify({
    query: query.trim(),
  });
};

export const usePostSearchQuery = ({
  query,
  limit = 20,
}: UsePostSearchParams) => {
  const trimmedQuery = query.trim();

  return useInfiniteQuery({
    queryKey: ["posts", "search", trimmedQuery, limit],
    queryFn: ({ pageParam = 1 }) =>
      searchPosts({
        query: trimmedQuery,
        page: pageParam,
        limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled: trimmedQuery.length > 0,
    staleTime: 15_000,
    retry: (attemptCount, error) => {
      if (error instanceof SearchPostsError) {
        return (
          error.code !== "validation" &&
          error.code !== "unauthorized" &&
          attemptCount < 2
        );
      }

      return attemptCount < 2;
    },
  });
};
