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
import { EyeIcon, EyeOffIcon, CheckIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/components/firebase'

const router = useRouter()
const showPassword = ref(false)
const email = ref('')
const password = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 이메일 유효성 검사 - HTML5 type="email" 속성 + 정규식 검증 함께 사용
const isEmailValid = computed(() => {
  // 적절한 수준의 정규식 검증
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.value)
})

// 비밀번호 유효성 검사
const isLongEnough = computed(() => password.value.length >= 8)
const hasUpperAndLowerCase = computed(() => /[A-Z]/.test(password.value) && /[a-z]/.test(password.value))
const hasNumberOrSpecial = computed(() => /[0-9]/.test(password.value) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value))

// 모든 비밀번호 조건 만족 여부
const isPasswordValid = computed(() => 
  isLongEnough.value && 
  hasUpperAndLowerCase.value && 
  hasNumberOrSpecial.value
)

const handleContinue = () => {
  // 회원가입 계속 처리 로직
  console.log('이메일 회원가입 처리 중...')

  createUserWithEmailAndPassword(auth, email.value, password.value)
  
  // 서버에 회원가입 요청 후 이메일 인증 페이지로 리다이렉트
  // 실제 구현에서는 API 호출 후 응답에 따라 리다이렉트
  router.push({
      // name: 'PasswordReset',
      path: '/signup/verification',
      query: { email: email.value }
    })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          환영합니다
        </CardTitle>
        <CardDescription>
          하이어리에서 나만의 TIL 블로그를 시작하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleContinue">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <!-- 이메일 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="email">이메일</Label>
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  required
                  :class="isEmailValid && email.length > 0 ? 'border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50' : ''"
                />
                
                <!-- 이메일 유효성 체크리스트 -->
                <div class="text-sm text-muted-foreground mt-1">
                  <div class="flex items-center gap-2" :class="isEmailValid ? 'text-green-600' : 'text-zinc-500'">
                    <CheckIcon class="h-4 w-4" :class="isEmailValid ? 'text-green-600' : 'text-zinc-400'" />
                    <span>유효한 이메일 형식</span>
                  </div>
                </div>
              </div>
              
              <!-- 비밀번호 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="password">비밀번호</Label>
                <div class="relative">
                  <Input 
                    id="password" 
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="비밀번호를 입력하세요." 
                    required 
                    :class="isPasswordValid && password.length > 0 ? 'border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50' : ''"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    class="absolute right-0 top-0 h-9 w-9 px-0 hover:bg-transparent focus-visible:bg-transparent" 
                    @click="togglePasswordVisibility"
                  >
                    <EyeIcon v-if="showPassword" class="h-4 w-4" />
                    <EyeOffIcon v-else class="h-4 w-4" />
                    <span class="sr-only">{{ showPassword ? '비밀번호 숨기기' : '비밀번호 보기' }}</span>
                  </Button>
                </div>
                
                <!-- 비밀번호 요구사항 체크리스트 -->
                <div class="text-sm text-muted-foreground mt-1">
                  <div class="grid gap-2">
                    <div class="flex items-center gap-2" :class="isLongEnough ? 'text-green-600' : 'text-zinc-500'">
                      <CheckIcon class="h-4 w-4" :class="isLongEnough ? 'text-green-600' : 'text-zinc-400'" />
                      <span>최소 8자 이상</span>
                    </div>
                    <div class="flex items-center gap-2" :class="hasUpperAndLowerCase ? 'text-green-600' : 'text-zinc-500'">
                      <CheckIcon class="h-4 w-4" :class="hasUpperAndLowerCase ? 'text-green-600' : 'text-zinc-400'" />
                      <span>대소문자 조합 포함</span>
                    </div>
                    <div class="flex items-center gap-2" :class="hasNumberOrSpecial ? 'text-green-600' : 'text-zinc-500'">
                      <CheckIcon class="h-4 w-4" :class="hasNumberOrSpecial ? 'text-green-600' : 'text-zinc-400'" />
                      <span>숫자 또는 특수문자 포함</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 계속하기 버튼 -->
              <Button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white">
                계속하기
              </Button>
            </div>
            
            <!-- 로그인 링크 -->
            <div class="text-center text-sm">
              이미 계정이 있으신가요?
              <a href="#" @click.prevent="router.push('/login')" class="underline underline-offset-4 text-muted-foreground hover:text-primary">
                로그인
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    
    <!-- 약관 동의 문구 -->
    <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      계속 함으로써,<br>
      <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의합니다.
    </div>
  </div>
</template> 