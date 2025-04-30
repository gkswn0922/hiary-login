<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleEmailSignup = () => {
  router.push('/signup/email')
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
            <div class="grid gap-6">
              <div class="grid grid-cols-1 gap-4">
                <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                  <img src="/assets/kakao-icon.svg" alt="Kakao" class="h-5 w-5" />
                  <span>카카오 계정으로 회원가입</span>
                </Button>
                <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                  <img src="/assets/google-icon.svg" alt="Google" class="h-5 w-5" />
                  <span>구글 계정으로 회원가입</span>
                </Button>
                <Button variant="outline" class="w-full flex items-center justify-center gap-2">
                  <img src="/assets/github-icon.svg" alt="Github" class="h-5 w-5" />
                  <span>Github 계정으로 회원가입</span>
                </Button>
                <Button variant="outline" class="w-full flex items-center justify-center gap-2" @click="handleEmailSignup">
                  <img src="/assets/email-icon.svg" alt="Email" class="h-5 w-5" />
                  <span>이메일 계정으로 회원가입</span>
                </Button>
              </div>
            </div>
            <div class="text-center text-sm">
              계정이 있으신가요?
              <a href="#" @click.prevent="router.push('/login')" class="underline underline-offset-4 text-muted-foreground hover:text-primary">
                로그인
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