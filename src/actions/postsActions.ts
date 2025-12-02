import type { ThunkAction } from "@reduxjs/toolkit";
import type {
  Post,
  GetPostsAction,
  GetPostsSuccessAction,
  GetPostsFailureAction,
  PostsAction,
  RootState,
} from "../types";

//Create Redux action types
export const GET_POSTS = "GET_POSTS" as const;
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS" as const;
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE" as const;

//create redux action creators that return an action
export const getPosts = (): GetPostsAction => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts: Post[]): GetPostsSuccessAction => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = (): GetPostsFailureAction => ({
  type: GET_POSTS_FAILURE,
});

type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  PostsAction
>;

//asychronous thunk
export const fetchPosts = (): AppThunk => {
  return async dispatch => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = (await response.json()) as Post[];

      dispatch(getPostsSuccess(data));
    } catch {
      dispatch(getPostsFailure());
    }
  };
}
