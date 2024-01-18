import express from "express"
import {
  create,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "./../controllers/todoController"

const router = express.Router()

router.get("/todos", getAllTodos)
router.get("/todos/:id", getTodo)
router.post("/todos", create)
router.delete("/todos/:id", deleteTodo)
router.put("/todos/:id", updateTodo)

export { router as todoRoutes }
