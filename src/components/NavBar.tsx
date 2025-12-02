import {
  Box,
  Circle,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const links = [
  { to: "/notes", label: "Notes", match: (path: string) => path.startsWith("/notes") },
  { to: "/reminder", label: "Reminder" },
  { to: "/todo", label: "To-do" },
];

export const NavBar: FC = () => {
  const location = useLocation();
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const bg = useColorModeValue("white", "gray.900");
  const activeBg = useColorModeValue("brand.50", "whiteAlpha.200");
  const activeColor = useColorModeValue("brand.600", "brand.200");

  const isActive = (link: typeof links[number]) => {
    if (link.match) {
      return link.match(location.pathname);
    }
    return location.pathname === link.to;
  };

  return (
    <Box as="header" borderBottomWidth="1px" borderColor={borderColor} bg={bg}>
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" py={4}>
          <HStack spacing={3}>
            <Circle size="36px" bg="brand.500" color="white" fontWeight="bold">
              C
            </Circle>
            <Text fontWeight="bold" color={useColorModeValue("gray.900", "white")} fontSize="lg">
              Contextile
            </Text>
          </HStack>
          <HStack spacing={2}>
            {links.map(link => (
              <ChakraLink
                as={RouterLink}
                key={link.to}
                to={link.to}
                px={4}
                py={2}
                rounded="lg"
                fontWeight="semibold"
                color={isActive(link) ? activeColor : undefined}
                bg={isActive(link) ? activeBg : "transparent"}
                _hover={{
                  textDecoration: "none",
                  bg: activeBg,
                  color: activeColor,
                }}
              >
                {link.label}
              </ChakraLink>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
