import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import type { Note } from "../types";

type StatsPanelProps = {
  notes: Note[];
};

const statsConfig = [
  { key: "text", label: "Text" },
  { key: "image", label: "Image" },
  { key: "audio", label: "Audio" },
] as const;

export const StatsPanel: FC<StatsPanelProps> = ({ notes }) => {
  const subtextColor = useColorModeValue("gray.600", "gray.300");
  const total = notes.length;
  const counts = statsConfig.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.key] = notes.filter(note => note.type === entry.key).length;
    return acc;
  }, {});

  return (
    <Box>
      <Heading size="sm" mb={3}>
        Notes Overview
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        <Stat>
          <StatLabel>Total Notes</StatLabel>
          <StatNumber>{total}</StatNumber>
          <StatHelpText color={subtextColor}>Across all types</StatHelpText>
        </Stat>
        {statsConfig.map(entry => (
          <Stat key={entry.key}>
            <StatLabel>{entry.label}</StatLabel>
            <StatNumber>{counts[entry.key]}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>
    </Box>
  );
};
