import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskForm } from "./TaskForm";
import { useTasks } from "../../contexts/TaskContext";

vi.mock("../../contexts/TaskContext", () => ({
  useTasks: vi.fn(),
}));

describe("TaskForm", () => {
  it("renders correctly", () => {
    (useTasks as vi.Mock).mockReturnValue({
      handleAddOrEditTask: vi.fn(),
      editingTask: null,
    });

    render(<TaskForm />);

    expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    (useTasks as vi.Mock).mockReturnValue({
      handleAddOrEditTask: vi.fn(),
      editingTask: null,
    });

    render(<TaskForm />);

    const titleInput = screen.getByPlaceholderText(
      "Título"
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Descrição"
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task Description" },
    });

    expect(titleInput.value).toBe("New Task");
    expect(descriptionInput.value).toBe("Task Description");
  });

  it("fills the form with editing task data", () => {
    const editingTask = {
      id: "1",
      title: "Edit Task",
      description: "Edit Description",
      status: "completed",
    };

    (useTasks as vi.Mock).mockReturnValue({
      handleAddOrEditTask: vi.fn(),
      editingTask,
    });

    render(<TaskForm />);

    expect(
      (screen.getByPlaceholderText("Título") as HTMLInputElement).value
    ).toBe("Edit Task");
    expect(
      (screen.getByPlaceholderText("Descrição") as HTMLInputElement).value
    ).toBe("Edit Description");
    expect(screen.getByText("Editar")).toBeInTheDocument();
  });
});
