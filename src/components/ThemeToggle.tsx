import { IconButton, Tooltip } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import type { RootState, ThemePreference } from "../types";
import { persistThemePreference } from "../reducers/uiReducer";

const THEME_ORDER: ThemePreference[] = ["light", "dark"];
const ICONS: Record<ThemePreference, ReactElement> = {
  light: <FiSun />,
  dark: <FiMoon />,
};

export const ThemeToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const preference = useSelector((state: RootState) => state.ui.theme);

  const handleToggle = () => {
    const next =
      THEME_ORDER[(THEME_ORDER.indexOf(preference) + 1) % THEME_ORDER.length];
    dispatch(persistThemePreference(next));
  };

  return (
    <Tooltip label={`Switch theme (current: ${preference})`} placement="bottom">
      <IconButton
        aria-label={`Switch to ${preference === "light" ? "dark" : "light"} mode`}
        icon={ICONS[preference]}
        variant="outline"
        borderRadius="xl"
        onClick={handleToggle}
      />
    </Tooltip>
  );
};
