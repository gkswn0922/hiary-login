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
import { CheckIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const username = ref('')
const tagline = ref('')
const agreedToTerms = ref(false)

// 사용자 이메일은 실제로는 로그인 정보에서 가져올 것입니다
const userEmail = ref('example@email.com')

// 이름에서 이니셜 추출 (영문은 단어 앞글자, 한글은 첫글자)
const profileInitials = computed(() => {
  if (!name.value) return 'HI';
  
  // 한글 여부 확인 (유니코드 범위: AC00-D7A3)
  const isKorean = /[\uAC00-\uD7A3]/g.test(name.value);
  
  if (isKorean) {
    // 한글인 경우 첫 글자만 반환
    return name.value.charAt(0);
  } else {
    // 영문인 경우 각 단어의 첫 글자 추출
    const words = name.value.split(' ').filter(word => word.length > 0);
    if (words.length === 1) {
      // 한 단어만 있는 경우 최대 두 글자 반환
      return words[0].substring(0, 2).toUpperCase();
    } else {
      // 여러 단어가 있는 경우 각 단어의 첫 글자 반환 (최대 두 단어)
      return words.slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase();
    }
  }
});

// 사용자명 유효성 검사
const isUsernameValid = computed(() => {
  // 영문, 숫자, 밑줄만 허용하는 정규식
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  return username.value.length >= 3 && usernameRegex.test(username.value)
})

// 사용자명 입력 필터링 함수
const filterUsername = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  const filteredValue = value.replace(/[^a-zA-Z0-9_]/g, '');
  
  if (value !== filteredValue) {
    input.value = filteredValue;
    username.value = filteredValue;
  }
}

// 키보드 입력 제한 - 영문, 숫자, 밑줄만 허용
const validateUsernameKey = (event: KeyboardEvent) => {
  // 시스템 키는 허용 (백스페이스, 화살표 등)
  if (event.key === 'Backspace' || 
      event.key === 'Delete' || 
      event.key === 'ArrowLeft' || 
      event.key === 'ArrowRight' || 
      event.key === 'Tab' ||
      event.ctrlKey || 
      event.metaKey) {
    return;
  }
  
  // 영문, 숫자, 밑줄 키만 허용
  const validKey = /^[a-zA-Z0-9_]$/.test(event.key);
  if (!validKey) {
    event.preventDefault();
  }
}

// 태그라인 글자 수 계산
const taglineLength = computed(() => tagline.value.length)

// 폼 유효성 검사
const isFormValid = computed(() => {
  return name.value.length > 0 && 
         isUsernameValid.value && 
         tagline.value.length > 0 && 
         agreedToTerms.value
})

const handleContinue = () => {
  if (isFormValid.value) {
    // 추가 정보 저장 후 다음 페이지로 이동
    console.log('추가 정보 저장 중...')
    console.log({
      name: name.value,
      username: username.value,
      tagline: tagline.value
    })
    
    // 대시보드로 이동
    // router.push('/dashboard')
  }
}

const toggleTermsAgreement = () => {
  agreedToTerms.value = !agreedToTerms.value
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          추가 정보를 입력하세요.
        </CardTitle>
        <CardDescription>
          하이어리 서비스를 이용하기 위한 추가 정보를 입력해주세요.
        </CardDescription>
        <div class="flex flex-col items-center mt-4">
          <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-2">
            {{ profileInitials }}
          </div>
          <div class="flex items-center gap-1 text-sm">
            <span class="text-zinc-500">로그인 된 계정:</span>
            <span class="text-zinc-900">{{ userEmail }}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleContinue">
          <div class="grid gap-6">
            <div class="grid gap-6">
              <!-- 이름 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="name">이름</Label>
                <Input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="이름을 입력하세요."
                  required
                />
              </div>
              
              <!-- 사용자명 입력 필드 -->
              <div class="grid gap-2">
                <Label html-for="username">사용자명</Label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-900">
                    hiary.ai/
                  </div>
                  <Input
                    id="username"
                    v-model="username"
                    type="text"
                    placeholder="사용자명을 입력하세요."
                    class="pl-[70px]"
                    maxlength="20"
                    required
                    @input="filterUsername"
                    @keydown="validateUsernameKey"
                    :class="isUsernameValid && username.length > 0 ? 'border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50' : ''"
                  />
                </div>
                
                <!-- 사용자명 유효성 체크리스트 -->
                <div class="text-sm text-muted-foreground mt-1">
                  <div class="flex items-center gap-2" :class="isUsernameValid ? 'text-green-600' : 'text-zinc-500'">
                    <CheckIcon class="h-4 w-4" :class="isUsernameValid ? 'text-green-600' : 'text-zinc-400'" />
                    <span>영문, 숫자, 밑줄(_)만 사용 가능 (3-20자)</span>
                  </div>
                </div>
              </div>
              
              <!-- 태그라인 입력 필드 -->
              <div class="grid gap-2">
                <div class="flex justify-between">
                  <Label html-for="tagline">태그라인</Label>
                  <span class="text-xs text-muted-foreground">{{ taglineLength }}/50</span>
                </div>
                <Input
                  id="tagline"
                  v-model="tagline"
                  type="text"
                  placeholder="자신의 간략 소개를 입력하세요. (50자)"
                  maxlength="50"
                  required
                />
              </div>
              
              <!-- 약관 동의 체크박스 -->
              <div class="flex items-center gap-2 mt-4">
                <div 
                  @click="toggleTermsAgreement"
                  class="w-5 h-5 border rounded flex items-center justify-center cursor-pointer"
                  :class="agreedToTerms ? 'bg-zinc-900 border-zinc-900' : 'border-zinc-300'"
                >
                  <CheckIcon v-if="agreedToTerms" class="h-3 w-3 text-white" />
                </div>
                <div class="text-sm flex flex-wrap">
                  <a href="#" class="text-muted-foreground underline underline-offset-4 hover:text-primary">이용약관</a>
                  <span class="text-zinc-500">&nbsp;및&nbsp;</span>
                  <a href="#" class="text-muted-foreground underline underline-offset-4 hover:text-primary">개인정보처리방침</a>
                  <span class="text-zinc-500">에 동의합니다.</span>
                </div>
              </div>
              
              <!-- 계속하기 버튼 -->
              <Button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4"
                :disabled="!isFormValid"
              >
                계속하기
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template> 