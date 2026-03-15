import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../requests/posts";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};
