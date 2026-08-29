import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("@chakra-ui/react") ||
              id.includes("@emotion/react") ||
              id.includes("@emotion/styled")
            ) {
              return "chakra";
            }
            if (
              id.includes("react-redux") ||
              id.includes("@reduxjs/toolkit")
            ) {
              return "redux";
            }
            if (
              id.includes("react-router-dom") ||
              id.includes("react-router")
            ) {
              return "router";
            }
          },
        },
      },
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      css: false,
    },
  };
});
