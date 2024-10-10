import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header component", () => {
  it("should render the header element", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should render the logo image with correct alt text", () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/logo.svg");
  });
});
