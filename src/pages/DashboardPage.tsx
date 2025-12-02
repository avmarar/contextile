import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

const DashboardPage: FC = () => {
  const subtextColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Container maxW="5xl" py={12}>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Heading size="lg">Contextile Dashboard</Heading>
          <Text color={subtextColor}>
            A calm space for experimenting with the upcoming notes experience.
            This placeholder will evolve into the full App Shell during Phase 2.
          </Text>
        </Stack>

        <Button
          as={RouterLink}
          to="/notes"
          colorScheme="brand"
          alignSelf="flex-start"
          borderRadius="xl"
        >
          View Notes
        </Button>
      </Stack>
    </Container>
  );
};

export default DashboardPage;
