import type { Post } from "../../types";

export interface PostProps {
  post: Post;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  isEditable?: boolean;
}
