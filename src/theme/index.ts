import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#f5f3ff",
      100: "#e7deff",
      200: "#d1c4ff",
      300: "#b09bff",
      400: "#8c72ff",
      500: "#7740ff",
      600: "#5a2ed4",
      700: "#4121a3",
      800: "#2a156d",
      900: "#1e0c57",
    },
  },
  fonts: {
    heading: '"Work Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  radii: {
    xl: "24px",
    "2xl": "32px",
  },
  shadows: {
    outline: "0 0 0 3px rgba(119, 64, 255, 0.45)",
    glow: "0 25px 80px rgba(23, 14, 46, 0.15)",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      body: {
        fontFamily: "body",
        background: mode("#f8f7fb", "#050714")(props),
        color: mode("gray.900", "gray.50")(props),
        lineHeight: 1.6,
        minHeight: "100vh",
      },
      "#root": {
        minHeight: "100vh",
      },
    }),
  },
});

export default theme;
