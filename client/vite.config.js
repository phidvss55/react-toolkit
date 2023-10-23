import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".vue",
      ".scss",
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~bootstrap": "bootstrap",
    },
  },
  build: {
    rollupOptions: {
      external: ["graphql"],
    },
  },
  define: {
    global: "window",
  },
  plugins: [react()],
});
