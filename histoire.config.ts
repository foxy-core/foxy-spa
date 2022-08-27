import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: path.resolve(__dirname, 'stories/setup/index.ts'),
})
