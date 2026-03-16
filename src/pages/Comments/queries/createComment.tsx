import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, type CreateComment } from "../../../requests/comments";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateComment) => createComment(payload),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};
