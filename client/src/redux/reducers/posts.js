import { INIT_STATE } from "../../constant";
import {
  createPost,
  deletePost,
  getPosts,
  getType,
  updatePost,
} from "../actions";

/* reducer */
export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest): // case: getPostsRequest
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostsSuccess): // case: getPostsSuccess
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostsFailure): // case: getPostsFailure
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case getType(createPost.createPostSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePost.updatePostSuccess):
      return {
        ...state,
        data: state.data.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case getType(deletePost.deletePostSuccess):
      return {
        ...state,
        data: state.data.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
}
