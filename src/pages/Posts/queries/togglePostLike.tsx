import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "../../../requests/posts";

export const useTogglePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      userId,
      isLiked,
    }: {
      postId: string;
      userId: string;
      isLiked: boolean;
    }) => (isLiked ? unlikePost(postId, userId) : likePost(postId, userId)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
