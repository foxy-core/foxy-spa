<template>
  <nav
    class="bg-opaque-background backdrop-blur-md xs:h-20 px-8 rounded-t-2xl flex flex-row items-center justify-evenly"
  >
    <RouterLink
      v-for="(item, i) in navBarItems"
      :key="i"
      class="w-full h-16 flex items-center justify-center"
      :to="item.to"
    >
      <Component
        :is="item.icon"
        class="h-8 w-8 [&>*]:stroke-1 transition-colors duration-100"
        :class="
          item.tags.includes(route.meta.tag as string)
            ? 'text-primary'
            : 'text-surface-400'
        "
      />
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import type { Component } from 'vue'
  import { RouteLocationRaw, useRoute } from 'vue-router'

  import { AccountsPage } from '@@/domain/accounts'
  import { CardsPage } from '@@/domain/cards'
  import { ProfilesPage } from '@@/domain/profiles'
  import { SparksPage } from '@@/domain/sparks'

  import CollectionIcon from '~icons/heroicons-solid/collection'
  import SparklesIcon from '~icons/heroicons-solid/sparkles'
  import UserIcon from '~icons/heroicons-solid/user-circle'

  type NavBarItem = {
    icon: Component
    to: RouteLocationRaw
    tags: string[]
  }

  const route = useRoute()

  // лайки, карточки, профиль
  const navBarItems: NavBarItem[] = [
    {
      icon: SparklesIcon,
      to: {
        name: SparksPage.Sparks,
      },
      tags: [SparksPage._TAG],
    },
    {
      icon: CollectionIcon,
      to: {
        name: CardsPage.Cards,
      },
      tags: [CardsPage._TAG],
    },
    {
      icon: UserIcon,
      to: {
        name: AccountsPage.MyAccount,
      },
      tags: [ProfilesPage._TAG, AccountsPage._TAG],
    },
  ]
</script>
