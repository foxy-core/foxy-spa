<template>
  <component
    :is="tag"
    class="mb-4 prose prose-headings:font-headings prose-headings:text-center prose-headings:text-zinc-800 prose-headings:font-light prose-h1:text-3xl"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      tag?: string
    }>(),
    {
      tag: 'div',
    },
  )
</script>
