import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import unpluginIcons from 'unplugin-icons/vite'
import svgLoader from 'vite-svg-loader'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { optimize as optimizeSvg, OptimizedSvg } from 'svgo'

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
  ],
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
