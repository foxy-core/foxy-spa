const SPLASH_ANIMATION_DURATION = 500

export const unmountSplashScreen = () => {
  const element = document.getElementById('splash')

  element?.classList.add('splash-fade-out')

  setTimeout(() => element?.remove(), SPLASH_ANIMATION_DURATION)
}
