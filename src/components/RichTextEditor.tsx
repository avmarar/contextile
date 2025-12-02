import { useEffect, useRef } from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  FiBold,
  FiImage,
  FiHash,
  FiItalic,
  FiList,
  FiMic,
  FiType,
  FiUnderline,
} from "react-icons/fi";

type ToolbarButton = {
  label: string;
  icon: IconType;
  command: string;
  value?: string;
};

const TOOLBAR_BUTTONS: ToolbarButton[] = [
  { label: "Bold", icon: FiBold, command: "bold" },
  { label: "Italic", icon: FiItalic, command: "italic" },
  { label: "Underline", icon: FiUnderline, command: "underline" },
  { label: "Heading", icon: FiType, command: "formatBlock", value: "h2" },
  { label: "Bullet List", icon: FiList, command: "insertUnorderedList" },
  { label: "Numbered List", icon: FiHash, command: "insertOrderedList" },
];

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const toolbarBg = useColorModeValue("gray.50", "whiteAlpha.100");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const toast = useToast();

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.innerHTML !== value) {
      editor.innerHTML = value || "";
    }
  }, [value]);

  const emitChange = () => {
    onChange(editorRef.current?.innerHTML ?? "");
  };

  const applyCommand = (command: string, valueArg?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    try {
      document.execCommand(command, false, valueArg ?? undefined);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.warn("Unable to run rich text command", command);
    }

    emitChange();
  };

  const showUploadToast = (type: "image" | "audio") => {
    toast({
      status: "info",
      title: `${type === "image" ? "Image" : "Audio"} upload placeholder`,
      description:
        "Media uploads will hook into storage soon. For now paste a link or type context manually.",
      duration: 4000,
    });
  };

  const handlePlaceholderUpload = (type: "image" | "audio") => {
    const ref =
      type === "image" ? imageInputRef.current : audioInputRef.current;
    ref?.click();
  };

  const handleFilePicked = (type: "image" | "audio") => {
    showUploadToast(type);
    const ref =
      type === "image" ? imageInputRef.current : audioInputRef.current;
    if (ref) {
      ref.value = "";
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
    >
      <Box
        px={2}
        py={1}
        bg={toolbarBg}
        borderBottomWidth="1px"
        borderColor={borderColor}
      >
        <ButtonGroup size="sm" variant="ghost">
          {TOOLBAR_BUTTONS.map((button) => (
            <Tooltip key={button.label} label={button.label}>
              <IconButton
                aria-label={button.label}
                icon={<button.icon />}
                onClick={() => applyCommand(button.command, button.value)}
              />
            </Tooltip>
          ))}
          <Tooltip label="Upload image (placeholder)">
            <IconButton
              aria-label="Upload image"
              icon={<FiImage />}
              onClick={() => handlePlaceholderUpload("image")}
            />
          </Tooltip>
          <Tooltip label="Upload audio (placeholder)">
            <IconButton
              aria-label="Upload audio"
              icon={<FiMic />}
              onClick={() => handlePlaceholderUpload("audio")}
            />
          </Tooltip>
        </ButtonGroup>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={() => handleFilePicked("image")}
        />
        <input
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          style={{ display: "none" }}
          onChange={() => handleFilePicked("audio")}
        />
      </Box>
      <Box>
        <Box
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          minH="240px"
          p={4}
          fontSize="md"
          lineHeight="tall"
          onInput={emitChange}
          data-placeholder={placeholder ?? ""}
          sx={{
            cursor: "text",
            "&:focus": { outline: "none" },
            "&:empty::before": {
              content: "attr(data-placeholder)",
              color: "gray.500",
              pointerEvents: "none",
            },
            "& h1, & h2, & h3": {
              fontWeight: "semibold",
              marginBottom: 2,
              marginTop: 4,
            },
            "& ul": {
              paddingLeft: "1.5rem",
              listStyleType: "disc",
            },
            "& ol": {
              paddingLeft: "1.5rem",
              listStyleType: "decimal",
            },
            "& blockquote": {
              borderLeftWidth: "4px",
              borderColor: borderColor,
              paddingLeft: 4,
              color: "gray.500",
              fontStyle: "italic",
            },
            "& p": {
              marginBottom: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
};
