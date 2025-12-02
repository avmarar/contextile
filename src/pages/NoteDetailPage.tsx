import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../actions/postsActions";
import type { AppDispatch } from "../store";
import type { RootState } from "../types";

const NoteDetailPage: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { posts, loading, hasErrors } = useSelector(
    (state: RootState) => state.posts
  );
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const note = posts.find(entry => entry.id === Number(noteId));

  useEffect(() => {
    if (!posts.length) {
      void dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

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
        <Text color={subtextColor}>{note.body}</Text>
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
