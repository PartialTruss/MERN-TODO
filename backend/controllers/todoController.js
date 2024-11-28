import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    const todo = new Todo({
      title,
      userId,
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Ensure the user owns the todo
      { title, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const completedTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating", error });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
