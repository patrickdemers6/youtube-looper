import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer", () => {
  render(<Footer />);
  const inputTitle = screen.getByText(/GitHub/i);
  expect(inputTitle).toBeInTheDocument();
});

test("links to github repo", () => {
  render(<Footer />);
  const githubText = screen.getByText(/GitHub/i).closest("a");

  expect(githubText).toBeInTheDocument();
  expect(githubText).toHaveProperty(
    "href",
    "https://github.com/patrickdemers6/youtube-looper"
  );
});

test("links to creator website", () => {
  render(<Footer />);
  const developerText = screen.getByText(/Patrick Demers/i).closest("a");

  expect(developerText).toBeInTheDocument();
  expect(developerText).toHaveProperty("href", "https://demerstech.com/");
});
