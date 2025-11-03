import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // tailwindcss 임포트
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], 
})
// tailwindcss() 따로 넣어줘야 함