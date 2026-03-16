import type { Comment } from "../types";
import { apiClient } from "./apiClient";

export interface CommentFormValues {
  message: string;
}

export interface CreateComment extends CommentFormValues {
  postId: string;
  createdBy: string;
}

export const getCommentsByPostId = async (postId: string) => {
  return apiClient.get<Comment[]>(`/posts/${postId}/comments`);
};

export const createComment = async (comment: CreateComment) => {
  return apiClient.post<Comment>("/comments", comment);
};

export const deleteComment = async (postId: string, commentId: string) => {
  return apiClient.delete<void>(`/posts/${postId}/comments/${commentId}`);
};
