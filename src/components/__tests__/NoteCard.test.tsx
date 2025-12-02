import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NoteCard } from "../NoteCard";
import { renderWithProviders } from "../../testUtils";
import type { Note } from "../../types";

const baseNote: Note = {
  id: 1,
  title: "Test Note",
  body: "Sample body",
  type: "text",
  createdAt: new Date().toISOString(),
  mediaUrl: null,
  tags: ["idea"],
};

describe("NoteCard", () => {
  it("invokes quick actions", () => {
    const handlers = {
      onPin: vi.fn(),
      onEdit: vi.fn(),
      onDelete: vi.fn(),
    };

    renderWithProviders(<NoteCard note={baseNote} {...handlers} />);

    fireEvent.click(screen.getByLabelText(/pin note/i));
    fireEvent.click(screen.getByLabelText(/edit note/i));
    fireEvent.click(screen.getByLabelText(/delete note/i));

    expect(handlers.onPin).toHaveBeenCalledTimes(1);
    expect(handlers.onEdit).toHaveBeenCalledTimes(1);
    expect(handlers.onDelete).toHaveBeenCalledTimes(1);
  });
});
