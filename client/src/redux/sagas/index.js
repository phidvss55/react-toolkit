import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

/**
 * basically, this is look like async function
 * title different is we put the * symboy instead of the async keyword
 * this is convention when write a function generator
 * @param {*} action
 */
function* fetchPostsaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (err) {
    console.log("INTERNAL_SERVER_ERROR", err);
    yield put(actions.getPosts.getPostsFailure(err));
  }
}

function* createPostSaga(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    console.log("post created", post);
    yield put(actions.createPost.createPostSuccess(post.data));
  } catch (err) {
    console.log("INTERNAL_SERVER_ERROR", err);
    yield put(actions.createPost.createPostFailure(err));
  }
}

function* updatePostSaga(action) {
  try {
    const post = yield call(api.updatePost, action.payload);
    console.log("post updated", post);
    yield put(actions.updatePost.updatePostSuccess(post.data));
  } catch (err) {
    console.log("INTERNAL_SERVER_ERROR", err);
    yield put(actions.updatePost.updatePostFailure(err));
  }
}

function* deletePostSaga(action) {
  try {
    yield call(api.deletePost, action.payload);
    yield put(actions.deletePost.deletePostSuccess(action.payload));
  } catch (err) {
    console.log("INTERNAL_SERVER_ERROR", err);
    yield put(actions.deletePost.deletePostFailure(err));
  }
}

function* mySaga() {
  /**
   * param 1: maybe a string (name of a action) or name of a function
   * param 2: a function to handle when a action happen
   */
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
}

// generator function es6

export default mySaga;
