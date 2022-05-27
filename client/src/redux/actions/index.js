import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (error) => error,
});

/**
 * return value object
 * {
 *  type: 'getPostsRequest',
 *  payload: undefined, //value return of this function
 * }
 */

export const createPost = createActions({
  createPostRequest: (payload) => payload,
  createPostSuccess: (payload) => payload,
  createPostFailure: (error) => error,
});

export const updatePost = createActions({
  updatePostRequest: (payload) => payload,
  updatePostSuccess: (payload) => payload,
  updatePostFailure: (error) => error,
});

export const deletePost = createActions({
  deletePostRequest: (payload) => payload,
  deletePostSuccess: (payload) => payload,
  deletePostFailure: (error) => error,
});

export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");
