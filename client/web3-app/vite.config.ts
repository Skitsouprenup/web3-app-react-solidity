import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    //Don't add backslash in the 'alias' keys or else vite-import-analysis
    //will complain
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@comps": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url))
    }
  } 
})