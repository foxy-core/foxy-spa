export const pickerStyles = {
  container: 'flex flex-col w-full space-y-6',
  errorContainer: 'h-8 sticky top-20 mx-auto z-40',
  errorString:
    'bg-opaque-background backdrop-blur-md text-center text-xs h-8 py-2 px-4 text-error-lighter rounded-2xl',
  row: 'ring-inset flex flex-row flex-wrap',
  cellWrapper: 'flex-shrink-0 py-1.5 pr-2 touch-manipulation',
  cell: (shake: boolean, selected: boolean) => [
    'px-4 py-1 rounded-full transition-all duration-100 ease-in-out select-none cursor-pointer',
    selected
      ? 'ring-inset ring-[1.5px] ring-primary-lighter text-surface-800'
      : 'bg-surface-100 text-surface-600 media-hover:hover:bg-surface-50',
    shake && 'animate-shake',
  ],
}
