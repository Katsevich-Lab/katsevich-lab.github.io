import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://katsevich-lab.github.io",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  }
});
