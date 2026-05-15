import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'singlefile' ? [viteSingleFile()] : [],
  build: {
    outDir: mode === 'singlefile' ? 'dist-single' : 'dist',
    assetsInlineLimit: mode === 'singlefile' ? 100000000 : 4096,
    cssCodeSplit: mode !== 'singlefile',
    rollupOptions: mode === 'singlefile' ? {
      output: { inlineDynamicImports: true }
    } : undefined
  }
}))
