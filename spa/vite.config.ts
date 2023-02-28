import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import devcert from 'devcert'
// import fs from 'node:fs'

export default defineConfig({
  base: '',
  build: {
    outDir: '../gawa/assets/spa',
    // assetsDir: 'resource',
    assetsDir: '', // 階層を作るとなぜかエラーになる対応： Error: Unable to load asset: "assets/resource/index-0e80a7d2.js". I/chromium( 4236): [INFO:CONSOLE(0)] "Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.", source: http://localhost:3000/assets/resource/index-0e80a7d2.js (0)
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    open: true,
    // host: '127.0.0.1',
    host: '0.0.0.0',
    port: 3000,
    https: {
      // key: (fs.readFileSync('../cert/localhost-key.pem')),
      // cert: (fs.readFileSync('../cert/localhost.pem')),
      key: (await devcert.certificateFor('localhost')).key,
      cert: (await devcert.certificateFor('localhost')).cert,
    },
  },
})
