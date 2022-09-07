import { inputStyles } from './input.styles'

export const inputNumberStyles = {
  ...inputStyles,
  errorIcon: 'absolute w-6 h-6 text-error-lighter right-20 top-3',
  controlsContainer: 'absolute space-x-1 right-3 top-2.5',
  controlsIcon: (animated?: boolean) => [
    'transition-colors duration-150',
    'w-6 h-6 inline',
    'text-surface-400 media-hover:hover:text-surface-300 active:text-surface-500',
    'cursor-pointer touch-manipulation select-none',
    animated && 'animate-shake',
  ],
}
