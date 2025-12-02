export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type GetPostsAction = {
  type: "GET_POSTS";
};

export type GetPostsSuccessAction = {
  type: "GET_POSTS_SUCCESS";
  payload: Post[];
};

export type GetPostsFailureAction = {
  type: "GET_POSTS_FAILURE";
};

export type PostsAction =
  | GetPostsAction
  | GetPostsSuccessAction
  | GetPostsFailureAction;

export type PostsState = {
  posts: Post[];
  loading: boolean;
  hasErrors: boolean;
};

export type RootState = {
  posts: PostsState;
};
