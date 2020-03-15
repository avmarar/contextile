//Create Redux action types
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

//create redux action creators that return an action
export const getPosts = () => ({
  type: GET_POSTS
});

export const getPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  payload: posts
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE
});

//asychronous thunk
export function fetchPosts() {
  return async dispatch => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      dispatch(getPostsSuccess(data));
    } catch {
      dispatch(getPostsFailure());
    }
  };
}
