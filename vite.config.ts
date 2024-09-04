import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "@svgr/rollup";
import dotenv from "dotenv";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
dotenv.config();

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "PetSeeker",
    short_name: "PetSeeker",
    description:
      "PetSeeker is an application that helps you find homes for animals",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "./src/shared/assets/pwa87x87.png",
        sizes: "87x87",
        type: "image/png",
      },
      {
        src: "./src/shared/assets/pwa120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "./src/shared/assets/pwa180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "./src/shared/assets/pwa1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  },
};

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  plugins: [react(), svgr(), VitePWA(manifestForPlugin)],

  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_APP_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
