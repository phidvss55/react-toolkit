import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Johny Deep",
    age: "22",
    about: "Something about me",
    url: "https://picsum.photos/200/300?random",
    theme: "#ff9051",
    pending: false,
    error: false,
  },
  // contain function with this slice
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.about = action.payload.about;
      state.url = action.payload.url;
      state.theme = action.payload.theme;
      state.pending = false;
      state.error = false;
    },
    updateFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { updateFailure, updateSuccess, updateStart } = userSlice.actions;
export default userSlice.reducer;
