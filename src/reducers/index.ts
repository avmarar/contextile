import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  ui: uiReducer,
});

export default rootReducer;
