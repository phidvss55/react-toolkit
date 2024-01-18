import mongoose from "mongoose";

export interface ITodo {
  description: string;
  todoStatus: boolean;
}

export interface TodoDoc extends mongoose.Document {
  description: string;
  todoStatus: boolean;
}

const todoSchema = new mongoose.Schema({
  todoStatus: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model<TodoDoc>("Todo", todoSchema);
