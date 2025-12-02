import { Container, Heading, Text } from "@chakra-ui/react";
import type { FC } from "react";

const TodoPage: FC = () => (
  <Container maxW="4xl" py={12}>
    <Heading size="lg" mb={4}>
      To-do
    </Heading>
    <Text color="gray.500">
      Task tracking will live here in a future milestone. For now, keep exploring
      notes.
    </Text>
  </Container>
);

export default TodoPage;
