import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../../../requests/posts";

export const useGetPostsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserId(userId),
  });
};
