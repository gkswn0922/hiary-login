<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">하이어리 (HIARY)</h1>
    <p class="mb-6">버튼을 클릭하면 각 페이지로 이동합니다.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Button variant="default" class="w-full" @click="$router.push('/login')">로그인 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/signup')">회원가입 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/signup/email')">이메일 회원가입 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/signup/verification')">이메일 인증 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/signup/additional-info')">추가정보 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/password-reset')">비밀번호 재설정 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/password-reset/verification')">비밀번호 재설정 확인 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/password-reset/new')">새 비밀번호 설정 페이지로 이동</Button>
      <Button variant="default" class="w-full" @click="$router.push('/password-reset/complete')">비밀번호 재설정 완료 페이지로 이동</Button>
    </div>
  </div>
</template> 