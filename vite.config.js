import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/** Use 127.0.0.1 so the proxy always hits IPv4 (avoids some Windows localhost/IPv6 quirks). */
const apiProxy = {
  "/api": {
    target: "http://127.0.0.1:3001",
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: apiProxy,
  },
  /** Same proxy as `vite dev`, so `vite preview` + API on 3001 works (cart / wishlist). */
  preview: {
    proxy: apiProxy,
  },
})
