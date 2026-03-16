import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getMe,
  googleLogin as googleLoginRequest,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  updateMe as updateMeRequest,
} from "../requests/auth";
import type { LoginPayload } from "../types/auth";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (formData: FormData) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshCurrentUser: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "user";
const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

const saveAuthData = (
  user: User,
  accessToken: string,
  refreshToken: string,
) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

const saveUserOnly = (user: User) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const clearAuthData = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    clearAuthData();
    return null;
  }
};

const mapUserFromAuthResponse = (response: any): User => {
  return {
    _id: response._id,
    username: response.username,
    email: response.email,
    profileImage: response.profileImage,
    authProvider: response.authProvider,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  const refreshCurrentUser = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    if (!accessToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getMe();
      setUser(currentUser);
      saveUserOnly(currentUser);
    } catch {
      clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshCurrentUser();
  }, []);

  const login = async (payload: LoginPayload) => {
    const response = await loginRequest(payload);
    const userData = mapUserFromAuthResponse(response);

    saveAuthData(userData, response.accessToken, response.refreshToken);
    setUser(userData);
  };

  const register = async (formData: FormData) => {
    const response = await registerRequest(formData);
    const userData = mapUserFromAuthResponse(response);

    saveAuthData(userData, response.accessToken, response.refreshToken);
    setUser(userData);
  };

  const googleLogin = async (idToken: string) => {
    const response = await googleLoginRequest(idToken);
    const userData = mapUserFromAuthResponse(response);

    saveAuthData(userData, response.accessToken, response.refreshToken);
    setUser(userData);
  };

  const updateProfile = async (formData: FormData) => {
    const updatedUser = await updateMeRequest(formData);
    setUser(updatedUser);
    saveUserOnly(updatedUser);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) || "";

    try {
      await logoutRequest({ refreshToken });
    } catch {
      // ignore
    } finally {
      clearAuthData();
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      googleLogin,
      logout,
      refreshCurrentUser,
      updateProfile,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};