import {
  Alert,
  AlertIcon,
  Container,
  Heading,
  Link as ChakraLink,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../actions/postsActions";
import { NoteCard } from "../components/NoteCard";
import type { AppDispatch } from "../store";
import type { RootState } from "../types";

const NotesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, posts, hasErrors } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    void dispatch(fetchPosts());
  }, [dispatch]);

  let content = (
    <Stack spacing={4}>
      {posts.map(post => (
        <ChakraLink
          as={RouterLink}
          key={post.id}
          to={`/notes/${post.id}`}
          _hover={{ textDecoration: "none" }}
          display="block"
        >
          <NoteCard post={post} />
        </ChakraLink>
      ))}
    </Stack>
  );

  if (loading) {
    content = (
      <Stack spacing={4}>
        {[...Array(4)].map((_, idx) => (
          <Skeleton key={String(idx)} height="120px" borderRadius="xl" />
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
