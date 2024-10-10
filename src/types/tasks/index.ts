export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}
