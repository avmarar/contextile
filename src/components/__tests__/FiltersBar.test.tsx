import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FiltersBar } from "../FiltersBar";
import { renderWithProviders } from "../../testUtils";

describe("FiltersBar", () => {
  it("updates search query when typing", () => {
    const { store } = renderWithProviders(<FiltersBar />);

    const input = screen.getByPlaceholderText(/search notes/i);
    fireEvent.change(input, { target: { value: "mood" } });

    expect(store.getState().ui.filters.searchQuery).toBe("mood");
  });

  it("changes type filter when selecting a chip", () => {
    const { store } = renderWithProviders(<FiltersBar />);

    fireEvent.click(screen.getByRole("button", { name: /image/i }));

    expect(store.getState().ui.filters.type).toBe("image");
  });
});
