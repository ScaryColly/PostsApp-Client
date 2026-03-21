import type { PostFormValues } from "../../requests/posts";
import type { Post } from "../../types";

export interface PostModalProps {
  isOpen: boolean;
  handleClose: () => void;
  post?: Post;
  isEditMode?: boolean;
  onCreatePost?: (post: PostFormValues) => void;
  onEditPost?: (postId: string, post: PostFormValues) => void;
  isSubmitting?: boolean;
}
