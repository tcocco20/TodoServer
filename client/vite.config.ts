import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Uncomment if you want to remove /api prefix
      },
      "/auth/google": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth\/google/, ''), // Uncomment if you want to remove /auth/google prefix}
      },
    },
  },
});
