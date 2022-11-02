import * as path from 'path'

import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'
import * as colors from 'tailwindcss/colors'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: path.resolve(__dirname, 'stories/setup/index.ts'),
  vite: {
    server: {
      host: true,
    },
  },
  theme: {
    title: 'Foxy Design',
    colors: {
      primary: colors.orange,
    },
    logo: {
      light: path.resolve(__dirname, 'src/assets/svg/foxy-main-logo.svg'),
      dark: path.resolve(__dirname, 'src/assets/svg/foxy-main-logo.svg'),
      square: path.resolve(__dirname, 'src/assets/svg/foxy-main-logo.svg'),
    },
  },
})
