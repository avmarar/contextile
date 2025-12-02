import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Link as ChakraLink,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../actions/notesActions";
import { NoteCard } from "../components/NoteCard";
import { FiltersBar } from "../components/FiltersBar";
import { AppShell } from "../components/AppShell";
import { StatsPanel } from "../components/StatsPanel";
import { CreateNoteModal } from "../components/CreateNoteModal";
import { ThemeToggle } from "../components/ThemeToggle";
import type { AppDispatch } from "../store";
import type { Note, RootState } from "../types";

const NotesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, hasErrors } = useSelector(
    (state: RootState) => state.notes
  );
  const filters = useSelector((state: RootState) => state.ui.filters);
  const createModal = useDisclosure();
  const columns = useBreakpointValue({ base: 1, md: 2, xl: 3 }) ?? 1;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    void dispatch(fetchNotes());
  }, [dispatch]);

  const visibleNotes = useMemo(() => {
    const normalizedQuery = filters.searchQuery.trim().toLowerCase();
    const matchesQuery = (value: string) =>
      normalizedQuery === "" || value.toLowerCase().includes(normalizedQuery);

    return [...items]
      .filter(note => {
        const typeMatch = filters.type === "all" || note.type === filters.type;
        const textMatch = matchesQuery(`${note.title} ${note.body}`);
        return typeMatch && textMatch;
      })
      .sort((a, b) => {
        if (filters.sortOrder === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  }, [filters, items]);

  const handleQuickAction = useCallback((action: string, note: Note) => {
    console.info(`[notes:${action}]`, note.id);
  }, []);

  const handleEditNote = useCallback(
    (note: Note) => {
      navigate(`/notes/${note.id}`, {
        state: { startInEditMode: true },
      });
    },
    [navigate]
  );

  const renderMasonryContent = (children: ReactNode) => (
    <Box
      sx={{
        columnCount: columns,
        columnGap: { base: "16px", md: "24px" },
        "@supports (grid-template-rows: masonry)": {
          columnCount: "initial",
          columnGap: "initial",
          display: "grid",
          gridTemplateColumns: {
            base: "repeat(1, minmax(0, 1fr))",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
          gridAutoRows: "1px",
          gap: { base: 4, md: 6 },
        },
      }}
    >
      {children}
    </Box>
  );

  let content = renderMasonryContent(
    visibleNotes.map(note => (
      <Box key={note.id} mb={6} sx={{ breakInside: "avoid" }}>
        <ChakraLink
          as={RouterLink}
          to={`/notes/${note.id}`}
          _hover={{ textDecoration: "none" }}
          display="block"
        >
          <NoteCard
            note={note}
            onPin={() => handleQuickAction("pin", note)}
            onEdit={() => handleEditNote(note)}
            onDelete={() => handleQuickAction("delete", note)}
          />
        </ChakraLink>
      </Box>
    ))
  );

  const emptyState =
    !visibleNotes.length && !loading ? (
      <Text color="gray.500">No notes match the selected filters.</Text>
    ) : null;

  if (loading) {
    content = renderMasonryContent(
      [...Array(6)].map((_, idx) => (
        <Box key={String(idx)} mb={6} sx={{ breakInside: "avoid" }}>
          <Skeleton height="240px" borderRadius="2xl" />
        </Box>
      ))
    );
  } else if (hasErrors) {
    content = (
      <Alert status="error" borderRadius="xl">
        <AlertIcon />
        Unable to display notes right now.
      </Alert>
    );
  }

  const handleCreate = useCallback(
    async (payload: Omit<Note, "id" | "createdAt">) => {
      const tempNote: Note = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...payload,
      };
      dispatch({
        type: "GET_NOTES_SUCCESS",
        payload: [tempNote, ...items],
      });
      toast({
        status: "info",
        title: "Optimistic create",
        description: "In a future phase this will persist to Supabase.",
      });
    },
    [dispatch, items, toast]
  );

  const actions = (
    <>
      <ThemeToggle />
      <Button
        colorScheme="brand"
        borderRadius="xl"
        onClick={createModal.onOpen}
      >
        Create Note
      </Button>
    </>
  );

  return (
    <AppShell
      title="Notes"
      description="Browse every captured thought across text, imagery, and audio. Use filters to zero in on the context you need."
      actions={actions}
      sidebar={<StatsPanel notes={items} />}
    >
      <Stack spacing={6}>
        <FiltersBar />
        {content}
        {emptyState}
      </Stack>
      <CreateNoteModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        onCreate={handleCreate}
      />
    </AppShell>
  );
};

export default NotesPage;
