export type AuthProvider = "local" | "google";

export type User = {
  _id: string;
  username: string;
  email: string;
  profileImage?: string | null;
  authProvider: AuthProvider;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = User & {
  accessToken: string;
  refreshToken: string;
};