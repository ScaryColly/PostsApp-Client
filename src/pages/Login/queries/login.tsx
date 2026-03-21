import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import type { LoginPayload } from "../../../types/auth";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      await login(payload);
    },
  });
};