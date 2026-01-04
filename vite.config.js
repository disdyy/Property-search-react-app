import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/Property-search-react-app/",
  plugins: [react()],
  test: {
    environment: "node",
  },
});