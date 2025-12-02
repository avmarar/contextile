import type { FC } from "react";
import type { Post } from "../types";

type PostsProps = {
  post: Post;
};

export const Posts: FC<PostsProps> = ({ post }) => (
  <article className="post-excerpt">
    <h2>{post.title}</h2>
    <p>{post.body.substring(0, 100)}</p>
  </article>
);
