import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import type { RegisterPayload } from "../../../types/auth";

export const useRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      navigate("/profile");
    },
  });
};
