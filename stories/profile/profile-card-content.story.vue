<template>
  <Story title="ProfileCardContent">
    <div
      class="flex w-full max-w-sm h-screen justify-center items-center overflow-hidden"
    >
      <BaseSwipeable
        :key="key"
        class="w-[90%] aspect-[3/5] rounded-2xl shadow-xl overflow-hidden"
        @swipe="onSwipe"
      >
        <template #on-left>
          <FluentHeartBroken24Filled class="icon" />
        </template>
        <template #on-right>
          <FluentHeart24Filled class="icon" />
        </template>

        <template #default>
          <ProfileCardContent :card-info="cardInfo" />
        </template>
      </BaseSwipeable>
    </div>
  </Story>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import ProfileCardContent from '@/components/profile/profile-card-content.vue'
  import BaseSwipeable from '@/components/ui/base-swipeable.vue'
  import { CardVM } from '@@/domain/cards'
  import { LookingFor } from '@@/domain/profiles'

  import annaImage from '../assets/anna.jpg'

  import FluentHeart24Filled from '~icons/fluent/heart-24-filled'
  import FluentHeartBroken24Filled from '~icons/fluent/heart-broken-24-filled'

  const key = ref(0)

  const reset = () => key.value++

  const onSwipe = (direction: 'left' | 'right') => {
    console.log('swiped', direction)
    setTimeout(reset, 500)
  }

  const cardInfo: CardVM = {
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
  }
</script>

<style scoped>
  .icon {
    @apply text-red-500/80 w-28 h-28;
  }

  .touch-callout-none {
    -webkit-touch-callout: none !important;
  }
</style>
