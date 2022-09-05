import { StoredEnums } from '@@/domain/profiles'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnumsStore = defineStore('layout/enums', () => {
  const enums = ref<StoredEnums | null>(null)

  return {
    enums,
  }
})
