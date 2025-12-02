import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../actions/notesActions";
import type { AppDispatch } from "../store";
import type { Note, RootState } from "../types";

type NoteUpdates = {
  title: string;
  body: string;
  mediaUrl: string;
  tags: string[];
};

type EditorProps = {
  note: Note;
  onSave: (updates: NoteUpdates) => void;
  onDelete: () => void;
};

const NoteEditorContent: FC<EditorProps> = ({ note, onSave, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [mediaUrl, setMediaUrl] = useState(note.mediaUrl ?? "");
  const [tags, setTags] = useState<string[]>(note.tags);

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags(prev => [...prev, trimmed]);
  };

  const removeTag = (value: string) => {
    setTags(prev => prev.filter(tag => tag !== value));
  };

  const mediaPreview = mediaUrl || note.mediaUrl;

  return (
    <Stack spacing={4}>
      <Heading size="lg">{note.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        {note.type.toUpperCase()} ·{" "}
        {new Date(note.createdAt).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>

      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={event => setTitle(event.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Body</FormLabel>
        <Textarea rows={6} value={body} onChange={event => setBody(event.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Media URL</FormLabel>
        <Input
          value={mediaUrl}
          onChange={event => setMediaUrl(event.target.value)}
          placeholder="https://"
        />
      </FormControl>

      {mediaPreview ? (
        <Box borderRadius="xl" overflow="hidden">
          <Image src={mediaPreview} alt={title || note.title} objectFit="cover" w="100%" maxH="360px" />
        </Box>
      ) : null}

      <FormControl>
        <FormLabel>Tags</FormLabel>
        <Input
          placeholder="Press enter to add tag"
          onKeyDown={event => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag(event.currentTarget.value);
              event.currentTarget.value = "";
            }
          }}
        />
      </FormControl>
      <Wrap spacing={2}>
        {tags.map(tag => (
          <WrapItem key={`${note.id}-${tag}`}>
            <Button size="xs" variant="outline" onClick={() => removeTag(tag)}>
              {tag} ×
            </Button>
          </WrapItem>
        ))}
      </Wrap>

      <Stack direction="row" spacing={2}>
        <Button
          colorScheme="brand"
          onClick={() =>
            onSave({
              title,
              body,
              mediaUrl,
              tags,
            })
          }
        >
          Save
        </Button>
        <Button variant="outline" onClick={onDelete}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

const NoteDetailPage: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { items, loading, hasErrors } = useSelector(
    (state: RootState) => state.notes
  );
  const note = items.find(entry => entry.id === Number(noteId));

  useEffect(() => {
    if (!items.length) {
      void dispatch(fetchNotes());
    }
  }, [dispatch, items.length]);

  const closeDetail = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleSave = useCallback(
    (updates: NoteUpdates) => {
      if (!note) return;
      const updated = items.map(item =>
        item.id === note.id
          ? {
              ...item,
              title: updates.title,
              body: updates.body,
              mediaUrl: updates.mediaUrl || null,
              tags: updates.tags,
            }
          : item
      );
      dispatch({ type: "GET_NOTES_SUCCESS", payload: updated });
      toast({ status: "success", title: "Note updated" });
      closeDetail();
    },
    [closeDetail, dispatch, items, note, toast]
  );

  const handleDelete = useCallback(() => {
    if (!note) return;
    const filtered = items.filter(item => item.id !== note.id);
    dispatch({ type: "GET_NOTES_SUCCESS", payload: filtered });
    toast({ status: "info", title: "Note deleted" });
    closeDetail();
  }, [closeDetail, dispatch, items, note, toast]);

  const bodyContent = useMemo(() => {
    if (loading && !note) {
      return (
        <Stack spacing={4}>
          <SkeletonText noOfLines={4} spacing="4" />
        </Stack>
      );
    }
    if (hasErrors) {
      return (
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          Unable to load this note. Try returning to the notes list.
        </Alert>
      );
    }
    if (!note) {
      return (
        <Alert status="warning" borderRadius="xl">
          <AlertIcon />
          This note could not be found.
        </Alert>
      );
    }
    return (
      <NoteEditorContent
        key={note.id}
        note={note}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    );
  }, [handleDelete, handleSave, hasErrors, loading, note]);

  const overlayProps = {
    isOpen: true,
    onClose: closeDetail,
  };

  if (isDesktop) {
    return (
      <Drawer placement="right" size="xl" {...overlayProps}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Note</DrawerHeader>
          <DrawerBody>{bodyContent}</DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" onClick={closeDetail}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Modal {...overlayProps} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeDetail}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteDetailPage;
