<script setup>
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
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { GoogleLogin } from 'vue3-google-login'
import { auth, provider } from '@/components/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const googleLogin = () => {
  signInWithRedirect(auth, provider)
}

const handleLoginSuccess = (response) => {
  debugger
  console.log('✅ 로그인 성공:', response)
  window.location.href = 'http://localhost:5173/dashboard';
  // response.credential 로 토큰 획득 가능
}

const handleLoginError = () => {
  console.error('❌ 로그인 실패')
}

onMounted(async () => {
  googleInit();
  try {
    const result = await getRedirectResult(auth)
    if (result) {
      const user = result.user
      console.log('✅ 로그인 성공:', user)

      // 원하는 처리 (예: 사용자 정보 저장, 페이지 이동)
      window.location.href = '/dashboard'
    }
  } catch (error) {
    console.error('❌ 로그인 실패:', error.code, error.message)
  }
  // getAuthCodeFromURL();
  // Kakao JavaScript SDK 초기화
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init('355d6a505c353a12961c20fd9e5ab0c6');
    console.log('Kakao initialized:', window.Kakao.isInitialized());
  } else if (!window.Kakao) {
    console.error('Kakao SDK not loaded.');
  }

  // 저장된 로그인 정보 불러오기
  const savedEmail = localStorage.getItem('savedEmail');
  const savedRememberMe = localStorage.getItem('rememberMe');

  if (savedRememberMe === 'true') {
    email.value = savedEmail || '';
    rememberMe.value = true;
  }
})

const router = useRouter()
const showPassword = ref(false)
const isSocialLogin = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const loginEvent = async () => {
  
  // 로그인 정보 저장 처리
  if (rememberMe.value) {
    localStorage.setItem('savedEmail', email.value);
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('rememberMe');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('✅ 로그인 성공:', userCredential.user);
    router.push('/dashboard');
  } catch (error) {
    console.error('❌ 로그인 실패:', error.code, error.message);

    // 예: 이메일 없음
    if (error.code === 'auth/user-not-found') {
      alert('존재하지 않는 계정입니다.');
    }

    // 예: 비밀번호 오류
    else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      alert('존재하지 않는 계정이거나 비밀번호가 틀렸습니다.');
    }

    // 예: 이메일 형식 오류 등
    else {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  }

  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     console.log(user);
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode)
  //   });
  // window.location.href = 'http://localhost:5173/dashboard';
}

const handleSocialLogin = (provider) => {
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
  }
  isSocialLogin.value = true
}

const googleInit = () => {
  // 이 함수는 더 이상 필요하지 않으므로 제거
}

const googleCallback = (res) => {
  // 이 함수는 더 이상 필요하지 않으므로 제거
}

const getAuthCodeFromURL = () => {
  // 현재 URL에서 'code' 값을 추출
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    this.authCode = code; // 추출한 'code' 값 저장

    this.sendToBackend(this.authCode, 'google');


  } else {
    console.log("인증 코드가 없습니다.");
  }
}

onMounted(async () => {

})
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
              <Button type="button" variant="outline" class="w-full" @click="handleSocialLogin('kakao')">
                <img src="/assets/kakao-icon.svg" alt="Kakao" />
                <span class="sr-only">Login with Kakao</span>
              </Button>
              <Button type="button" variant="outline" class="w-full" @click="googleLogin">
                <img src="/assets/google-icon.svg" alt="Google" />
                <span class="sr-only">Login with Google</span>
              </Button>
              <Button type="button" variant="outline" class="w-full" @click="handleSocialLogin('github')">
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
                  v-model="email"
                  :required="!isSocialLogin"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label html-for="password">비밀번호</Label>
                  <a
                    href="http://localhost:5173/password-reset"
                    class="ml-auto text-sm underline underline-offset-4 text-muted-foreground hover:text-primary"
                  >
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
                <div class="relative">
                  <Input 
                    id="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    v-model="password"
                    placeholder="비밀번호를 입력하세요." 
                    :required="!isSocialLogin" 
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
                <Checkbox id="remember" v-model="rememberMe" />
                <label
                  for="remember"
                  class="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  로그인 정보 저장
                </label>
              </div>
              <Button 
                type="button" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white"
                @click="loginEvent()"
              >
                로그인
              </Button>
            </div>
            <div class="text-center text-sm">
              계정이 없으신가요?
              <a href="#" @click.prevent="router.push('/signup')" class="underline underline-offset-4 text-muted-foreground hover:text-primary">
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

<style scoped>
.google-button {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 12px;
  background-color: white;
  cursor: pointer;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>