<template>
  <div class="w-full h-full relative">
    <img
      :src="cardInfo.coverImageUrl"
      class="w-full h-full object-cover scale-105 ease-out group-active/swipeable:scale-100 transition-transform duration-500 transform-gpu touch-callout-none"
      :draggable="false"
    />

    <div
      class="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4 container-blackout"
    >
      <div class="w-full flex flex-row justify-between items-center">
        <div
          v-if="cardInfo.lookingFor"
          class="text-xs py-1 px-3 flex flex-row items-center space-x-1.5 bg-white rounded-full"
        >
          <component :is="lookingForIconMap[cardInfo.lookingFor]" />
          <span class="font-normal">
            {{ lookingForHintMap[cardInfo.lookingFor] }}
          </span>
        </div>

        <DotsIcon class="text-white opacity-70" />
      </div>

      <div class="w-full flex flex-col">
        <BaseTypography class="text-white">
          <div>
            <h2 class="text-white inline">{{ cardInfo.name }}</h2>
            <span
              class="text-2xl opacity-80 font-light font-headings text-white ml-2"
            >
              {{ cardInfo.age }}
            </span>
          </div>

          <div class="flex flex-row space-x-2">
            <LocationIcon class="stroke-1 opacity-90" />
            <span class="text-sm">{{ cardInfo.location }}</span>
          </div>
        </BaseTypography>

        <ProfileCardTags
          class="-mr-4 w-[calc(100%+1rem)]"
          :tags="cardInfo.tags"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CardVM } from '@@/domain/cards'
  import { LookingFor } from '@@/domain/profiles'

  import BaseTypography from '../ui/base-typography.vue'

  import ProfileCardTags from './profile-card-tags.vue'

  import DotsIcon from '~icons/heroicons-outline/dots-horizontal'
  import LocationIcon from '~icons/heroicons-outline/location-marker'
  import ChatIcon from '~icons/heroicons-solid/chat-alt-2'
  import HeartIcon from '~icons/heroicons-solid/heart'
  import BulbIcon from '~icons/heroicons-solid/light-bulb'

  defineProps<{
    cardInfo: CardVM
  }>()

  const lookingForHintMap = {
    [LookingFor.Love]: 'Любовь',
    [LookingFor.LikeMinded]: 'Единомышленники',
    [LookingFor.Friendship]: 'Общение',
  }

  const lookingForIconMap = {
    [LookingFor.Love]: HeartIcon,
    [LookingFor.LikeMinded]: BulbIcon,
    [LookingFor.Friendship]: ChatIcon,
  }
</script>

<style scoped>
  .touch-callout-none {
    -webkit-touch-callout: none !important;
  }

  .container-blackout {
    background: linear-gradient(
      to top,
      rgba(34, 34, 34, 0.8) 0%,
      rgba(57, 57, 57, 0) 38%
    );
  }
</style>
