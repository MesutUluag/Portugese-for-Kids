import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace with your GitHub repo name for GitHub Pages deployment
// e.g. if repo is github.com/user/portugese-for-kids → base: '/portugese-for-kids/'
export default defineConfig({
  plugins: [react()],
  base: '/Portugese-for-Kids/',
})
