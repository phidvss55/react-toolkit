import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./features/modalSlice";
import { todoApi } from "../services/todos";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
