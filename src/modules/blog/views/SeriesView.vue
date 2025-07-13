<template>
  <div class="min-h-screen bg-white">
    <!-- 네비게이션 -->
    <BlogNavbar />

    <!-- 메인 콘텐츠 -->
    <main class="max-w-full mx-auto px-8 py-24" style="padding: 24px 32px;">
      <div class="series-container">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">시리즈 데이터를 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <h3 class="error-title">데이터를 불러올 수 없습니다</h3>
          <p class="error-message">{{ error }}</p>
          <button class="retry-button" @click="loadSeriesData">
            다시 시도
          </button>
        </div>

        <!-- 시리즈 섹션들 -->
        <div v-else-if="seriesData.length > 0">
          <div v-for="series in seriesData" :key="series.id" class="series-section">
            <div class="series-info">
              <!-- 시리즈 헤더 -->
              <div class="series-header">
                <div class="series-label-container">
                  <span class="series-label">시리즈</span>
                </div>
                <div class="series-title-container">
                  <h2 class="series-title">{{ series.title }}</h2>
                </div>
                <div class="series-description-container">
                  <p class="series-description">{{ series.description }}</p>
                </div>
              </div>

              <!-- 모든 TIL 보기 버튼 -->
              <button class="view-all-button">
                <span class="button-text">모든 TIL 보기</span>
                <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
            </div>

            <!-- 시리즈 카드들 -->
            <div class="series-cards">
              <SeriesCard v-for="post in series.posts" :key="post.id" :title="post.title"
                :description="post.description" :tags="post.tags" :date="formatDate(post.date)"
                :category="series.title" />
            </div>
          </div>
        </div>

        <!-- 데이터가 없는 경우 -->
        <div v-else class="empty-container">
          <div class="empty-icon">📚</div>
          <h3 class="empty-title">아직 시리즈가 없습니다</h3>
          <p class="empty-message">첫 번째 시리즈를 만들어보세요!</p>
        </div>
      </div>
    </main>

    <!-- 푸터 -->
    <BlogFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogNavbar from '../components/BlogNavbar.vue'
import SeriesCard from '../components/SeriesCard.vue'
import BlogFooter from '../components/BlogFooter.vue'

// 간단한 타입 정의
interface SeriesPost {
  id: number
  title: string
  description: string
  tags: string
  date: string
}

interface SeriesData {
  id: number
  title: string
  description: string
  posts: SeriesPost[]
}

// 반응형 데이터
const seriesData = ref<SeriesData[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

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

// 시리즈 데이터 로드 함수
const loadSeriesData = async () => {
  isLoading.value = true
  error.value = null

  try {
    // API URL 설정
    // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    // const USER_ID = 'user123'
    // const VISIT_USER_ID = 'user1234'

    // const response = await fetch(`${API_URL}/series?userId=${USER_ID}?userId=${VISIT_USER_ID}`)

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`)
    // }

    // const data = await response.json()

    // 하드코딩된 데이터 사용
    const data = [
      {
        id: 1,
        title: "인공지능",
        description: "데이터 전처리부터 모델 최적화까지, AI 개발의 전 과정을 기록합니다. 논문 리뷰와 실제 구현의 차이를 분석하고, 캐글 대회에서 얻은 실전 인사이트를 공유합니다. 머신러닝의 수학적 기반부터 최신 딥러닝 아키텍처까지, 이론과 코드를 함께 정리합니다.",
        posts: [
          {
            id: 1,
            title: "XGBoost와 LightGBM의 깊은 이해와 현업 적용",
            description: "Python API와 sklearn wrapper의 차이점을 분석하고, GOSS 알고리즘의 실제 구현과 논문의 차이를 발견했습니다. Gradient 기반 데이터 중요도 평가 방식을 이해하고 실전 적용 방법을 학습했습니다.",
            tags: "XGBoost, LightGBM, Gradient",
            date: "2025-09-01"
          },
          {
            id: 2,
            title: "Attention 메커니즘과 Transformer 구조 이해",
            description: "RNN의 발전된 형태인 Attention 메커니즘의 작동 원리를 학습했습니다. Self-attention부터 Transformer 아키텍처까지 구현하며, 왜 이 기술이 NLP의 표준이 되었는지 이해했습니다.",
            tags: "Attention, Transformer, NLP",
            date: "2025-08-30"
          },
        ]
      },
      {
        id: 2,
        title: "백엔드 설계",
        description: "AWS부터 쿠버네티스까지, 클라우드 네이티브 환경을 구축하고 운영하는 과정을 기록합니다. 서버리스 아키텍처 설계부터 컨테이너 오케스트레이션, CI/CD 파이프라인 구축과 모니터링 시스템 설정까지, DevOps 엔지니어의 실무 경험과 트러블슈팅 노하우를 공유합니다.",
        posts: [
          {
            id: 4,
            title: "Circuit Breaker 패턴으로 마이크로서비스 안정성 확보",
            description: "Spring Cloud Netflix Hystrix를 사용하여 마이크로서비스 간 장애 전파를 방지하는 방법을 학습했습니다. 실제 주문 서비스와 결제 서비스 간의 통신에서 Circuit Breaker를 적용하고, fallback 메서드 구현과 대시보드 모니터링 설정까지 완료했습니다.",
            tags: "Spring Boot, MSA, Circuit Breaker",
            date: "2025-08-20"
          },
          {
            id: 5,
            title: "Redis를 활용한 캐싱 전략과 성능 최적화",
            description: "API 응답 시간을 80% 단축시킨 Redis 캐싱 전략을 정리했습니다. Cache-Aside 패턴 구현부터 TTL 설정, 캐시 무효화 정책까지 실제 적용 사례를 분석했고, Redis Cluster 구성으로 고가용성을 확보하는 방법을 학습했습니다.",
            tags: "Redis, Caching, Performance",
            date: "2025-08-15"
          },
        ]
      },
      {
        id: 3,
        title: "프론트엔드 개발",
        description: "React부터 Vue.js까지, 모던 프론트엔드 개발의 핵심 기술들을 다룹니다. 상태 관리, 성능 최적화, 테스팅 전략부터 PWA 구현까지, 실무에서 바로 적용할 수 있는 프론트엔드 개발 노하우를 정리합니다.",
        posts: [
          {
            id: 7,
            title: "React 18의 새로운 기능들과 성능 최적화",
            description: "React 18에서 도입된 Concurrent Features와 Suspense를 실제 프로젝트에 적용해보았습니다. useTransition과 useDeferredValue를 활용한 성능 최적화 방법을 학습하고, 번들 사이즈 최적화와 코드 스플리팅 전략을 정리했습니다.",
            tags: "React, React 18, Performance",
            date: "2025-08-05"
          },
          {
            id: 8,
            title: "Vue 3 Composition API와 TypeScript 통합",
            description: "Vue 3의 Composition API를 TypeScript와 함께 사용하는 방법을 학습했습니다. ref, reactive, computed의 타입 추론부터 custom composables 작성까지, 타입 안정성을 확보하면서 개발 생산성을 높이는 패턴들을 정리했습니다.",
            tags: "Vue.js, TypeScript, Composition API",
            date: "2025-08-01"
          }
        ]
      }
    ]

    if (data && Array.isArray(data)) {
      seriesData.value = data
    } else {
      error.value = '시리즈 데이터를 불러올 수 없습니다.'
    }
  } catch (err) {
    error.value = '네트워크 오류가 발생했습니다.'
    console.error('시리즈 데이터 로드 실패:', err)
  } finally {
    isLoading.value = false
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadSeriesData()
})
</script>

<style scoped>
.series-container {
  width: 1184px;
  max-width: 100%;
  margin: 0 auto;
}

.series-section {
  display: flex;
  flex-direction: row;
  gap: 72px;
  padding-bottom: 64px;
  margin-bottom: 48px;
  align-items: flex-start;
}

.series-info {
  display: flex;
  flex-direction: column;
  width: 480px;
  flex-shrink: 0;
}

.series-header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.series-label-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding-bottom: 16px;
}

.series-label {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
  flex: 1;
}

.series-title-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding-bottom: 24px;
}

.series-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 60px;
  line-height: 1;
  color: #09090B;
  text-align: left;
  flex: 1;
  margin: 0;
}

.series-description-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding-bottom: 24px;
}

.series-description {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #71717A;
  text-align: left;
  flex: 1;
  margin: 0;
}

.view-all-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  width: fit-content;
}

.view-all-button:hover {
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

.series-cards {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 24px;
  flex: 1;
  min-height: auto;
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

/* 반응형 처리 */
@media (max-width: 1200px) {
  .series-container {
    width: 100%;
    padding: 0 16px;
  }

  .series-section {
    flex-direction: column;
    gap: 32px;
  }

  .series-info {
    width: 100%;
  }

  .series-cards {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .series-title {
    font-size: 40px;
  }

  .series-cards {
    flex-direction: column;
    align-items: center;
  }
}
</style>
