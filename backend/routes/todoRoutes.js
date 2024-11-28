import express from "express";
import {
  completedTodo,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middleware/auth_middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.put("/:id/completed", authMiddleware, completedTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
