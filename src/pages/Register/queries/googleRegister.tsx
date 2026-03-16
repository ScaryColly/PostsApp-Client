import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

export const useGoogleRegister = () => {
  const { googleLogin } = useAuth();

  return useMutation({
    mutationFn: (idToken: string) => googleLogin(idToken),
  });
};
