import { defineStore } from 'pinia'
import { ref } from 'vue'

import { StoredEnums } from '@@/domain/profiles'

export const useEnumsStore = defineStore('layout/enums', () => {
  const enums = ref<StoredEnums | null>(null)

  return {
    enums,
  }
})
