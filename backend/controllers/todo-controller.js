import Todo from "../models/todo-model.js";
import { validateTimeFormat } from "../utils/utils.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, starred, dueDate, dueTime, description } = req.body;
    const userId = req.user.id;

    if (!title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Validate time format
    if (dueTime && !validateTimeFormat(dueTime)) {
      return res
        .status(400)
        .json({ message: "Invalid time format. Use HH:mm" });
    }

    const todo = new Todo({
      title,
      userId,
      starred: !!starred,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      dueTime,
      description,
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating todo", error: error.message });
  }
};

// Get all todos for a user
// Get all active (non-archived) todos for a user
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const { archived } = req.query;

    const filter = { userId };
    if (archived === "true") {
      filter.archived = true;
    } else {
      filter.archived = { $ne: true };
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, starred, dueDate, dueTime, description } =
      req.body;

    if (dueTime && !validateTimeFormat(dueTime)) {
      return res
        .status(400)
        .json({ message: "Invalid time format. Use HH:mm" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {
        title,
        completed,
        starred,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        dueTime,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
};

// Mark a todo as completed
export const completedTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
};

export const archiveTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { archived } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { archived },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};
