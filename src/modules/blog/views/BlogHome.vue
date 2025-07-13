<template>
  <div class="min-h-screen bg-white">
    <!-- 네비게이션 -->
    <BlogNavbar />

    <!-- 프로필 섹션 -->
    <ProfileSection />

    <!-- 메인 콘텐츠 -->
    <main class="max-w-full mx-auto px-12 py-8">
      <div class="max-w-7xl mx-auto space-y-12">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">블로그 포스트를 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <h3 class="error-title">데이터를 불러올 수 없습니다</h3>
          <p class="error-message">{{ error }}</p>
          <button class="retry-button" @click="loadBlogPosts">
            다시 시도
          </button>
        </div>

        <!-- 블로그 포스트 카드들 -->
        <div v-else-if="blogPosts.length > 0" class="home-cards-container">
          <div class="card-wrapper" v-for="post in blogPosts" :key="post.url">
            <BlogCard :title="post.blog_name" :description="post.desc" :tags="post.tag"
              :date="formatDate(post.created_date)" />
          </div>
        </div>

        <!-- 데이터가 없는 경우 -->
        <div v-else class="empty-container">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">아직 블로그 포스트가 없습니다</h3>
          <p class="empty-message">첫 번째 포스트를 작성해보세요!</p>
        </div>

        <!-- 모든 게시물 보기 버튼 -->
        <div v-if="!isLoading && !error && blogPosts.length > 0" class="flex justify-center pt-1">
          <button class="all-posts-button">
            <span class="button-text">모든 게시물 보기</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <BlogFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '@/components/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import BlogNavbar from '../components/BlogNavbar.vue'
import ProfileSection from '../components/ProfileSection.vue'
import BlogCard from '../components/BlogCard.vue'
import BlogFooter from '../components/BlogFooter.vue'

// 타입 정의
interface BlogPost {
  blog_name: string
  desc: string
  url: string
  tag: string
  series: string
  created_date: string
}

// 반응형 데이터
const blogPosts = ref<BlogPost[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentUser = ref<string | null>(null)

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// 블로그 포스트 로드 함수
const loadBlogPosts = async () => {
  isLoading.value = true
  error.value = null

  try {
    // 현재 로그인된 사용자가 없으면 에러 처리
    if (!currentUser.value) {
      throw new Error('로그인이 필요합니다.')
    }

    console.log(currentUser)

    // API URL 설정
    const API_URL = 'http://localhost:3000'
    const USER_ID = currentUser.value

    const response = await fetch(`${API_URL}/blogs?userId=${USER_ID}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // 임시 테스트 데이터 (실제 API가 준비되면 제거)
    // const testData = [
    //   {
    //     blog_name: "XGBoost와 LightGBM의 깊은 이해와 현업 적용",
    //     desc: "Python API와 sklearn wrapper의 차이점을 분석하고, GOSS 알고리즘의 실제 구현과 논문의 차이를 발견했습니다. Gradient 기반 데이터 중요도 평가 방식을 이해하고 실전 적용 방법을 학습했습니다.",
    //     url: "hiary.ai/xgboost-lightgbm",
    //     tag: "XGBoost, LightGBM, Gradient",
    //     series: "인공지능",
    //     created_date: "2025-09-01"
    //   },
    //   {
    //     blog_name: "Attention 메커니즘과 Transformer 구조 이해",
    //     desc: "RNN의 발전된 형태인 Attention 메커니즘의 작동 원리를 학습했습니다. Self-attention부터 Transformer 아키텍처까지 구현하며, 왜 이 기술이 NLP의 표준이 되었는지 이해했습니다.",
    //     url: "hiary.ai/attention-transformer",
    //     tag: "Attention, Transformer, NLP",
    //     series: "인공지능",
    //     created_date: "2025-08-30"
    //   },
    //   {
    //     blog_name: "t-SNE와 차원 축소 기법 실습",
    //     desc: "고차원 데이터 시각화를 위한 t-SNE의 원리를 이해하고 구현했습니다. PCA와의 차이점을 비교하며, 각 차원 축소 기법의 장단점과 적절한 사용 사례를 학습했습니다.",
    //     url: "hiary.ai/tsne-dimension-reduction",
    //     tag: "t-SNE, PCA, dimension",
    //     series: "인공지능",
    //     created_date: "2025-08-29"
    //   },
    //   {
    //     blog_name: "Optimizer 시리즈 심층 분석 - SGD부터 AdamW까지",
    //     desc: "각 옵티마이저의 동작 원리와 수학적 배경을 이해했습니다. Momentum, RMSProp, Adam 등의 발전 과정을 따라가며 per-parameter 학습률 조정의 중요성을 깨달았고, 실제 프로젝트에서의 선택 기준을 정리했습니다.",
    //     url: "hiary.ai/optimizer-series",
    //     tag: "Optimization, SGD, AdamW",
    //     series: "인공지능",
    //     created_date: "2025-08-28"
    //   },
    //   {
    //     blog_name: "YOLO 알고리즘 구현과 객체 탐지 실습",
    //     desc: "실시간 객체 탐지의 대표 모델인 YOLO를 처음부터 구현해보았습니다. Grid cell의 개념부터 Anchor box 설정, IoU 계산까지 직접 코딩하면서 One-stage detector의 작동 원리를 완벽히 이해했습니다.",
    //     url: "hiary.ai/yolo-object-detection",
    //     tag: "Computer Vision, YOLO",
    //     series: "인공지능",
    //     created_date: "2025-08-27"
    //   },
    //   {
    //     blog_name: "배치 정규화 vs 레이어 정규화 - 언제 무엇을 써야 할까?",
    //     desc: "Batch Norm, Layer Norm, Instance Norm, Group Norm의 차이점을 실험으로 확인했습니다. 각 정규화 기법의 수학적 근거와 구현 방식을 비교하고, CNN과 RNN에서의 적절한 사용 사례를 정리했습니다.",
    //     url: "hiary.ai/normalization-comparison",
    //     tag: "Batch Norm, Layer Norm, Instance Norm",
    //     series: "인공지능",
    //     created_date: "2025-08-26"
    //   }
    // ]

    if (data && Array.isArray(data)) {
      blogPosts.value = data
    } else {
      // 실제 API가 준비되지 않았을 때 테스트 데이터 사용
      // blogPosts.value = testData
    }
  } catch (err) {
    error.value = '네트워크 오류가 발생했습니다.'
    console.error('블로그 포스트 로드 실패:', err)
  } finally {
    isLoading.value = false
  }
}

// 컴포넌트 마운트 시 Firebase Auth 상태 감지
onMounted(() => {
  // Firebase Auth 상태 변경 감지
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // 사용자가 로그인된 경우
      currentUser.value = user.uid
      loadBlogPosts()
    } else {
      // 사용자가 로그아웃된 경우
      currentUser.value = null
      blogPosts.value = []
      error.value = '로그인이 필요합니다.'
    }
  })
})
</script>

<style scoped>
.all-posts-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  min-width: 160px;
  justify-content: center;
}

.all-posts-button:hover {
  background: #F4F4F5;
}

.button-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #18181B;
  flex-shrink: 0;
}

/* 홈 카드 커스터마이징 */
.home-cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.home-cards-container :deep(.blog-card) {
  width: 1200px;
  max-width: 100%;
}

.home-cards-container :deep(.image-placeholder) {
  width: 300px;
}

.home-cards-container :deep(.text-content) {
  padding: 24px 32px 24px 0;
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

.error-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #18181B;
  margin: 0;
}

.error-message {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #71717A;
  text-align: center;
  margin: 0;
}

.retry-button {
  padding: 8px 16px;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  background: white;
  color: #18181B;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.retry-button:hover {
  background: #F4F4F5;
}

/* 빈 상태 스타일 */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: 16px;
}

.empty-icon {
  font-size: 48px;
}

.empty-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #18181B;
  margin: 0;
}

.empty-message {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #71717A;
  text-align: center;
  margin: 0;
}

@media (max-width: 1200px) {
  .home-cards-container :deep(.blog-card) {
    width: 100%;
    max-width: 1200px;
  }
}
</style>
