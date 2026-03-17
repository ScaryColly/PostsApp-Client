import type { Comment } from "../types";
import { apiClient } from "./apiClient";

export interface CommentFormValues {
  message: string;
}

export interface CreateComment extends CommentFormValues {
  postId: string;
  createdBy: string;
}

export interface UpdateComment extends CommentFormValues {
  postId: string;
  commentId: string;
}

export const getCommentsByPostId = async (postId: string) => {
  return apiClient.get<Comment[]>(`/posts/${postId}/comments`);
};

export const createComment = async (comment: CreateComment) => {
  return apiClient.post<Comment>("/comments", comment);
};

export const updateComment = async ({ commentId, message }: UpdateComment) => {
  return apiClient.put<Comment>(`comments/${commentId}`, {
    message,
  });
};

export const deleteComment = async (postId: string, commentId: string) => {
  return apiClient.delete<void>(`/posts/${postId}/comments/${commentId}`);
};
