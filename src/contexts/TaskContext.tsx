import React, { createContext, useContext, useState, useEffect } from "react";
import { Task } from "../types/tasks";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  getTasks,
} from "../services/tasks/api";

interface TaskContextProps {
  tasks: Task[];
  editingTask: Task | null;
  handleAddOrEditTask: (task: Task) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
  handleCompleteTask: (id: string) => Promise<void>;
  handleEditClick: (task: Task) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleAddOrEditTask = async (task: Task) => {
    if (editingTask) {
      const updatedTask = await editTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      setEditingTask(null);
    } else {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = async (id: string) => {
    const updatedTask = await completeTask(id);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: updatedTask.status } : task
      )
    );
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editingTask,
        handleAddOrEditTask,
        handleDeleteTask,
        handleCompleteTask,
        handleEditClick,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
