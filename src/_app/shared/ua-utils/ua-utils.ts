export const detectIOs = () =>
  /iPad|iPhone|iPod/.test(navigator.platform) ||
  (navigator.platform.includes('Mac') && 'ontouchend' in document)

export const detectMacOs = () =>
  navigator.platform.includes('Mac') && !('ontouchend' in document)
