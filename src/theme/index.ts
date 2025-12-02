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
      50: "#f0f5fb",
      100: "#dce6f5",
      200: "#b5cceb",
      300: "#8fb3e1",
      400: "#6799d7",
      500: "#4e82d9",
      600: "#3a6ea5",
      700: "#244f7f",
      800: "#1b3d64",
      900: "#12263f",
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
