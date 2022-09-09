import * as path from 'path'
import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import unpluginIcons from 'unplugin-icons/vite'
import svgLoader from 'vite-svg-loader'
import analyze from 'rollup-plugin-analyzer'
import visualize from 'rollup-plugin-visualizer'
import { minify as minifyHtml } from 'html-minifier'

const minifyHtmlPlugin = (): Plugin => ({
  name: 'foxy:minify-html',
  transformIndexHtml: (source, ctx) => {
    const minified = minifyHtml(source, {
      html5: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      collapseBooleanAttributes: true,
      keepClosingSlash: false,
      removeComments: true,
      removeAttributeQuotes: true,
    })

    return minified
  },
})

export default defineConfig(({ command }) => {
  const IS_BUILD = command === 'build'

  return {
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

      IS_BUILD && minifyHtmlPlugin(),

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
    server: {
      port: 3000,
    },
  }
})
