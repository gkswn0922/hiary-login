<template>
  <img v-if="src" :src="src" :alt="alt" class="avatar-image" @error="onError" />
</template>

<script setup lang="ts">
interface AvatarImageProps {
  src?: string
  alt?: string
}

defineProps<AvatarImageProps>()

const onError = () => {
  // Handle image load error
}
</script>
