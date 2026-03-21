import type { Post } from "../types";
import { apiClient } from "./apiClient";

export interface PostFormValues {
  title: string;
  content: string;
  imageFile?: File | null;
}

export interface UpsertPost extends PostFormValues {
  createdBy: string;
  createdAt?: string;
}

const toPostFormData = (post: UpsertPost) => {
  const formData = new FormData();

  formData.append("title", post.title);
  formData.append("content", post.content);
  formData.append("createdBy", post.createdBy);

  if (post.createdAt) {
    formData.append("createdAt", post.createdAt);
  }

  if (post.imageFile) {
    formData.append("image", post.imageFile);
  }

  return formData;
};

export const getAllPosts = async () => {
  return apiClient.get<Post[]>("/posts");
};

export const updatePost = async (postId: string, post: UpsertPost) => {
  return apiClient.put<Post>(`/posts/${postId}`, toPostFormData(post));
};

export const createPost = async (post: UpsertPost) => {
  return apiClient.post<Post>("/posts", toPostFormData(post));
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

export const likePost = async (postId: string, userId: string) => {
  return apiClient.post<Post>(`/posts/${postId}/like`, { userId });
};

export const unlikePost = async (postId: string, userId: string) => {
  return apiClient.delete<Post>(`/posts/${postId}/like`, {
    body: { userId },
  });
};
