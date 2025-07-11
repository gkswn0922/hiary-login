<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

// 이메일 유효성 검사
const isEmailValid = computed(() => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.value)
})

const handleResetPassword = () => {
  // 비밀번호 재설정 이메일 전송 로직
  console.log('입력된 이메일:', email.value)
  
  // 실제 구현에서는 API 호출 후 응답에 따라 처리
    router.push({
      // name: 'PasswordReset',
      path: '/password-reset/verification',
      query: { email: email.value }
    })
  // router.push('/password-reset/verification')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          비밀번호 재설정
        </CardTitle>
        <CardDescription>
          가입 메일에 비밀번호 재설정 메일을 보내드립니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleResetPassword">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <!-- 이메일 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="email">이메일</Label>
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="가입하신 이메일을 입력하세요."
                  required
                  :class="isEmailValid && email.length > 0 ? 'border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50' : ''"
                />
              </div>
              
              <!-- 비밀번호 재설정 버튼 -->
              <Button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white"
                :disabled="!isEmailValid"
              >
                계속하기
              </Button>
            </div>
            
            <!-- 로그인 링크 -->
            <div class="text-center text-sm flex justify-center">
              <a href="#" @click.prevent="router.push('/login')" class="underline underline-offset-4 text-primary hover:text-primary">
                로그인
              </a>
              <span class="text-muted-foreground">으로 돌아가기</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template> 