import type { ReactNode } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
};

export const AppShell = ({
  title,
  description,
  actions,
  sidebar,
  children,
}: AppShellProps) => {
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const subtextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <Stack spacing={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={4}
        >
          <Stack spacing={1}>
            <Heading size="lg">{title}</Heading>
            {description ? (
              <Text color={subtextColor} maxW="2xl">
                {description}
              </Text>
            ) : null}
          </Stack>
          {actions ? <HStack spacing={3}>{actions}</HStack> : null}
        </Flex>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          align="flex-start"
        >
          <Box flex="1">{children}</Box>
          {sidebar ? (
            <Box
              w={{ base: "100%", lg: "300px" }}
              minH="200px"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="2xl"
              p={6}
            >
              {sidebar}
            </Box>
          ) : null}
        </Flex>
      </Stack>
    </Container>
  );
};
