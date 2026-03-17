import type { Comment } from "../../types";

export interface CommentProps {
  comment: Comment;
  canEdit?: boolean;
  isSaving?: boolean;
  onEdit?: (commentId: string, message: string) => Promise<void> | void;
}
