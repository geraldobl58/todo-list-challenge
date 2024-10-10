import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskStatus } from "../../types/tasks";
import { useTasks } from "../../contexts/TaskContext";

export const TaskForm = () => {
  const { handleAddOrEditTask, editingTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "in_progress" as TaskStatus,
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddOrEditTask({
      ...formData,
      id: editingTask ? editingTask.id : uuidv4(),
    });
    setFormData({
      title: "",
      description: "",
      status: "in_progress" as TaskStatus,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-sky-600 text-white text-sm rounded-md py-2 px-4"
        >
          {editingTask ? "Editar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
};
