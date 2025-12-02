import {
  Alert,
  AlertIcon,
  Container,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../actions/notesActions";
import { NoteCard } from "../components/NoteCard";
import type { AppDispatch } from "../store";
import type { RootState } from "../types";

const NotesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, hasErrors } = useSelector(
    (state: RootState) => state.notes
  );
  const filters = useSelector((state: RootState) => state.ui.filters);

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

  let content = (
    <Stack spacing={4}>
      {visibleNotes.map(note => (
        <ChakraLink
          as={RouterLink}
          key={note.id}
          to={`/notes/${note.id}`}
          _hover={{ textDecoration: "none" }}
          display="block"
        >
          <NoteCard note={note} />
        </ChakraLink>
      ))}
      {!visibleNotes.length && !loading ? (
        <Text color="gray.500">No notes match the selected filters.</Text>
      ) : null}
    </Stack>
  );

  if (loading) {
    content = (
      <Stack spacing={4}>
        {[...Array(4)].map((_, idx) => (
          <Skeleton key={String(idx)} height="180px" borderRadius="xl" />
        ))}
      </Stack>
    );
  } else if (hasErrors) {
    content = (
      <Alert status="error" borderRadius="xl">
        <AlertIcon />
        Unable to display notes right now.
      </Alert>
    );
  }

  return (
    <Container maxW="5xl" py={12}>
      <Stack spacing={6}>
        <Heading size="lg">Notes</Heading>
        {content}
      </Stack>
    </Container>
  );
};

export default NotesPage;
