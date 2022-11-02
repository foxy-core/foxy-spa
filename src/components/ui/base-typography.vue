<template>
  <component
    :is="tag"
    class="mb-4 prose prose-headings:font-headings prose-zinc dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl"
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
