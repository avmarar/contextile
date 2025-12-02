import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AppThunk,
  NoteTypeFilter,
  SortOrder,
  ThemePreference,
  UiState,
} from "../types";

const THEME_STORAGE_KEY = "contextile.theme";

const readThemePreference = (): ThemePreference => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  return "light";
};

const initialState: UiState = {
  filters: {
    searchQuery: "",
    type: "all",
    sortOrder: "newest",
  },
  theme: readThemePreference(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
    },
    setTypeFilter(state, action: PayloadAction<NoteTypeFilter>) {
      state.filters.type = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.filters.sortOrder = action.payload;
    },
    setThemePreference(state, action: PayloadAction<ThemePreference>) {
      state.theme = action.payload;
    },
  },
});

export const { setSearchQuery, setTypeFilter, setSortOrder, setThemePreference } =
  uiSlice.actions;

export const persistThemePreference =
  (theme: ThemePreference): AppThunk =>
  dispatch => {
    dispatch(setThemePreference(theme));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  };

export default uiSlice.reducer;
