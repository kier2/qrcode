import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync('./certs/localhost-key.pem'),
  //     cert: fs.readFileSync('./certs/localhost.pem'),
  //   },
  //   host: true, // allow LAN access
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
})
