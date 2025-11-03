import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to your repository name for GitHub Pages deployment
  // For example, if your repo is 'https://github.com/user/my-math-app',
  // set base to '/my-math-app/'
  base: '/math-racers/',
})
