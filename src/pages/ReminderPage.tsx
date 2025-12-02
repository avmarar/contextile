import { Container, Heading, Text } from "@chakra-ui/react";
import type { FC } from "react";

const ReminderPage: FC = () => (
  <Container maxW="4xl" py={12}>
    <Heading size="lg" mb={4}>
      Reminder
    </Heading>
    <Text color="gray.500">
      Reminder workflows are on the roadmap. Check back once notes foundations
      are complete.
    </Text>
  </Container>
);

export default ReminderPage;
