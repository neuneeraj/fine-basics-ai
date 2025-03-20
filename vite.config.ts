import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, "client/public"),
  root: path.resolve(__dirname, "client"), // Explicit root
  base: "/", // Ensure correct base path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client/index.html") // Explicit entry
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      },
      onwarn(warning, warn) { // Added warning handler
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      }
    }
  }
});