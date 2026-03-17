import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

export const useGoogleLogin = () => {
  const { googleLogin } = useAuth();

  return useMutation({
    mutationFn: async (idToken: string) => {
      await googleLogin(idToken);
    },
  });
};