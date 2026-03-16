import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../../requests/posts";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
