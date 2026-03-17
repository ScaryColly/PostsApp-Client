import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment, type UpdateComment } from "../../../requests/comments";

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateComment) => updateComment(payload),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};
