import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",          // important: ensures assets load from root
  build: {
    chunkSizeWarningLimit: 2000
  }
});
