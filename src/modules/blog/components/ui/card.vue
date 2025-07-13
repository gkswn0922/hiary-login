<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()

const cardClasses = computed(() => {
  const baseClasses = 'card'
  return [baseClasses, props.class].filter(Boolean).join(' ')
})
</script>

<script lang="ts">
export const CardContent = {
  name: 'CardContent',
  template: `
    <div class="p-6">
      <slot />
    </div>
  `
}
</script>
