import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../requests/users";

export const useGetUserById = (userId?: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId as string),
    enabled: !!userId,
  });
};
