import type { NotesAction, NotesState } from "../types";
import * as actions from "../actions/notesActions";

export const initialState: NotesState = {
  items: [],
  loading: false,
  hasErrors: false,
};

export default function notesReducer(
  state: NotesState = initialState,
  action: NotesAction
): NotesState {
  switch (action.type) {
    case actions.GET_NOTES:
      return { ...state, loading: true };
    case actions.GET_NOTES_SUCCESS:
      return { items: action.payload, loading: false, hasErrors: false };
    case actions.GET_NOTES_FAILURE:
      return { ...state, loading: false, hasErrors: true };
    default:
      return state;
  }
}
