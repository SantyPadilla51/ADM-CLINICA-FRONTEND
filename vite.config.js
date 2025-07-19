import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "2022-2802-8010-499f-f301-c986-6849-f2d3-64ad.ngrok-free.app",
    ],
  },
});
