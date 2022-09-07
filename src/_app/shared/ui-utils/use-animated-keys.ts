import { ref } from 'vue'

export const useAnimatedKeys = (duration: number) => {
  const animatedKeys = ref<string[]>([])

  const animate = (key: string) => {
    animatedKeys.value.push(key)
    setTimeout(() => {
      animatedKeys.value = animatedKeys.value.filter(v => v !== key)
    }, duration)
  }

  return {
    animatedKeys,
    animate,
  }
}
