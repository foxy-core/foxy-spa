<template>
  <component
    :is="tag"
    class="mb-4 prose prose-headings:font-headings prose-zinc dark:prose-invert prose-headings:text-center prose-headings:font-medium prose-h1:text-3xl"
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
