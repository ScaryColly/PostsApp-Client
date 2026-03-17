import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchPosts, SearchPostsError } from "../../../requests/postSearch";

export type UsePostSearchParams = {
  query: string;
  page: number;
  limit?: number;
};

export const getPostSearchResetKey = (query: string) => {
  return JSON.stringify({
    query: query.trim(),
  });
};

export const usePostSearchQuery = ({
  query,
  page,
  limit = 20,
}: UsePostSearchParams) => {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ["posts", "search", trimmedQuery, page, limit],
    queryFn: () =>
      searchPosts({
        query: trimmedQuery,
        page,
        limit,
      }),
    enabled: trimmedQuery.length > 0,
    placeholderData: keepPreviousData,
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
