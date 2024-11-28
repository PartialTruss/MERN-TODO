import API from "./api"; 

export const getTasks = () => API.get("/todos");

export const addTasks = (task) => API.post("/todos", task);

export const updateTask = (id, updatedTask) =>
  API.put(`/todos/${id}`, updatedTask);

export const updateTaskCompleted = (id, completed) =>
  API.put(`/todos/${id}/completed`, { completed }); 

export const deleteTask = (id) => API.delete(`/todos/${id}`);
