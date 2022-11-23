<template>
  <div
    ref="rootRef"
    class="origin-bottom touch-manipulation select-none relative group/swipeable"
    :class="disabled && 'pointer-events-none'"
    @mousedown.left="startSwipe(false)"
    @touchstart="startSwipe(true)"
  >
    <div
      class="w-full h-full transition-all transform-gpu duration-500 ease-out"
      :class="{
        'blur-[2px]': isIconTriggered && !isSwipeTriggered,
        'blur-sm': isSwipeTriggered,
      }"
    >
      <slot :is-held="isHeld"></slot>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        class="transition-transform transform-gpu duration-500 remove-second-child"
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
  import {
    TransformProperties,
    useMotionProperties,
    useMotionTransitions,
  } from '@vueuse/motion'
  import { computedWithControl } from '@vueuse/shared'
  import { computed, onBeforeUnmount, ref, watch } from 'vue'

  import { Direction } from '@@/shared/ui-utils'

  import CustomTransition from './custom-transition.vue'

  const props = withDefaults(
    defineProps<{
      iconTriggerValue?: number
      swipeTriggerValue?: number
      disabled?: boolean
    }>(),
    {
      iconTriggerValue: 40,
      swipeTriggerValue: 90,
      disabled: false,
    },
  )

  const emit = defineEmits<{
    (event: 'swipe', direction: 'left' | 'right'): void
  }>()

  const rootRef = ref<HTMLDivElement>()

  const springOptions = { type: 'spring', bounce: 0.25 }
  const keyframesOptions = { type: 'keyframes', duration: 0.1 }

  const initialProperties = {
    x: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
  }

  const properties = ['x', 'rotateZ', 'scale', 'opacity']

  const { motionProperties: _motionProperties } = useMotionProperties(
    rootRef,
    initialProperties,
  )

  const motionProperties = _motionProperties as TransformProperties

  const { push, stop } = useMotionTransitions()

  const stopTransitions = () => stop(properties)

  const setMotionProperty =
    (prop: string) =>
    (value: number, isKeyframes = false) => {
      push(
        prop,
        value,
        motionProperties,
        isKeyframes ? keyframesOptions : springOptions,
      )
    }

  const [setX, setRotateZ, setScale, setOpacity] =
    properties.map(setMotionProperty)

  const offset = ref(0)
  const previousOffset = ref(0)

  const eventTimestamp = ref<number | null>(null)
  const previousEventTimestamp = ref<number | null>(null)

  const isHeld = ref(false)

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

    setX(offset.value, true)
    setRotateZ(
      Math.sign(offset.value) * Math.sqrt(Math.abs(offset.value * 0.065)),
      true,
    )
  }

  const startSwipe = (isTouch: boolean) => {
    isHeld.value = true
    offset.value = motionProperties.x as number
    lastPageX.value = null

    stopTransitions()

    setScale(1.02)

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
    } else {
      returnToStart()
    }

    offset.value = 0
    lastPageX.value = null
  }

  const returnToStart = () => {
    stopTransitions()

    setScale(initialProperties.scale)
    setX(initialProperties.x)
    setRotateZ(initialProperties.rotateZ)
    setOpacity(initialProperties.opacity)
  }

  const END_X_POSITION = 600
  const END_ROTATION = 20
  const moveOffTheScreen = () => {
    stopTransitions()

    setScale(initialProperties.scale)
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
