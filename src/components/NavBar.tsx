import {
  Box,
  Collapse,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const links = [
  {
    to: "/notes",
    label: "Notes",
    match: (path: string) => path.startsWith("/notes"),
  },
  { to: "/reminder", label: "Reminder" },
  { to: "/todo", label: "To-do" },
];

export const NavBar: FC = () => {
  const location = useLocation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const bg = useColorModeValue("white", "gray.900");
  const activeBg = useColorModeValue("brand.50", "whiteAlpha.200");
  const activeColor = useColorModeValue("brand.600", "brand.200");
  const toggleColor = useColorModeValue("gray.600", "gray.200");

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const isActive = (link: (typeof links)[number]) => {
    if (link.match) {
      return link.match(location.pathname);
    }
    return location.pathname === link.to;
  };

  const linkItems = () =>
    links.map((link) => (
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
        display="block"
      >
        {link.label}
      </ChakraLink>
    ));

  return (
    <Box as="header" borderBottomWidth="1px" borderColor={borderColor} bg={bg}>
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" py={4}>
          <HStack spacing={3}>
            <Image src="/contextile.svg" alt="Contextile logo" height="40px" />
          </HStack>
          <HStack spacing={2} display={{ base: "none", md: "flex" }}>
            {linkItems()}
          </HStack>
          <IconButton
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={onToggle}
            icon={
              <Box as="span" fontSize="xl">
                {isOpen ? "×" : "☰"}
              </Box>
            }
            variant="ghost"
            display={{ base: "inline-flex", md: "none" }}
            color={toggleColor}
          />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Stack
            spacing={2}
            py={4}
            display={{ md: "none" }}
            borderTopWidth="1px"
            borderColor={borderColor}
          >
            {linkItems()}
          </Stack>
        </Collapse>
      </Container>
    </Box>
  );
};
