import { defineConfig } from 'vite'
import shopify from 'vite-plugin-shopify'
import autoprefixer from 'autoprefixer'

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
