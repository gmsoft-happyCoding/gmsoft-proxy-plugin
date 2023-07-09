import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "src/main/main.ts",
        preload: "src/preload/preload.ts",
      },
      output: {
        format: "commonjs",
        entryFileNames: "dist/[name].js",
      },
    },
  },
});
