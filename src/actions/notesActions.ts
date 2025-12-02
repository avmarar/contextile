import type {
  Note,
  GetNotesAction,
  GetNotesSuccessAction,
  GetNotesFailureAction,
  AppThunk,
} from "../types";
import { fetchNotes as fetchNotesFromApi } from "../services/notesApi";

export const GET_NOTES = "GET_NOTES" as const;
export const GET_NOTES_SUCCESS = "GET_NOTES_SUCCESS" as const;
export const GET_NOTES_FAILURE = "GET_NOTES_FAILURE" as const;

export const getNotes = (): GetNotesAction => ({
  type: GET_NOTES,
});

export const getNotesSuccess = (notes: Note[]): GetNotesSuccessAction => ({
  type: GET_NOTES_SUCCESS,
  payload: notes,
});

export const getNotesFailure = (): GetNotesFailureAction => ({
  type: GET_NOTES_FAILURE,
});

export const fetchNotes = (): AppThunk<Promise<void>> => {
  return async dispatch => {
    dispatch(getNotes());

    try {
      const data = await fetchNotesFromApi();
      dispatch(getNotesSuccess(data));
    } catch {
      dispatch(getNotesFailure());
    }
  };
};
