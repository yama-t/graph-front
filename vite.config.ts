/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 3000,
  },
  plugins: [
    react({
      exclude: /\.stories\.(t|j)sx?$/,
    }),
  ],
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
