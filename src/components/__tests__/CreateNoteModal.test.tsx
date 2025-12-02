import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateNoteModal } from "../CreateNoteModal";
import { renderWithProviders } from "../../testUtils";

describe("CreateNoteModal", () => {
  it("submits form data", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue(undefined);

    renderWithProviders(
      <CreateNoteModal isOpen onClose={() => {}} onCreate={onCreate} />
    );

    await user.type(screen.getByPlaceholderText(/add a title/i), "Sprint Retro");
    await user.type(screen.getByPlaceholderText(/capture your ideas/i), "Notes");
    await user.click(screen.getByRole("button", { name: /save note/i }));

    expect(onCreate).toHaveBeenCalledWith({
      title: "Sprint Retro",
      body: "Notes",
      type: "text",
      mediaUrl: null,
      tags: [],
    });
  });
});
