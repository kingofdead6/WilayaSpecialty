import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`            → normal multi-file build in dist/ (deploy anywhere, e.g. Vercel)
// `npm run build:single`     → one self-contained index.html in dist-single/
export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: single
      ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000 }
      : { outDir: 'dist' },
  }
})
