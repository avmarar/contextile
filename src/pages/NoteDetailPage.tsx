import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Image,
  SkeletonText,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../actions/notesActions";
import type { AppDispatch } from "../store";
import type { RootState } from "../types";

const NoteDetailPage: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, hasErrors } = useSelector(
    (state: RootState) => state.notes
  );
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const note = items.find(entry => entry.id === Number(noteId));

  useEffect(() => {
    if (!items.length) {
      void dispatch(fetchNotes());
    }
  }, [dispatch, items.length]);

  let body: ReactNode;
  if (loading && !note) {
    body = (
      <Stack spacing={4}>
        <SkeletonText noOfLines={4} spacing="4" />
      </Stack>
    );
  } else if (hasErrors) {
    body = (
      <Alert status="error" borderRadius="xl">
        <AlertIcon />
        Unable to load this note. Try returning to the notes list.
      </Alert>
    );
  } else if (!note) {
    body = (
      <Alert status="warning" borderRadius="xl">
        <AlertIcon />
        This note could not be found.
      </Alert>
    );
  } else {
    body = (
      <Stack spacing={4}>
        <Heading size="lg">{note.title}</Heading>
        <Text fontSize="sm" color={subtextColor}>
          {note.type.toUpperCase()} ·{" "}
          {new Date(note.createdAt).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        {note.mediaUrl ? (
          <Box borderRadius="xl" overflow="hidden">
            <Image
              src={note.mediaUrl}
              alt={note.title}
              objectFit="cover"
              w="100%"
              maxH="360px"
            />
          </Box>
        ) : null}
        <Text color={subtextColor}>{note.body}</Text>
        <Wrap spacing={2}>
          {note.tags.map(tag => (
            <WrapItem key={`${note.id}-${tag}`}>
              <Button size="xs" variant="outline">
                {tag}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
        <Box>
          <Button colorScheme="brand" borderRadius="xl" mr={3}>
            Edit Note
          </Button>
          <Button variant="ghost" as={RouterLink} to="/notes">
            Back to Notes
          </Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Container maxW="4xl" py={12}>
      <Stack spacing={6}>
        <Button variant="link" alignSelf="flex-start" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
        {body}
      </Stack>
    </Container>
  );
};

export default NoteDetailPage;
