import type { Post } from "../../types";

export interface PostProps {
  post: Post;
  onClick?: () => void;
}
