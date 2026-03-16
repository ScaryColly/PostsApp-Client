import type { Post } from "../types";
import { apiClient } from "./apiClient";

export interface PostFormValues {
  title: string;
  content: string;
}

export interface UpsertPost extends PostFormValues {
  createdBy: string;
}

export const getAllPosts = async () => {
  return apiClient.get<Post[]>("/posts");
};

export const updatePost = async (postId: string, post: UpsertPost) => {
  return apiClient.put<Post>(`/posts/${postId}`, post);
};

export const createPost = async (post: UpsertPost) => {
  return apiClient.post<Post>("/posts", post);
};

export const deletePost = async (postId: string) => {
  return apiClient.delete<void>(`/posts/${postId}`);
};

export const getPostsByUserId = async (userId: string) => {
  return apiClient.get<Post[]>(`/posts?createdBy=${userId}`);
};

export const getCommentCount = async (postId: string) => {
  return apiClient.get<number>(`/posts/${postId}/comments/count`);
};
