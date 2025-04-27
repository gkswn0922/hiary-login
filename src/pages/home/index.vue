<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">하이어리 (HIARY)</h1>
    <p class="mb-6">안녕하세요! 이 프로젝트는 shadcn-vue와 Pretendard 폰트를 사용하여 구성되었습니다.</p>
    <div class="space-x-4">
      <Button variant="default" @click="$router.push('/login')">로그인 페이지로 이동</Button>
      <Button variant="outline" @click="$router.push('/dashboard')">대시보드로 이동</Button>
    </div>
    <div class="mt-10">
      <h2 class="text-xl font-semibold mb-4">Pretendard 폰트 테스트</h2>
      <p class="text-lg">프리텐다드는 어느 플랫폼에서든 사용할 수 있는 system-ui 대체 글꼴입니다.</p>
      <p class="font-light mt-2">폰트 웨이트: Light (300)</p>
      <p class="font-normal mt-2">폰트 웨이트: Regular (400)</p>
      <p class="font-medium mt-2">폰트 웨이트: Medium (500)</p>
      <p class="font-semibold mt-2">폰트 웨이트: SemiBold (600)</p>
      <p class="font-bold mt-2">폰트 웨이트: Bold (700)</p>
    </div>
  </div>
</template> 