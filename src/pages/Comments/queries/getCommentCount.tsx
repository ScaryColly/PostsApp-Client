import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "../../../requests/comments";

export const useGetCommentCount = (postId?: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostId(postId!),
    select: (data) => data.length,
    enabled: !!postId,
  });
};
