import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import type { Note } from "../types";

type CreateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: Omit<Note, "id" | "createdAt">) => Promise<void>;
};

const TAG_PRESETS = ["idea", "product", "design", "research"];

const defaultForm = {
  title: "",
  body: "",
  type: "text" as Note["type"],
  mediaUrl: "",
  tags: [] as string[],
};

export const CreateNoteModal: FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const toast = useToast();
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) {
      toast({ status: "warning", title: "Title is required" });
      return;
    }
    setSubmitting(true);
    try {
      await onCreate({
        title: form.title,
        body: form.body,
        type: form.type,
        mediaUrl: form.mediaUrl || null,
        tags: form.tags,
      });
      setForm(defaultForm);
      onClose();
      toast({ status: "success", title: "Note created" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({ status: "error", title: "Failed to create note" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} borderRadius="2xl">
        <ModalHeader>Create Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={["text", "image", "audio"].indexOf(form.type)}
            onChange={(index) =>
              setForm((prev) => ({
                ...prev,
                type: ["text", "image", "audio"][index] as Note["type"],
              }))
            }
            mb={4}
          >
            <TabList>
              <Tab>Text</Tab>
              <Tab>Image</Tab>
              <Tab>Audio</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={form.title}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Add a title"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Body</FormLabel>
                  <Textarea
                    rows={4}
                    value={form.body}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, body: event.target.value }))
                    }
                    placeholder="Capture your ideas..."
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={form.title}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Image title"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    value={form.mediaUrl}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        mediaUrl: event.target.value,
                      }))
                    }
                    placeholder="https://"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={3}
                    value={form.body}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, body: event.target.value }))
                    }
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={form.title}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Audio summary"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Notes</FormLabel>
                  <Textarea
                    rows={3}
                    value={form.body}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, body: event.target.value }))
                    }
                    placeholder="Add context for your audio clip"
                  />
                </FormControl>
                <Box mt={4} fontSize="sm" color="gray.500">
                  Audio uploads will hook into Supabase in Phase 5. For now, jot
                  down what you captured.
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <FormControl>
            <FormLabel>Tags</FormLabel>
            <Select
              placeholder="Select a tag"
              value=""
              onChange={(event) => {
                const tag = event.target.value;
                if (!tag) return;
                setForm((prev) => ({
                  ...prev,
                  tags: Array.from(new Set([...prev.tags, tag])),
                }));
              }}
            >
              {TAG_PRESETS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Select>
            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
              {form.tags.map((tag) => (
                <Button
                  key={tag}
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((item) => item !== tag),
                    }))
                  }
                >
                  {tag} ×
                </Button>
              ))}
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            type="submit"
            isLoading={submitting}
            borderRadius="xl"
          >
            Save Note
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
