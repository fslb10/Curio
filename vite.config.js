import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://fslb10.github.io/Curio/ when deployed to GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: process.env.GH_PAGES ? '/Curio/' : '/',
});
