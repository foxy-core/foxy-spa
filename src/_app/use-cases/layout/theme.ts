import { useThemeStore } from '@@/stores/layout'

export const useTheme = () => {
  const store = useThemeStore()

  return store
}
