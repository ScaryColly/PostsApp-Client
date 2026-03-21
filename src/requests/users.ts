import type { User } from "../types";
import { apiClient } from "./apiClient";

export const getUserById = async (userId: string) => {
  return apiClient.get<User>(`/users/${userId}`);
};
