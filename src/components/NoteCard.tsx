import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { FC, MouseEvent } from "react";
import { FiBookmark, FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Note } from "../types";

type NoteCardProps = {
  note: Note;
  onPin?: (note: Note) => void;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
};

const formatTimestamp = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export const NoteCard: FC<NoteCardProps> = ({
  note,
  onDelete,
  onEdit,
  onPin,
}) => {
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const accentText = useColorModeValue("brand.600", "brand.300");
  const audioBg = useColorModeValue("gray.50", "whiteAlpha.50");

  const handleAction =
    (callback?: (note: Note) => void) => (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      callback?.(note);
    };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: "relative" }}
    >
      <Card
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        shadow="sm"
        role="group"
        transition="all 0.2s ease"
        _hover={{
          shadow: "xl",
          transform: "translateY(-4px)",
        }}
      >
        <CardBody>
        <Stack spacing={4}>
          <HStack justify="space-between" align="flex-start">
            <Badge colorScheme="purple" textTransform="capitalize">
              {note.type}
            </Badge>
            <HStack
              spacing={1}
              opacity={{ base: 1, md: 0 }}
              _groupHover={{ opacity: 1 }}
            >
              <IconButton
                aria-label="Pin note"
                icon={<FiBookmark />}
                size="sm"
                variant="ghost"
                onClick={handleAction(onPin)}
              />
              <IconButton
                aria-label="Edit note"
                icon={<FiEdit2 />}
                size="sm"
                variant="ghost"
                onClick={handleAction(onEdit)}
              />
              <IconButton
                aria-label="Delete note"
                icon={<FiTrash2 />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleAction(onDelete)}
              />
            </HStack>
          </HStack>

          {note.type === "image" && note.mediaUrl ? (
            <Box borderRadius="2xl" overflow="hidden" position="relative">
              <Image
                src={note.mediaUrl}
                alt={note.title}
                objectFit="cover"
                w="100%"
                h="200px"
                transition="transform 0.3s ease"
                _groupHover={{ transform: "scale(1.02)" }}
              />
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, blackAlpha.700, transparent)"
                display="flex"
                alignItems="flex-end"
                p={4}
              >
                <Text color="white" fontWeight="semibold">
                  Tap to reveal details
                </Text>
              </Box>
            </Box>
          ) : null}

          {note.type === "audio" ? (
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={4}
              bg={audioBg}
            >
              <HStack justify="space-between" align="center" mb={3}>
                <Text fontWeight="semibold" color={accentText}>
                  Voice memo preview
                </Text>
                <Badge colorScheme="brand" variant="subtle">
                  {formatTimestamp(note.createdAt)}
                </Badge>
              </HStack>
              <Image
                src="/waveform.svg"
                alt="Waveform preview"
                w="100%"
                h="80px"
                objectFit="cover"
                borderRadius="lg"
                backgroundColor="blackAlpha.800"
              />
              <Text color={subtextColor} fontSize="sm" mt={3}>
                Tap to open this note and refine the transcript.
              </Text>
            </Box>
          ) : null}

          <Stack spacing={2}>
            <Heading size="md">{note.title}</Heading>
            <Text fontSize="sm" color={subtextColor}>
              {formatTimestamp(note.createdAt)}
            </Text>
            <Text color={subtextColor} noOfLines={4}>
              {note.body}
            </Text>
          </Stack>

          <HStack spacing={2} flexWrap="wrap">
            {note.tags.map(tag => (
              <Badge key={`${note.id}-${tag}`} variant="subtle" colorScheme="gray">
                {tag}
              </Badge>
            ))}
          </HStack>
        </Stack>
        </CardBody>
      </Card>
    </motion.div>
  );
};
