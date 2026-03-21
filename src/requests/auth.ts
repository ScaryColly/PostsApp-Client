import type { LoginPayload, RegisterPayload } from "../types/auth";
import type { User } from "../types/user";
import { apiClient } from "./apiClient";

export type AuthResponse = User & {
  accessToken: string;
  refreshToken: string;
};

export type LogoutPayload = {
  refreshToken: string;
};

export const login = async (payload: LoginPayload) => {
  return apiClient.post<AuthResponse>("/users/login", payload);
};

export const register = async (payload: RegisterPayload) => {
  const formData = new FormData();
  formData.append("username", payload.username);
  formData.append("password", payload.password);

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  return apiClient.post<AuthResponse>("/users/register", formData);
};

export const googleRegisterRequest = async (idToken: string) => {
  return apiClient.post<AuthResponse>("/users/google-register", { idToken });
};

export const googleLogin = async (idToken: string) => {
  return apiClient.post<AuthResponse>("/users/google-login", { idToken });
};

export const getMe = async () => {
  return apiClient.get<User>("/users/me");
};

export const updateMe = async (formData: FormData) => {
  return apiClient.put<User>("/users/me", formData);
};

export const logout = async (payload: LogoutPayload) => {
  return apiClient.post<{ message: string }>("/users/logout", payload);
};

export const refreshToken = async (refreshTokenValue: string) => {
  return apiClient.post<{ accessToken: string; refreshToken: string }>(
    "/users/refresh",
    { refreshToken: refreshTokenValue },
  );
};