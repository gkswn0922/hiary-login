<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
})

const badgeClasses = computed(() => {
  const baseClasses = 'badge'

  const variantClasses = {
    default: 'badge-primary',
    secondary: 'badge-secondary',
    destructive: 'badge-primary',
    outline: 'border border-gray-300 bg-white text-gray-900'
  }

  return [
    baseClasses,
    variantClasses[props.variant],
    props.class
  ].filter(Boolean).join(' ')
})
</script>
