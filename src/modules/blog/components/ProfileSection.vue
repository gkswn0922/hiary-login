<template>
  <div class="w-full border-t border-gray-200">
    <div class="max-w-full mx-auto px-12 py-20">
      <div class="max-w-4xl mx-auto flex flex-col items-center">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">프로필 정보를 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <p class="error-message">{{ error }}</p>
        </div>

        <!-- 프로필 정보 -->
        <div v-else class="profile-content">
          <!-- 아바타 -->
          <div class="mb-6">
            <Avatar class="w-32 h-32 avatar-xl">
              <AvatarImage :src="profileData.profile_img || './src/assets/avator.svg'"
                :alt="profileData.user_name || 'User'" />
              <AvatarFallback class="text-2xl font-medium">
                {{ getInitials(profileData.user_name) }}
              </AvatarFallback>
            </Avatar>
          </div>

          <!-- 프로필 정보 -->
          <div class="text-center space-y-3">
            <h2 class="text-base font-medium text-gray-900">
              {{ profileData.user_name || 'Unknown User' }}
            </h2>
            <p class="text-base text-gray-600">
              {{ formatFollowerCount(profileData.follower_count) }} 팔로워
            </p>

            <!-- 소개글 -->
            <div class="max-w-md mx-auto py-3">
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ profileData.user_intro || '소개글이 없습니다.' }}
              </p>
            </div>

            <!-- 소셜 미디어 링크 -->
            <div class="flex items-center justify-center gap-4 pt-2">
              <!-- Github 아이콘 -->
              <button v-if="profileData.git_link" class="social-icon" aria-label="GitHub"
                @click="navigateTo(profileData.git_link)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.67"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                  </path>
                </svg>
              </button>

              <!-- LinkedIn 아이콘 -->
              <button v-if="profileData.linkedin_link" class="social-icon" aria-label="LinkedIn"
                @click="navigateTo(profileData.linkedin_link)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.67"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>

              <!-- Dribbble 아이콘 -->
              <button v-if="profileData.dribble_link" class="social-icon" aria-label="Dribbble"
                @click="navigateTo(profileData.dribble_link)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.67"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Avatar from '../components/ui/avatar.vue'
import AvatarFallback from '../components/ui/avatar-fallback.vue'
import AvatarImage from '../components/ui/avatar-image.vue'

// 타입 정의
interface ProfileData {
  user_name: string
  follower_count: number
  user_intro: string
  git_link: string
  linkedin_link: string
  dribble_link: string
  blog_name: string
  profile_img: string
}

// 반응형 데이터
const profileData = ref<ProfileData>({
  user_name: '',
  follower_count: 0,
  user_intro: '',
  git_link: '',
  linkedin_link: '',
  dribble_link: '',
  blog_name: '',
  profile_img: ''
})

const isLoading = ref(false)
const error = ref<string | null>(null)

// 프로필 데이터 로드 함수
const loadProfileData = async () => {
  isLoading.value = true
  error.value = null

  try {
    // API URL 설정
    // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    // const USER_ID = 'user123' // 실제로는 로그인된 사용자 ID 또는 URL 파라미터에서 가져옴

    // const response = await fetch(`${API_URL}/profile?userId=${USER_ID}`)

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    // const data = await response.json()

    // 하드코딩된 데이터 사용 (개발용)
    const data = {
      user_name: "Aiden Cho",
      follower_count: 30,
      user_intro: "데이터 사이언티스트를 꿈꾸는 주니어 개발자입니다.\nXGBoost부터 딥러닝 아키텍처까지, 논문과 실제 구현 사이에서 헤매며 배우고 있습니다.",
      git_link: "https://github.com",
      linkedin_link: "https://www.linkedin.com/in",
      dribble_link: "https://dribbble.com",
      blog_name: "Aiden's Blog",
      profile_img: "https://lh3.google.com/u/0/d/1EfV60-ngo30ovkJPysBvYqCxURdfNfej=w1920-h919-iv1?auditContext=prefetch"
    }

    if (data) {
      profileData.value = data
    } else {
      error.value = '프로필 정보를 불러올 수 없습니다.'
    }
  } catch (err) {
    error.value = '네트워크 오류가 발생했습니다.'
    console.error('프로필 데이터 로드 실패:', err)
  } finally {
    isLoading.value = false
  }
}

// 유틸리티 함수들
const getInitials = (name: string) => {
  if (!name) return 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatFollowerCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  } else {
    return count.toString().padStart(3, '0')
  }
}

// 외부 링크 열기 함수
const navigateTo = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadProfileData()
})
</script>

<style scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 24px;
  color: #71717A;
  background: transparent;
  border: none;
  cursor: pointer;
}

.social-icon:hover {
  color: #09090B;
}

.social-icon svg {
  width: 24px;
  height: 24px;
}

/* 로딩 스타일 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #E4E4E7;
  border-top: 3px solid #2563EB;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #71717A;
  margin: 0;
}

/* 에러 스타일 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
}

.error-icon {
  font-size: 48px;
}

.error-message {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #71717A;
  text-align: center;
  margin: 0;
}
</style>
