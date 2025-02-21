import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",  // Proxy to your local backend during development
        changeOrigin: true,               // Optional, ensures that the host header is set correctly
        secure: false,                    // Optional, useful if you're running a local server without SSL
      },
    },
  },
 });
