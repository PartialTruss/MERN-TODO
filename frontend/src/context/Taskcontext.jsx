import { createContext, useContext, useEffect, useState } from "react";
import { addTasks, deleteTask, getTasks, updateTask } from "../api/todo_api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await addTasks({ title });
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task.");
    }
  };

  const updateTaskStatus = async (id, updatedFields) => {
    try {
      const response = await updateTask(id, updatedFields); // Pass all updated fields
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, ...updatedFields } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task.");
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task.");
    }
  };

  const resetTasks = () => {
    setTasks([]); // Reset tasks on login
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for consuming TaskContext
export const useTasks = () => useContext(TaskContext);
