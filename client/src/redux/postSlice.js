import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    tags: [
      "None",
      "Mood",
      "Quotes",
      "ShitPost",
      "NSFW",
      "Comments",
      "Linked In",
    ],
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.posts = action.payload;
      state.pending = false;
      state.error = false;
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    createPost: (state, action) => {
      state.posts.push(action.payload);
      // use spread operator instead of push
      // state.posts = [...state.posts, action.payload];
    },
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
