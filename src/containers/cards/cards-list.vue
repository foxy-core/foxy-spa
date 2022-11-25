<template>
  <div
    class="mx-auto max-w-md w-full h-full py-6 flex justify-center items-center relative"
  >
    <div
      v-for="card in cards"
      :key="card.id"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] z-40"
      :class="disabledCards.includes(card.id) && 'pointer-events-none'"
    >
      <BaseSwipeable
        class="w-full h-full rounded-2xl shadow-xl overflow-hidden"
        :animation-type="isIOs || isMacOs ? 'blur' : 'blackout'"
        @should-unmount="onCardUnmount()"
        @swipe="onSwipe(card.id)"
      >
        <template #on-left>
          <FluentHeartBroken24Filled class="icon" />
        </template>
        <template #on-right>
          <FluentHeart24Filled class="icon" />
        </template>

        <template #default>
          <ProfileCardContent
            :card-info="card"
            :scale-transition="isIOs || isMacOs"
          />
        </template>
      </BaseSwipeable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  import ProfileCardContent from '@/components/profile/profile-card-content.vue'
  import BaseSwipeable from '@/components/ui/base-swipeable.vue'
  import { CardVM } from '@@/domain/cards'
  import { getFakeCard } from '@@/shared/fake'
  import { detectIOs, detectMacOs } from '@@/shared/ua-utils'

  import FluentHeart24Filled from '~icons/fluent/heart-24-filled'
  import FluentHeartBroken24Filled from '~icons/fluent/heart-broken-24-filled'

  const isIOs = detectIOs()
  const isMacOs = detectMacOs()

  const onSwipe = (id: string) => {
    cards.unshift(getFakeCard())
    disabledCards.unshift(id)
    console.log(disabledCards)
  }

  const onCardUnmount = () => {
    cards.pop()
    disabledCards.pop()
    console.log(disabledCards)
  }

  const disabledCards = reactive<string[]>([])
  const cards = reactive<CardVM[]>([getFakeCard(), getFakeCard()])
</script>

<style scoped>
  .icon {
    @apply text-red-500/80 w-28 h-28;
  }
</style>
