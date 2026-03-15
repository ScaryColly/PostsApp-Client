import type { Post } from "../types";
import { apiClient } from "./apiClient";

export const getAllPosts = async () => {
  return apiClient.get<Post[]>("/posts");
};
