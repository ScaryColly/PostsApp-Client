import type {
  SearchPostsRequest,
  SearchPostsResponse,
  SearchPostsValidationError,
} from "../types/postSearch";
import { ApiError, apiClient } from "./apiClient";

export type SearchPostsErrorCode =
  | "validation"
  | "unauthorized"
  | "server"
  | "network"
  | "unknown";

export class SearchPostsError extends Error {
  code: SearchPostsErrorCode;
  status?: number;
  details?: Record<string, string>;

  constructor(
    message: string,
    code: SearchPostsErrorCode,
    status?: number,
    details?: Record<string, string>,
  ) {
    super(message);
    this.name = "SearchPostsError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const mapSearchPostsError = (error: unknown): SearchPostsError => {
  if (error instanceof SearchPostsError) {
    return error;
  }

  if (error instanceof ApiError) {
    if (error.status === 400) {
      const body = (error.responseBody ?? {}) as SearchPostsValidationError;
      return new SearchPostsError(
        body.error || "Invalid search request",
        "validation",
        400,
        body.details,
      );
    }

    if (error.status === 401) {
      return new SearchPostsError("Unauthorized", "unauthorized", 401);
    }

    if (error.status >= 500) {
      return new SearchPostsError(
        "Failed to search posts",
        "server",
        error.status,
      );
    }

    return new SearchPostsError(error.message, "unknown", error.status);
  }

  if (error instanceof Error && error.message.startsWith("Network error:")) {
    return new SearchPostsError(
      "Network error. Please try again.",
      "network",
      undefined,
    );
  }

  return new SearchPostsError("Search failed", "unknown", undefined);
};

export const searchPosts = async (
  payload: SearchPostsRequest,
): Promise<SearchPostsResponse> => {
  try {
    return await apiClient.post<SearchPostsResponse>("/posts/search", payload);
  } catch (error) {
    throw mapSearchPostsError(error);
  }
};
