import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Piano Theory",
        short_name: "Piano Theory",
        description: "Learn piano theory",
        display: "fullscreen",
        theme_color: "#555555",
        prefer_related_applications: false,
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    sentryVitePlugin({
      org: "josh-richards-projects",
      project: "piano-theory",
    }),
  ],

  build: {
    sourcemap: true,
  },
});
