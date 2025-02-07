import API from "./api";

export const getTasks = (archived = false) =>
  API.get(`/todos?archived=${archived}`);

export const addTasks = ({ title, dueDate, dueTime, description }) =>
  API.post("/todos", { title, dueDate, dueTime, description });

export const updateTask = (id, updatedTask) =>
  API.put(`/todos/${id}`, updatedTask);

export const updateTaskCompleted = (id, completed) =>
  API.put(`/todos/${id}/completed`, { completed });

export const starredTask = (id, starred) => {
  API.put(`/todos/${id}/starred`, { starred });
};

export const archivedTodo = (id, archived) =>
  API.put(`/todos/${id}/archive`, { archived });

export const deleteTask = (id) => API.delete(`/todos/${id}`);
