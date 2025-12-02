import type { ThunkAction } from "@reduxjs/toolkit";
import type { AnyAction } from "redux";

export type NoteType = "text" | "image" | "audio";

export type Note = {
  id: number;
  type: NoteType;
  title: string;
  body: string;
  mediaUrl?: string | null;
  createdAt: string;
  tags: string[];
};

export type GetNotesAction = {
  type: "GET_NOTES";
};

export type GetNotesSuccessAction = {
  type: "GET_NOTES_SUCCESS";
  payload: Note[];
};

export type GetNotesFailureAction = {
  type: "GET_NOTES_FAILURE";
};

export type NotesAction =
  | GetNotesAction
  | GetNotesSuccessAction
  | GetNotesFailureAction;

export type NotesState = {
  items: Note[];
  loading: boolean;
  hasErrors: boolean;
};

export type NoteTypeFilter = "all" | NoteType;
export type SortOrder = "newest" | "oldest";
export type ThemePreference = "system" | "light" | "dark";

export type UiState = {
  filters: {
    searchQuery: string;
    type: NoteTypeFilter;
    sortOrder: SortOrder;
  };
  theme: ThemePreference;
};

export type RootState = {
  notes: NotesState;
  ui: UiState;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
