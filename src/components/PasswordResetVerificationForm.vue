<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const email = ref(route.query.email || '')
// const email = ref('example@email.com') // 실제로는 라우트 파라미터나 상태에서 가져올 것입니다
const isResending = ref(false)

const handleResendEmail = () => {
  isResending.value = true
  
  // 이메일 재전송 로직
  setTimeout(() => {
    isResending.value = false
    console.log(`비밀번호 재설정 이메일 재전송: ${email.value}`)
  }, 1500)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <div class="flex justify-center items-center mt-6">
        <img src="/assets/mail-check-icon.svg" alt="메일 확인" class="w-12 h-12" />
      </div>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          비밀번호 재설정 메일 발송 완료
        </CardTitle>
        <CardDescription>
          <span class="font-medium text-primary">{{ email }}</span>으로 이메일을 보냈습니다.<br>
          재설정 메일은 24시간 동안 유효합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-6">
          <!-- 재전송 링크 -->
          <div class="text-center text-sm">
            이메일이 도착하지 않았나요?
            <button 
              @click="handleResendEmail" 
              class="underline underline-offset-4 text-muted-foreground hover:text-primary ml-1 inline-flex items-center"
              :disabled="isResending"
            >
              <span v-if="isResending">전송 중...</span>
              <span v-else>재전송</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template> 