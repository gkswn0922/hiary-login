<template>
  <div :class="avatarClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface AvatarProps {
  class?: string
}

const props = defineProps<AvatarProps>()

const avatarClasses = computed(() => {
  const baseClasses = 'avatar'
  return [baseClasses, props.class].filter(Boolean).join(' ')
})
</script>
