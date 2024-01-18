import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { ITodo, Todo, TodoDoc } from "./../models/todo";

interface Id {
  id: ObjectId;
}

export const create = async (req: Request, res: Response) => {
  const { description, todoStatus } = req.body;

  const newTodo = new Todo({
    todoStatus,
    description,
  });
  await newTodo.save();

  return res.status(201).json({ msg: "ok", data: newTodo });
};

export const deleteTodo = async (req: Request<Id>, res: Response<any>) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete({ _id: id }).catch((err) =>
    res.status(400).json()
  );
  return res.status(200).json({ data: "Job deleted successful" });
};
interface Error {
  error: string;
}

export const updateTodo = async (
  req: Request<Id, {}, ITodo, {}>,
  res: Response<TodoDoc | Error>
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please provide a todo id!" });
  }

  const { description, todoStatus } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate<TodoDoc>(
      { _id: id },
      { todoStatus, description },
      {
        new: true,
      }
    );
    await updatedTodo.save();
    return res.status(200).json(updatedTodo);
  } catch (e) {
    if (e.name === "CastError")
      return res.status(400).json({ error: "Please provide a valid id!" });
  }
};

export const getTodo = async (req: Request<Id>, res: Response<TodoDoc>) => {
  const { id } = req.params;
  const todo = await Todo.findOne<TodoDoc>({ _id: id });
  return res.status(200).json(todo);
};

export const getAllTodos = async (req: Request, res: Response<TodoDoc[]>) => {
  const todos = await Todo.find<TodoDoc>();
  return res.status(200).json(todos);
};
