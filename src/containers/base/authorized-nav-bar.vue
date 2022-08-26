<template>
  <nav
    class="h-16 bg-white xs:h-20 px-8 rounded-t-2xl flex flex-row items-center justify-evenly"
  >
    <RouterLink
      class="w-full h-full flex items-center justify-center"
      v-for="(item, i) in navBarItems"
      :key="i"
      :to="item.to"
    >
      <component
        :is="item.icon"
        class="h-8 w-8 [&>*]:stroke-1 transition-colors duration-100"
        :class="
          item.tags.includes(route.meta.tag as string)
            ? 'text-orange-500'
            : 'text-zinc-400'
        "
      />
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import type { Component } from 'vue'
  import { RouteLocationRaw, useRoute } from 'vue-router'

  import SparklesIcon from '~icons/heroicons-solid/sparkles'
  import CollectionIcon from '~icons/heroicons-solid/collection'
  import UserIcon from '~icons/heroicons-solid/user-circle'

  import { SparksPage } from '@@/domain/sparks'
  import { ProfilesPage } from '@@/domain/profiles'
  import { AccountsPage } from '@@/domain/accounts'
  import { CardsPage } from '@@/domain/cards'

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
