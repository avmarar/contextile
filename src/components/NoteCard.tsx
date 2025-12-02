import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import type { Note } from "../types";

type NoteCardProps = {
  note: Note;
};

const formatTimestamp = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");

  return (
    <Card
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      role="group"
      transition="all 0.2s ease"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
      }}
    >
      <CardBody>
        <Stack spacing={3}>
          <HStack justify="space-between">
            <Badge colorScheme="purple" textTransform="capitalize">
              {note.type}
            </Badge>
            <Text fontSize="xs" color={subtextColor}>
              {formatTimestamp(note.createdAt)}
            </Text>
          </HStack>

          {note.mediaUrl ? (
            <Box borderRadius="lg" overflow="hidden">
              <Image
                src={note.mediaUrl}
                alt={note.title}
                objectFit="cover"
                w="100%"
                h="160px"
              />
            </Box>
          ) : null}

          <Stack spacing={2}>
            <Heading size="md">{note.title}</Heading>
            <Text color={subtextColor} noOfLines={4}>
              {note.body}
            </Text>
          </Stack>

          <HStack spacing={2} flexWrap="wrap">
            {note.tags.map(tag => (
              <Badge key={`${note.id}-${tag}`} variant="outline" colorScheme="gray">
                {tag}
              </Badge>
            ))}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
