import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, type UpsertPost } from "../../../requests/posts";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: UpsertPost) => createPost(post),
    onSuccess: async () => {
      console.log("Post created successfully");
      await queryClient.refetchQueries({ queryKey: ["posts"] });
    },
  });
};
