import type { Note, NoteType } from "../types";

type PlaceholderPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const NOTE_TYPES: NoteType[] = ["text", "image", "audio"];
const TAG_POOL = ["product", "idea", "personal", "audio", "design", "research"];

const pickType = (seed: number): NoteType =>
  NOTE_TYPES[seed % NOTE_TYPES.length];

const pickTags = (seed: number): string[] => {
  const tagCount = (seed % 3) + 1;
  const tags = new Set<string>();
  for (let i = 0; i < tagCount; i += 1) {
    tags.add(TAG_POOL[(seed + i) % TAG_POOL.length]);
  }
  return Array.from(tags);
};

const resolveMediaUrl = (type: NoteType, seed: number): string | null => {
  if (type !== "image") return null;
  return `https://picsum.photos/id/${seed.toString()}/1200`;
};

const transformToNote = (post: PlaceholderPost): Note => {
  const type = pickType(post.id);
  return {
    id: post.id,
    type,
    title: post.title,
    body: post.body,
    mediaUrl: resolveMediaUrl(type, post.id),
    createdAt: new Date(Date.now() - post.id * 86400000).toISOString(),
    tags: pickTags(post.userId + post.id),
  };
};

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = (await response.json()) as PlaceholderPost[];
  return data.slice(0, 20).map(transformToNote);
};
