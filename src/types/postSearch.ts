import type { Post } from "./post";

export type SearchSort = "relevance" | "newest";

export type PostSearchFilters = {
  createdBy?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type SearchPostsRequest = {
  query: string;
  page?: number;
  limit?: number;
  sort?: SearchSort;
  filters?: PostSearchFilters;
};

export type SearchPostsResponse = {
  items: Post[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  meta: {
    fallbackUsed: boolean;
    sortApplied: SearchSort;
    filtersApplied: PostSearchFilters;
    parsedIntent: {
      keywords: string[];
      mustInclude: string[];
      exclude: string[];
      createdBy: string | null;
      dateFrom: string | null;
      dateTo: string | null;
      sortBy: SearchSort;
    };
  };
};

export type SearchPostsValidationError = {
  error: string;
  details?: Record<string, string>;
};
