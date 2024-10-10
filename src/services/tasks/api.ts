import api from "../../api/axios";
import { Task } from "../../types/tasks";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const addTask = async (task: Task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const editTask = async (task: Task) => {
  const response = await api.put(`/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};

export const completeTask = async (id: string) => {
  const response = await api.patch(`/tasks/${id}`, { status: "completed" });
  return response.data;
};
