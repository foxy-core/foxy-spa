<template>
  <div
    class="mx-auto max-w-md w-full h-full py-6 flex justify-center items-center relative"
  >
    <div
      v-for="(card, i) in cards"
      :key="i"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] z-40"
    >
      <BaseSwipeable
        :key="i"
        class="w-full h-full rounded-2xl shadow-xl overflow-hidden"
        :disabled="i === 0"
        @swipe="onSwipe"
      >
        <template #on-left>
          <FluentHeartBroken24Filled class="icon" />
        </template>
        <template #on-right>
          <FluentHeart24Filled class="icon" />
        </template>

        <template #default>
          <ProfileCardContent :card-info="card" />
        </template>
      </BaseSwipeable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import annaImage from '@/assets/jpg/anna.jpg'
  import ProfileCardContent from '@/components/profile/profile-card-content.vue'
  import BaseSwipeable from '@/components/ui/base-swipeable.vue'
  import { CardVM } from '@@/domain/cards'
  import { LookingFor } from '@@/domain/profiles'

  import FluentHeart24Filled from '~icons/fluent/heart-24-filled'
  import FluentHeartBroken24Filled from '~icons/fluent/heart-broken-24-filled'

  const key = ref(0)

  const reset = () => key.value++

  const onSwipe = (direction: 'left' | 'right') => {
    console.log('swiped', direction)
    setTimeout(reset, 500)
  }

  const cards: CardVM[] = [
    {
      coverImageUrl: annaImage,
      // coverImageUrl: 'https://picsum.photos/720/1280',
      name: 'Анна',
      age: 19,
      location: 'Новосибирск',
      tags: [
        { tag: 'Пеший туризм', isHighlighted: true },
        { tag: 'Пилатес' },
        { tag: 'Инстаграм' },
      ],
      lookingFor: LookingFor.Friendship,
    },
    {
      coverImageUrl: annaImage,
      // coverImageUrl: 'https://picsum.photos/720/1280',
      name: 'Марина',
      age: 18,
      location: 'Линево',
      tags: [
        { tag: 'Алкоголь', isHighlighted: true },
        { tag: 'Рейв' },
        { tag: '/talkiiing' },
      ],
      lookingFor: LookingFor.Friendship,
    },
  ]
</script>

<style scoped>
  .icon {
    @apply text-red-500/80 w-28 h-28;
  }

  .touch-callout-none {
    -webkit-touch-callout: none !important;
  }
</style>
