import type { PostsAction, PostsState } from "../types";
import * as actions from "../actions/postsActions";

export const initialState: PostsState = {
  posts: [],
  loading: false,
  hasErrors: false,
};

export default function postsReducer(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case actions.GET_POSTS:
      return { ...state, loading: true };
    case actions.GET_POSTS_SUCCESS:
      return { posts: action.payload, loading: false, hasErrors: false };
    case actions.GET_POSTS_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}
