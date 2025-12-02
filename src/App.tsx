import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useColorMode } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
import NoteDetailPage from "./pages/NoteDetailPage";
import NotesPage from "./pages/NotesPage";
import ReminderPage from "./pages/ReminderPage";
import TodoPage from "./pages/TodoPage";
import type { RootState } from "./types";

const ThemeWatcher = () => {
  const { setColorMode } = useColorMode();
  const themePreference = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    setColorMode(themePreference);
  }, [setColorMode, themePreference]);

  return null;
};

const App = () => {
  return (
    <Router>
      <NavBar />
      <ThemeWatcher />
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:noteId" element={<NoteDetailPage />} />
        <Route path="/reminder" element={<ReminderPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
