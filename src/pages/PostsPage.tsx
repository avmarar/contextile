import type { FC } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../actions/postsActions";
import { Posts } from "../components/Posts";
import type { RootState } from "../types";
import type { AppDispatch } from "../store";

const PostsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, posts, hasErrors } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    void dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;
    return posts.map(post => <Posts key={post.id} post={post} />);
  };

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  );
};

export default PostsPage;
