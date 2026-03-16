export interface LoginPayload {
  username: string;
  password: string;
}

export type RegisterPayload = {
  username: string;
  password: string;
  profileImage?: File | null;
};

export interface UpdateProfilePayload {
  username: string;
  profileImage?: string | null;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface LogoutPayload {
  refreshToken?: string;
}
