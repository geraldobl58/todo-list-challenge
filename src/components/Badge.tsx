import { TaskStatus } from "../types/tasks";

interface BadgeProps {
  status: TaskStatus;
}

export const Badge = ({ status }: BadgeProps) => {
  return (
    <>
      {status === TaskStatus.IN_PROGRESS ? (
        <span className="bg-rose-500 text-white px-1 rounded-full text-xs">
          Em progresso
        </span>
      ) : (
        <span className="bg-emerald-500 text-white px-1 rounded-full text-xs">
          Finalizado
        </span>
      )}
    </>
  );
};
