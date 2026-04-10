import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    shopify({
      themeRoot: '.',
      sourceCodeDir: 'src',
      entrypointsDir: 'src/entrypoints',
      snippetFile: 'vite.liquid'
    })
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  build: {
    emptyOutDir: false,
    sourcemap: true
  }
})
