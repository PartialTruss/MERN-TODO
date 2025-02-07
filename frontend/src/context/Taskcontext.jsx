import { createContext, useContext, useEffect, useState } from "react";
import {
  addTasks,
  archivedTodo,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/todo_api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async (archived = false) => {
    setLoading(true);
    try {
      const response = await getTasks(archived);
      setTasks(response.data || []);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title, dueDate, dueTime, description) => {
    try {
      const response = await addTasks({ title, dueDate, dueTime, description });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task.");
    }
  };

  const updateTaskStatus = async (id, updatedFields) => {
    try {
      await updateTask(id, updatedFields);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedFields } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task.");
    }
  };

  const updateTaskArchived = async (id, archived) => {
    try {
      await archivedTodo(id, archived);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, archived } : task
        )
      );
    } catch (err) {
      console.error("Error updating archive status:", err);
      setError("Failed to update archive status.");
    }
  };

  const updateTaskOrder = (newOrder) => {
    setTasks(newOrder);
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task.");
    }
  };

  const resetTasks = () => {
    setTasks([]);
  };

  const archiveTask = async (id) => {
    try {
      await archivedTodo(id, true); // Archive in the backend
      await loadTasks(); // Reload fresh data from the backend
    } catch (err) {
      console.error("Error archiving task:", err);
      setError("Failed to archive task.");
    }
  };

  const restoreTask = async (id) => {
    try {
      await archivedTodo(id, false); // Restore in the backend
      await loadTasks(); // Reload tasks to reflect changes
    } catch (err) {
      console.error("Error restoring task:", err);
      setError("Failed to restore task.");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        updateTaskStatus,
        deleteTaskById,
        loadTasks,
        resetTasks,
        updateTaskOrder,
        updateTaskArchived,
        archiveTask,
        restoreTask,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
