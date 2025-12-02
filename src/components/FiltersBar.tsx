import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import type { NoteTypeFilter, RootState, SortOrder } from "../types";
import { setSearchQuery, setSortOrder, setTypeFilter } from "../reducers/uiReducer";

const TYPE_FILTERS: NoteTypeFilter[] = ["all", "text", "image", "audio"];
const SORT_OPTIONS: SortOrder[] = ["newest", "oldest"];

const formatSortLabel = (value: SortOrder) =>
  value === "newest" ? "Newest first" : "Oldest first";

export const FiltersBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.ui.filters);
  const chipColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  return (
    <HStack
      spacing={4}
      flexWrap="wrap"
      align="center"
      justify="space-between"
    >
      <InputGroup maxW="320px">
        <InputLeftElement pointerEvents="none">
          <Text color={iconColor}>⌕</Text>
        </InputLeftElement>
        <Input
          placeholder="Search notes..."
          value={filters.searchQuery}
          onChange={event => dispatch(setSearchQuery(event.target.value))}
          borderRadius="xl"
        />
      </InputGroup>

      <HStack spacing={3}>
        <ButtonGroup isAttached variant="ghost">
          {TYPE_FILTERS.map(option => (
            <Button
              key={option}
              onClick={() => dispatch(setTypeFilter(option))}
              bg={filters.type === option ? chipColor : "transparent"}
              borderRadius="full"
            >
              {option === "all" ? "All" : option[0].toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </ButtonGroup>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<span style={{ fontSize: "0.85em" }}>▾</span>}
            variant="outline"
            borderRadius="xl"
          >
            {formatSortLabel(filters.sortOrder)}
          </MenuButton>
          <MenuList>
            {SORT_OPTIONS.map(option => (
              <MenuItem
                key={option}
                onClick={() => dispatch(setSortOrder(option))}
              >
                {formatSortLabel(option)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};
