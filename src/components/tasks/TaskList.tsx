import { useState } from "react";
import { Check, Edit, X } from "lucide-react";
import { Task, TaskStatus } from "../../types/tasks";
import { Badge } from "../Badge";

interface TaskListProps {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (id: string) => void;
  onCompleteClick: (id: string) => void;
}

export const TaskList = ({
  tasks,
  onEditClick,
  onDeleteClick,
  onCompleteClick,
}: TaskListProps) => {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "in_progress") return task.status === TaskStatus.IN_PROGRESS;
    if (filter === "completed") return task.status === TaskStatus.COMPLETED;
    return true;
  });

  return (
    <div>
      <div>
        <h2 className="text-sm font-semibold">Filtrar por:</h2>
        <select
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-10"
        >
          <option value="all">Todos</option>
          <option value="in_progress">Em progresso</option>
          <option value="completed">Finalizado</option>
        </select>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border-b px-4 py-2 text-center">
                  {task.status === TaskStatus.COMPLETED ? (
                    <span className="line-through text-gray-400">
                      {task.title}
                    </span>
                  ) : (
                    task.title
                  )}
                </td>
                <td className="border-b px-4 py-2 text-center">
                  {task.status === TaskStatus.COMPLETED ? (
                    <span className="line-through text-gray-400">
                      {task.description}
                    </span>
                  ) : (
                    task.description
                  )}
                </td>
                <td className="border-b px-4 py-2 text-center">
                  <Badge status={task.status} />
                </td>
                <td className="border-b px-4 py-2 text-center">
                  {task.status === TaskStatus.IN_PROGRESS && (
                    <button onClick={() => onEditClick(task)}>
                      <Edit className="size-4" />
                    </button>
                  )}
                  <button onClick={() => onDeleteClick(task.id)}>
                    <X className="size-4" />
                  </button>
                  {task.status === TaskStatus.IN_PROGRESS && (
                    <button onClick={() => onCompleteClick(task.id)}>
                      <Check className="size-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="px-4 py-2">
              <td colSpan={4} className="text-md text-center">
                Nenhuma tarefa cadastrada!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
