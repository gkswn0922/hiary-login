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

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const password = ref('')
const confirmPassword = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

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

// 비밀번호 확인 일치 여부
const isPasswordMatch = computed(() => 
  password.value === confirmPassword.value && password.value.length > 0
)

const handleResetPassword = () => {
  // 비밀번호 재설정 처리 로직
  console.log('비밀번호 재설정 처리 중...')
  
  // 서버에 비밀번호 재설정 요청 후 완료 페이지로 리다이렉트
  router.push('/password-reset/complete')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          새 비밀번호 설정
        </CardTitle>
        <CardDescription>
          새 비밀번호를 입력해 주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleResetPassword">
          <div class="grid gap-6">
            <div class="grid gap-6">
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
              </div>
              
              <!-- 비밀번호 확인 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="confirmPassword">비밀번호 확인</Label>
                <div class="relative">
                  <Input 
                    id="confirmPassword" 
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    placeholder="비밀번호를 다시 입력하세요." 
                    required 
                    :class="isPasswordMatch ? 'border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50' : ''"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    class="absolute right-0 top-0 h-9 w-9 px-0 hover:bg-transparent focus-visible:bg-transparent" 
                    @click="toggleConfirmPasswordVisibility"
                  >
                    <EyeIcon v-if="showConfirmPassword" class="h-4 w-4" />
                    <EyeOffIcon v-else class="h-4 w-4" />
                    <span class="sr-only">{{ showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기' }}</span>
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
              
              <!-- 비밀번호 재설정 버튼 -->
              <Button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white"
                :disabled="!isPasswordValid || !isPasswordMatch || !password.length || !confirmPassword.length"
              >
                비밀번호 재설정
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template> 