import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "../../../requests/comments";

export const useGetCommentsByPostId = (postId?: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId!),
    enabled: !!postId,
  });
};
