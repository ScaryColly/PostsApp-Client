import type { Post } from "../../types";

export interface PostsListProps {
  posts: Post[];
  onPostClick?: (post: Post) => void;
  onEditClick?: (post: Post) => void;
  onDeleteClick?: (post: Post) => void;
  pageSize?: number;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}
