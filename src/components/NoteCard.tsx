import {
  Card,
  CardBody,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import type { Post } from "../types";

type NoteCardProps = {
  post: Post;
};

export const NoteCard: FC<NoteCardProps> = ({ post }) => {
  const bodyColor = useColorModeValue("gray.600", "gray.300");
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
        <Heading size="md" mb={2}>
          {post.title}
        </Heading>
        <Text color={bodyColor}>{post.body.substring(0, 120)}...</Text>
      </CardBody>
    </Card>
  );
};
