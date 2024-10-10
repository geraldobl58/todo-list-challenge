import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { TaskStatus } from "../../types/tasks";
import { useTasks } from "../../contexts/TaskContext";
import { TaskList } from "./TaskList";

vi.mock("../../contexts/TaskContext", () => ({
  useTasks: vi.fn(),
}));

describe("TaskList component", () => {
  const mockTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: TaskStatus.COMPLETED,
    },
  ];

  const mockHandleEditClick = vi.fn();
  const mockHandleDeleteTask = vi.fn();
  const mockHandleCompleteTask = vi.fn();

  beforeEach(() => {
    (useTasks as vi.Mock).mockReturnValue({
      tasks: mockTasks,
      handleEditClick: mockHandleEditClick,
      handleDeleteTask: mockHandleDeleteTask,
      handleCompleteTask: mockHandleCompleteTask,
    });
  });

  it("should render tasks based on filter", () => {
    render(<TaskList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "in_progress" },
    });
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should render action buttons correctly", () => {
    render(<TaskList />);

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    const completeButton = screen.getAllByRole("button", { name: /check/i })[0];

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });
    const deleteButtonCompleted = screen.getAllByRole("button", {
      name: /delete/i,
    })[0];
    expect(deleteButtonCompleted).toBeInTheDocument();
  });

  it("should call appropriate handlers on button click", () => {
    render(<TaskList />);

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    fireEvent.click(editButton);
    expect(mockHandleEditClick).toHaveBeenCalledWith(mockTasks[0]);

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    fireEvent.click(deleteButton);
    expect(mockHandleDeleteTask).toHaveBeenCalledWith(mockTasks[0].id);

    const completeButton = screen.getAllByRole("button", { name: /check/i })[0];
    fireEvent.click(completeButton);
    expect(mockHandleCompleteTask).toHaveBeenCalledWith(mockTasks[0].id);
  });
});
