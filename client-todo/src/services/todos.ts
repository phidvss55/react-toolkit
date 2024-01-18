import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoCreate {
  description: string;
  todoStatus: boolean;
}

export interface TodoI extends TodoCreate {
  _id: string;
}

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoI[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<TodoI, TodoCreate>({
      query: (todo) => ({
        url: "/todos",
        method: METHOD.POST,
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<TodoI, TodoI>({
      query: (todo) => ({
        url: `/todos/${todo._id}`,
        method: METHOD.PUT,
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<TodoI, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: METHOD.DELETE,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});
