<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <div class="flex justify-center items-center mt-6">
        <div class="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-900 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
      </div>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          비밀번호가 재설정되었습니다
        </CardTitle>
        <CardDescription>
          새 비밀번호로 로그인해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-6">
          <!-- 로그인 링크 -->
          <div class="text-center text-sm flex justify-center">
            <a href="#" @click.prevent="router.push('/login')" class="underline underline-offset-4 text-muted-foreground hover:text-primary">
              로그인
            </a>
            <span class="text-muted-foreground">으로 이동</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 