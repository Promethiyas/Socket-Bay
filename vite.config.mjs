import * as Vite from 'vite'
import ViteReact from '@vitejs/plugin-react'

export default Vite.defineConfig({
  root: 'src/front',
  build: {
    emptyOutDir: true,
    minify: true,
    outDir: '../../dist/front'
  },
  plugins: [
    ViteReact()
  ]
})
