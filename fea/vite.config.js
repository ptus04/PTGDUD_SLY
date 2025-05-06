import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://192.168.2.62:8080",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
