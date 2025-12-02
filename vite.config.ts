import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks: {
            chakra: ["@chakra-ui/react", "@emotion/react", "@emotion/styled"],
            redux: ["react-redux", "@reduxjs/toolkit"],
            router: ["react-router-dom"],
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
