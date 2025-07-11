<script setup>
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GoogleLogin } from 'vue3-google-login'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '@/components/firebase'


const router = useRouter()

const provider = new GoogleAuthProvider()
const handleEmailSignup = () => {
  window.location.href = 'http://localhost:5173/signup/email';
  // router.push('/signup/email')
}
const loginWithGoogle = async () => {
      try {
        const result = await signInWithRedirect(auth, provider)

        const user = result.user
        const token = await user.getIdToken()

        console.log('✅ 구글 로그인 성공:', user)
        console.log('🔥 토큰:', token)

        // 사용자 정보 저장하거나 redirect
        sessionStorage.setItem('email', user.email)
        sessionStorage.setItem('uid', user.uid)
        window.location.href = '/dashboard'
      } catch (error) {
        console.error('❌ 구글 로그인 실패:', error.code, error.message)
      }
    }
const handleSocialLogin = async (provider) => {
  // 소셜 로그인 로직 처리
  console.log(`${provider} 로그인 처리 중...`)
  if(provider == 'kakao') {
    window.Kakao.Auth.login({
        success: (authObj) => {
          console.log('Login Success:', authObj);

          // 사용자 정보 요청
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (userInfo) => {
              this.sendToBackend(authObj.access_token, 'kakao');
              
              sessionStorage.setItem('email', userInfo.kakao_account.email);
              sessionStorage.setItem('access_token', authObj.access_token);
            },
            fail: (error) => {
              console.error('User Info Request Failed:', error);
            },
          });

          window.location.href = 'http://localhost:5173/dashboard';
        },
        fail: (err) => {
          console.error('Login Failed:', err);
        },
      });
  } else if (provider == 'github') {
    const clientId = 'Ov23liPCp2fJcdhvOVd2'
    const redirectUri = 'http://localhost:5173/dashboard'

    const scope = "read:user user:email"; // 필요한 권한
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = githubAuthUrl;
  } else if (provider == 'google') {
    const clientId = "821221913413-jaqh66hd71mkarltpsr9i6ljns9p9mau.apps.googleusercontent.com";
    const redirectUri = "http://localhost:5173/dashboard";
    const scope = "openid email profile";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
    // 구글에서 받은 credential로 로그인
    const credential = GoogleAuthProvider.credential(googleAccessToken)  // 또는 id_token
    const userCredential = await signInWithCredential(auth, credential)
    console.log(userCredential);
  }
  // isSocialLogin.value = true
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
                <Button variant="outline" class="w-full flex items-center justify-center gap-2" @click="handleSocialLogin('kakao')">
                  <img src="/assets/kakao-icon.svg" alt="Kakao" class="h-5 w-5" />
                  <span>카카오 계정으로 회원가입</span>
                </Button>
                <Button type="button" variant="outline" class="w-full flex items-center justify-center gap-2" @click="loginWithGoogle">
                  <img src="/assets/google-icon.svg" alt="Google" class="h-5 w-5" />
                  <span>구글 계정으로 회원가입</span>
                </Button>
                <Button type="button" variant="outline" class="w-full flex items-center justify-center gap-2" @click="handleSocialLogin('github')">
                  <img src="/assets/github-icon.svg" alt="Github" class="h-5 w-5" />
                  <span>Github 계정으로 회원가입</span>
                </Button>
                <Button type="button" variant="outline" class="w-full flex items-center justify-center gap-2" @click="handleEmailSignup()">
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