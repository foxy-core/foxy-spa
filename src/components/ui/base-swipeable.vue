<template>
  <div
    class="origin-bottom touch-manipulation transform-gpu will-change-transform select-none relative group/swipeable"
    :class="(disabled || isDone) && 'pointer-events-none'"
    :style="styles"
    @mousedown.left="startSwipe(false)"
    @touchstart="startSwipe(true)"
  >
    <div
      v-memo="[isIconTriggered, isSwipeTriggered]"
      class="w-full h-full transition-[filter] will-change-[filter] duration-500 ease-out"
      :class="{
        [animationType === 'blur' ? 'blur-[2px]' : 'brightness-95']:
          isIconTriggered && !isSwipeTriggered,
        [animationType === 'blur' ? 'blur-sm' : 'brightness-90']:
          isSwipeTriggered,
      }"
    >
      <slot :is-held="isHeld"></slot>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        v-memo="[isIconTriggered, isSwipeTriggered, direction]"
        class="transition-transform transform-gpu will-change-transform duration-500 remove-second-child"
        :class="isSwipeTriggered && 'scale-125'"
      >
        <CustomTransition type="pop">
          <slot
            v-if="isIconTriggered && direction === Direction.Left"
            name="on-left"
          ></slot>
          <slot
            v-if="isIconTriggered && direction === Direction.Right"
            name="on-right"
          ></slot>
        </CustomTransition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computedWithControl } from '@vueuse/shared'
  import { computed, onBeforeUnmount, ref, watch } from 'vue'

  import { Direction } from '@@/shared/ui-utils'

  import CustomTransition from './custom-transition.vue'

  export type AnimationType = 'blackout' | 'blur'

  const END_TRANSITION_DURATION = 600

  const props = withDefaults(
    defineProps<{
      iconTriggerValue?: number
      swipeTriggerValue?: number
      disabled?: boolean
      animationType?: AnimationType
    }>(),
    {
      iconTriggerValue: 40,
      swipeTriggerValue: 90,
      disabled: false,
      animationType: 'blackout',
    },
  )

  watch(
    () => props.disabled,
    v => {
      console.log(v)
    },
  )

  const emit = defineEmits<{
    (event: 'swipe', direction: 'left' | 'right'): void
    (event: 'shouldUnmount'): void
  }>()

  const rootRef = ref<HTMLDivElement>()

  const initialProperties = {
    x: 0,
    rotateZ: 0,
    opacity: 1,
  }
  const properties = ref({ ...initialProperties })

  const transitionDuration = computed(() => {
    if (isDone.value) {
      return END_TRANSITION_DURATION
    }

    const p = Math.abs(previousOffset.value)

    return offset.value === 0
      ? p < 10
        ? 300
        : p < 50
        ? 450
        : p < 120
        ? 500
        : p < 200
        ? 600
        : 700
      : 0
  })

  const styles = computed(() => ({
    transform: `translateX(${properties.value.x}px) rotateZ(${properties.value.rotateZ}deg)`,
    opacity: properties.value.opacity,
    transitionProperty: 'transform opacity',
    transitionDuration: `${transitionDuration.value}ms`,
    transitionTimingFunction: 'cubic-bezier(.28,.06,.12,1.2)',
  }))

  const propertiesNames = ['x', 'rotateZ', 'opacity'] as const
  const stopTransitions = () => (properties.value = { ...initialProperties })

  const setMotionProperty =
    (prop: keyof typeof initialProperties) => (value: number) =>
      (properties.value[prop] = value)

  const [setX, setRotateZ, setOpacity] = propertiesNames.map(setMotionProperty)

  const offset = ref(0)
  const previousOffset = ref(0)

  const eventTimestamp = ref<number | null>(null)
  const previousEventTimestamp = ref<number | null>(null)

  const isHeld = ref(false)
  const isDone = ref(false)

  const velocity = computedWithControl(
    () => eventTimestamp.value,
    () =>
      eventTimestamp.value === null ||
      previousEventTimestamp.value === null ||
      eventTimestamp.value === previousEventTimestamp.value
        ? 0
        : (offset.value - previousOffset.value) /
          (eventTimestamp.value - previousEventTimestamp.value),
  )

  const direction = computed(() => {
    if (offset.value !== 0) {
      return ~Math.sign(offset.value) ? Direction.Right : Direction.Left
    }

    return Direction.NA
  })

  const isTriggered = (value: number, trigger: number) =>
    Math.abs(value) >= trigger

  const isIconTriggered = computed(() =>
    isTriggered(offset.value, props.iconTriggerValue),
  )

  const isSwipeTriggered = computed(
    () =>
      (isTriggered(offset.value, props.swipeTriggerValue) &&
        (Math.sign(offset.value) === Math.sign(velocity.value) ||
          Math.abs(velocity.value) < 0.08)) ||
      (direction.value !== Direction.NA &&
        isTriggered(velocity.value, 0.6) &&
        Math.sign(offset.value) === Math.sign(velocity.value)),
  )

  const move = (movementX: number, timestamp: number) => {
    previousEventTimestamp.value = eventTimestamp.value
    previousOffset.value = offset.value

    offset.value += movementX
    eventTimestamp.value = timestamp

    setX(offset.value)
    setRotateZ(
      Math.sign(offset.value) * Math.sqrt(Math.abs(offset.value * 0.065)),
    )
  }

  const startSwipe = (isTouch: boolean) => {
    isHeld.value = true
    offset.value = 0
    lastPageX.value = null

    stopTransitions()

    if (isTouch) {
      document.addEventListener('touchend', endSwipe)
      document.addEventListener('touchmove', listenerFnTouch)
    } else {
      document.addEventListener('mouseup', endSwipe)
      document.addEventListener('mousemove', listenerFnMouse)
    }
  }

  const endSwipe = () => {
    isHeld.value = false

    removeListeners()

    if (isSwipeTriggered.value) {
      moveOffTheScreen()
      emitSwipe()
      isDone.value = true

      setTimeout(emitShouldUnmount, END_TRANSITION_DURATION)
    } else {
      returnToStart()
    }

    offset.value = 0
    lastPageX.value = null
  }

  const returnToStart = () => {
    stopTransitions()

    setX(initialProperties.x)
    setRotateZ(initialProperties.rotateZ)
    setOpacity(initialProperties.opacity)
  }

  const END_X_POSITION = 600
  const END_ROTATION = 20
  const moveOffTheScreen = () => {
    stopTransitions()

    setOpacity(0)

    if (direction.value === Direction.Left) {
      setX(-END_X_POSITION)
      setRotateZ(-END_ROTATION)
    } else {
      setX(END_X_POSITION)
      setRotateZ(END_ROTATION)
    }
  }

  const emitSwipe = () => {
    emit('swipe', direction.value as 'left' | 'right')
  }

  const emitShouldUnmount = () => {
    emit('shouldUnmount')
  }

  const lastPageX = ref<number | null>(null)
  const listenerFnTouch = (e: TouchEvent) => {
    const currentPageX = e.touches.item(0)?.pageX ?? 0

    if (lastPageX.value !== null) {
      move(currentPageX - lastPageX.value, e.timeStamp)
    }

    lastPageX.value = currentPageX
  }

  const listenerFnMouse = (e: MouseEvent) => {
    move(e.movementX, e.timeStamp)
  }

  const removeListeners = () => {
    document.removeEventListener('mouseup', endSwipe)
    document.removeEventListener('mousemove', listenerFnMouse)
    document.removeEventListener('touchend', endSwipe)
    document.removeEventListener('touchmove', listenerFnTouch)
  }

  onBeforeUnmount(removeListeners)
</script>

<style scoped>
  .remove-second-child > *:nth-child(2) {
    display: none;
  }
</style>
