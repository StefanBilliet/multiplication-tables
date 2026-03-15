import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

const localStorageFilePath = resolve(
  import.meta.dirname,
  ".vitest-localstorage",
);

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    execArgv: [`--localstorage-file=${localStorageFilePath}`],
  },
});
