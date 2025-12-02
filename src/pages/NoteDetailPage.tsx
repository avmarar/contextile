import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Skeleton,
  SkeletonText,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../actions/notesActions";
import { RichTextEditor } from "../components/RichTextEditor";
import type { AppDispatch } from "../store";
import type { Note, RootState } from "../types";

type NoteUpdates = {
  title: string;
  body: string;
  mediaUrl: string;
  tags: string[];
};

const isRichContent = (value: string) =>
  /<\/?[a-z][\s\S]*>/i.test(value.trim());

const formatTimestamp = (note: Note) =>
  new Date(note.createdAt).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const NoteDetailPage: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { items, loading, hasErrors } = useSelector(
    (state: RootState) => state.notes
  );
  const note = useMemo(
    () => items.find((entry) => entry.id === Number(noteId)),
    [items, noteId]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [draft, setDraft] = useState<NoteUpdates | null>(null);
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const subtleText = useColorModeValue("gray.600", "gray.400");
  const cardBg = useColorModeValue("white", "gray.800");
  const autoEditApplied = useRef(false);
  const startInEditMode =
    (location.state as { startInEditMode?: boolean } | null)?.startInEditMode ??
    false;

  useEffect(() => {
    if (!items.length) {
      void dispatch(fetchNotes());
    }
  }, [dispatch, items.length]);

  const handleStartEditing = useCallback(() => {
    if (!note) return;
    setDraft({
      title: note.title,
      body: note.body,
      mediaUrl: note.mediaUrl ?? "",
      tags: note.tags,
    });
    setTagInput("");
    setIsEditing(true);
  }, [note]);

  const handleCancelEditing = useCallback(() => {
    setIsEditing(false);
    setTagInput("");
    setDraft(null);
  }, []);

  useEffect(() => {
    if (startInEditMode && !isEditing && !autoEditApplied.current && note) {
      const frameId = requestAnimationFrame(() => {
        handleStartEditing();
        autoEditApplied.current = true;
      });
      return () => cancelAnimationFrame(frameId);
    }
    return undefined;
  }, [handleStartEditing, isEditing, note, startInEditMode]);

  useEffect(() => {
    autoEditApplied.current = false;
  }, [noteId]);

  const handleAddTag = useCallback(() => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    setDraft((prev) => {
      if (!prev || prev.tags.includes(trimmed)) {
        return prev;
      }
      return { ...prev, tags: [...prev.tags, trimmed] };
    });
    setTagInput("");
  }, [tagInput]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setDraft((prev) => {
      if (!prev) return prev;
      return { ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) };
    });
  }, []);

  const handleFieldChange = useCallback(
    (field: keyof NoteUpdates, value: string) => {
      setDraft((prev) => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    },
    []
  );

  const handleSave = useCallback(() => {
    if (!note || !draft) return;
    if (!draft.title.trim()) {
      toast({
        status: "warning",
        title: "Title required",
        description: "Give your note a title before saving.",
      });
      return;
    }
    const updated = items.map((item) =>
      item.id === note.id
        ? {
            ...item,
            title: draft.title.trim(),
            body: draft.body,
            mediaUrl: draft.mediaUrl.trim() || null,
            tags: draft.tags,
          }
        : item
    );
    dispatch({ type: "GET_NOTES_SUCCESS", payload: updated });
    toast({ status: "success", title: "Note updated" });
    setIsEditing(false);
  }, [dispatch, draft, items, note, toast]);

  const handleDelete = useCallback(() => {
    if (!note) return;
    const filtered = items.filter((item) => item.id !== note.id);
    dispatch({ type: "GET_NOTES_SUCCESS", payload: filtered });
    toast({ status: "info", title: "Note deleted" });
    navigate("/notes");
  }, [dispatch, items, navigate, note, toast]);

  const renderBody = () => {
    if (!note) return null;
    if (isRichContent(note.body)) {
      return (
        <Box
          sx={{
            "& h1, & h2, & h3": {
              fontWeight: "semibold",
              marginBottom: 2,
              marginTop: 6,
            },
            "& ul": {
              listStyle: "disc",
              paddingLeft: "1.25rem",
              marginBottom: 4,
            },
            "& ol": {
              listStyle: "decimal",
              paddingLeft: "1.25rem",
              marginBottom: 4,
            },
            "& p": {
              marginBottom: 4,
            },
          }}
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      );
    }
    return (
      <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-line">
        {note.body}
      </Text>
    );
  };

  const loadingState = (
    <Stack spacing={6}>
      <Skeleton height="40px" borderRadius="lg" />
      <Skeleton height="360px" borderRadius="2xl" />
      <SkeletonText noOfLines={8} spacing="4" />
    </Stack>
  );

  const errorState = (
    <Alert status="error" borderRadius="xl">
      <AlertIcon />
      Unable to load this note. Try returning to your notes list.
    </Alert>
  );

  const missingNoteState = (
    <Alert status="warning" borderRadius="xl">
      <AlertIcon />
      This note could not be found.
    </Alert>
  );

  const showAlert = hasErrors ? errorState : missingNoteState;

  return (
    <Container maxW="5xl" py={{ base: 8, md: 12 }}>
      <Stack spacing={6}>
        <IconButton
          as={RouterLink}
          to="/notes"
          alignSelf="flex-start"
          aria-label="Back to notes"
          icon={<FiArrowLeft />}
          variant="ghost"
        />

        {loading && !note ? loadingState : null}

        {!loading && !note ? showAlert : null}

        {note ? (
          <Box
            borderWidth="1px"
            borderColor={cardBorder}
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            bg={cardBg}
          >
            {!isEditing ? (
              <Stack spacing={6}>
                <Flex align={{ base: "flex-start", md: "center" }} gap={4}>
                  <Box flex="1">
                    <Heading size="2xl">{note.title}</Heading>
                    <Text mt={2} color={subtleText}>
                      {note.type.toUpperCase()} · {formatTimestamp(note)}
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Edit note"
                    icon={<FiEdit3 />}
                    variant="outline"
                    onClick={handleStartEditing}
                  />
                </Flex>

                {note.mediaUrl ? (
                  <Box borderRadius="2xl" overflow="hidden">
                    <Image
                      src={note.mediaUrl}
                      alt={note.title}
                      w="100%"
                      objectFit="cover"
                      maxH="480px"
                    />
                  </Box>
                ) : null}

                <Stack spacing={4}>{renderBody()}</Stack>

                {note.tags.length ? (
                  <Stack spacing={2}>
                    <Wrap shouldWrapChildren spacing={2}>
                      {note.tags.map((tag) => (
                        <WrapItem key={`${note.id}-${tag}`}>
                          <Tag
                            colorScheme="brand"
                            variant="subtle"
                            borderRadius="full"
                          >
                            <TagLabel>{tag}</TagLabel>
                            <TagCloseButton pointerEvents="none" aria-hidden />
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Stack>
                ) : null}
              </Stack>
            ) : (
              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={draft?.title ?? ""}
                    onChange={(event) =>
                      handleFieldChange("title", event.target.value)
                    }
                    size="lg"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Body</FormLabel>
                  <RichTextEditor
                    value={draft?.body ?? ""}
                    onChange={(value) => handleFieldChange("body", value)}
                    placeholder="Start writing or use the toolbar for formatting..."
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Media URL</FormLabel>
                  <Input
                    value={draft?.mediaUrl ?? ""}
                    onChange={(event) =>
                      handleFieldChange("mediaUrl", event.target.value)
                    }
                    placeholder="https://"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Tags</FormLabel>
                  <Input
                    placeholder="Press Enter to add tag"
                    value={tagInput}
                    onChange={(event) => setTagInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                </FormControl>
                <Wrap shouldWrapChildren spacing={2}>
                  {draft?.tags.map((tag) => (
                    <WrapItem key={`draft-${tag}`}>
                      <Tag
                        size="md"
                        variant="subtle"
                        colorScheme="brand"
                        borderRadius="full"
                      >
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>

                <Flex gap={3} flexWrap="wrap">
                  <Button colorScheme="brand" onClick={handleSave}>
                    Save changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEditing}>
                    Cancel
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDelete}
                  >
                    Delete note
                  </Button>
                </Flex>
              </Stack>
            )}
          </Box>
        ) : null}
      </Stack>
    </Container>
  );
};

export default NoteDetailPage;
