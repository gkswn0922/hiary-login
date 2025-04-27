<script lang="ts">
export const description = 'A login page with a muted background color.'
</script>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <img src="/assets/hiary-simbol.svg" class="size-4" alt="hiary symbol" />
        </div>
        hiary
      </a>
      <LoginForm />
    </div>
  </div>
</template>
