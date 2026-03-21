import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

export const useGoogleRegister = () => {
  const { googleRegister } = useAuth();

  return useMutation({
    mutationFn: async (idToken: string) => {
      await googleRegister(idToken);
    },
  });
};