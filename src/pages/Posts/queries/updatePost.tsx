import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, type UpsertPost } from "../../../requests/posts";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: UpsertPost;
    }) => updatePost(postId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
