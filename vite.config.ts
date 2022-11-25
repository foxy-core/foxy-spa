import * as path from 'path'

import vue from '@vitejs/plugin-vue'
import { minify as minifyHtml } from 'html-minifier'
import { nanoid } from 'nanoid'
import analyze from 'rollup-plugin-analyzer'
import visualize from 'rollup-plugin-visualizer'
import unpluginIcons from 'unplugin-icons/vite'
import { defineConfig, Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

const minifyHtmlPlugin = (): Plugin => ({
  name: 'foxy:minify-html',
  transformIndexHtml: source => {
    const minified = minifyHtml(source, {
      html5: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      collapseBooleanAttributes: true,
      keepClosingSlash: false,
      removeAttributeQuotes: true,
    })

    return minified
  },
})

const addVersionToHtmlPlugin = ({
  name,
  version,
}: {
  name: string
  version: string
}): Plugin => ({
  name: 'foxy:add-version-to-html',
  transformIndexHtml: source => {
    const NAME_TEMPLATE = '<!--project-name-->'
    const VERSION_TEMPLATE = '<!--project-version-->'

    return source
      .replace(VERSION_TEMPLATE, version)
      .replace(NAME_TEMPLATE, name)
  },
})

const VERSION = nanoid(10)
const NAME = 'foxy'

console.log('[REVISION]', NAME, VERSION)

export default defineConfig(({ command }) => {
  const IS_BUILD = command === 'build'

  return {
    plugins: [
      vue(),

      VitePWA({
        injectRegister: 'auto',
        registerType: 'autoUpdate',

        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{woff2,ttf}'],
        },

        manifest: {
          name: 'Foxy',
          short_name: 'Foxy',
          theme_color: '#ff740f',
          lang: 'ru',
          description: 'Made for people to connect',
          display: 'standalone',

          icons: [
            {
              src: 'pwa-icon/pwa-icon_vector.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
            },
            {
              src: 'pwa-icon/pwa-icon96.png',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: 'pwa-icon/pwa-icon144.png',
              sizes: '144x144',
              type: 'image/png',
            },
            {
              src: 'pwa-icon/pwa-icon192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-icon/pwa-icon512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),

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

      addVersionToHtmlPlugin({
        version: VERSION,
        name: NAME,
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
          ['vue-chunk']: ['vue', 'vue-router'],
          ['vendors-chunk']: ['axios', 'zod'],
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
