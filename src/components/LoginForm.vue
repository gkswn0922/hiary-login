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
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
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
        <form>
          <div class="grid gap-6">
            <div class="grid grid-cols-3 gap-4">
              <Button variant="outline" class="w-full">
                <img src="/assets/kakao-icon.svg" alt="Kakao" />
                <span class="sr-only">Login with Kakao</span>
              </Button>
              <Button variant="outline" class="w-full">
                <img src="/assets/google-icon.svg" alt="Google" />
                <span class="sr-only">Login with Google</span>
              </Button>
              <Button variant="outline" class="w-full">
                <img src="/assets/github-icon.svg" alt="Github" />
                <span class="sr-only">Login with Github</span>
              </Button>
            </div>
            <div class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span class="relative z-10 bg-background px-2 text-muted-foreground text-xs">
                또는 이메일로 로그인
              </span>
            </div>
            <div class="grid gap-6">
              <div class="grid gap-2">
                <Label html-for="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요."
                  required
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label html-for="password">비밀번호</Label>
                  <a
                    href="#"
                    class="ml-auto text-sm underline underline-offset-4 text-muted-foreground"
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <div class="relative">
                  <Input 
                    id="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    placeholder="비밀번호를 입력하세요." 
                    required 
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
              <div class="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  for="remember"
                  class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  로그인 정보 저장
                </label>
              </div>
              <Button type="submit" class="w-full">
                로그인
              </Button>
            </div>
            <div class="text-center text-sm">
              계정이 없으신가요?
              <a href="#" class="underline underline-offset-4 text-muted-foreground">
                회원가입
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
      계속 함으로써,<br>
      <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의합니다.
    </div>
  </div>
</template>
