import type { User } from "./user";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdBy: User;
};
