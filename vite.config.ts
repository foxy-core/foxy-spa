import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import unpluginIcons from 'unplugin-icons/vite'
import svgLoader from 'vite-svg-loader'
import analyze from 'rollup-plugin-analyzer'
import visualize from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),

    unpluginIcons({
      autoInstall: true,
      compiler: 'vue3',
    }),

    svgLoader({
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: 'removeDimensions',
          },
        ],
      },
    }),

    analyze(),
    visualize({
      filename: path.resolve(__dirname, 'dist/_/dev/stats.html'),
    }),
  ],
  build: {
    rollupOptions: {
      manualChunks: {
        'vue-chunk': ['vue', 'vue-router'],
        'vendors-chunk': ['axios', 'zod'],
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: path.resolve(__dirname, 'src/') + '/',
      },
      {
        find: '@@/',
        replacement: path.resolve(__dirname, 'src/_app/') + '/',
      },
    ],
  },
})
