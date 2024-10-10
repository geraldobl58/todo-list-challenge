import { useEffect, useState } from "react";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
  getTasks,
} from "./services/tasks/api";

import { Header } from "./components/Header";
import { TaskForm } from "./components/tasks/TaskForm";
import { TaskList } from "./components/tasks/TaskList";

import { Task } from "./types/tasks";

function App() {
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
    <div className="md:max-w-screen-xl mx-auto space-y-10 p-4">
      <Header />

      <TaskForm onSubmit={handleAddOrEditTask} editingTask={editingTask} />

      <TaskList
        tasks={tasks}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteTask}
        onCompleteClick={handleCompleteTask}
      />
    </div>
  );
}

export default App;
