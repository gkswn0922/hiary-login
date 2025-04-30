<script lang="ts">
export const description = '대시보드 페이지'
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">대시보드</h1>
    <p class="mb-6">이곳은 로그인 후 표시되는 대시보드 페이지입니다.</p>
    <div class="space-x-4">
      <Button variant="default" @click="$router.push('/')">홈으로 돌아가기</Button>
      <Button variant="outline" @click="$router.push('/login')">다시 로그인하기</Button>
    </div>
  </div>
</template> 