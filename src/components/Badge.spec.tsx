import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Badge } from "./Badge";
import { TaskStatus } from "../types/tasks";

describe("Badge component", () => {
  it("should render 'Em progresso' when status is IN_PROGRESS", () => {
    const { getByText } = render(<Badge status={TaskStatus.IN_PROGRESS} />);
    const badge = getByText("Em progresso");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-rose-500");
  });

  it("should render 'Finalizado' when status is COMPLETED", () => {
    const { getByText } = render(<Badge status={TaskStatus.COMPLETED} />);
    const badge = getByText("Finalizado");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-emerald-500");
  });
});
