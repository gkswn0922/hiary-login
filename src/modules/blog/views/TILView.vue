<template>
  <div class="min-h-screen bg-white">
    <!-- 네비게이션 -->
    <BlogNavbar />

    <!-- 메인 콘텐츠 -->
    <main class="max-w-full mx-auto px-8 py-16">
      <div class="max-w-7xl mx-auto">
        <!-- 로딩 상태 -->
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">TIL 포스트를 불러오는 중...</p>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <h3 class="error-title">데이터를 불러올 수 없습니다</h3>
          <p class="error-message">{{ error }}</p>
          <button class="retry-button" @click="loadTilPosts">
            다시 시도
          </button>
        </div>

        <!-- TIL 카드들 -->
        <div v-else-if="tilPosts.length > 0" class="space-y-12 til-cards-container">
          <div class="card-wrapper" v-for="post in tilPosts" :key="post.url">
            <BlogCard :title="post.blog_name" :description="post.desc" :tags="post.tag"
              :date="formatDate(post.created_date)" class="til-card" />
          </div>
        </div>

        <!-- 데이터가 없는 경우 -->
        <div v-else class="empty-container">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">아직 TIL 포스트가 없습니다</h3>
          <p class="empty-message">첫 번째 포스트를 작성해보세요!</p>
        </div>

        <!-- 페이지네이션 -->
        <div v-if="!isLoading && !error && tilPosts.length > 0" class="mt-12 pt-12 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button class="pagination-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.33"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
              이전
            </button>

            <div class="flex items-center gap-2">
              <div class="pagination-number pagination-number-active">1</div>
              <div class="pagination-number">2</div>
              <div class="pagination-number">3</div>
            </div>

            <button class="pagination-button">
              다음
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.33"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
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
import BlogCard from '../components/BlogCard.vue'
import BlogFooter from '../components/BlogFooter.vue'

// 간단한 타입 정의
interface TilPost {
  blog_name: string
  desc: string
  url: string
  tag: string
  series: string
  created_date: string
}

// 반응형 데이터
const tilPosts = ref<TilPost[]>([])
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

// TIL 포스트 로드 함수
const loadTilPosts = async () => {
  isLoading.value = true
  error.value = null

  try {
    // API URL 설정
    const API_URL = 'http://localhost:3000'
    const USER_ID = 'user123'

    const response = await fetch(`${API_URL}/til?userId=${USER_ID}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // 하드코딩된 데이터 사용
    // const data = [
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
    //   },
    //   {
    //     blog_name: "ResNet과 DenseNet의 구조적 차이점 분석",
    //     desc: "Skip connection의 개념부터 시작하여 ResNet과 DenseNet의 차이를 실제 구현으로 비교했습니다. Feature map의 재사용 방식과 gradient flow의 차이점을 분석하고, 각 모델의 장단점을 정리했습니다.",
    //     url: "hiary.ai/resnet-densenet-comparison",
    //     tag: "ResNet, DenseNet, Skip Connection",
    //     series: "인공지능",
    //     created_date: "2025-08-25"
    //   },
    //   {
    //     blog_name: "GAN 구현하기 - Generator와 Discriminator의 균형",
    //     desc: "DCGAN을 처음부터 구현하면서 생성자와 판별자의 학습 균형을 맞추는 방법을 학습했습니다. Mode collapse 문제와 해결 방안, 안정적인 학습을 위한 하이퍼파라미터 튜닝 경험을 정리했습니다.",
    //     url: "hiary.ai/gan-dcgan-implementation",
    //     tag: "GAN, DCGAN, Mode Collapse",
    //     series: "인공지능",
    //     created_date: "2025-08-24"
    //   }
    // ]

    if (data && Array.isArray(data)) {
      tilPosts.value = data
    } else {
      error.value = 'TIL 포스트를 불러올 수 없습니다.'
    }
  } catch (err) {
    error.value = '네트워크 오류가 발생했습니다.'
    console.error('TIL 포스트 로드 실패:', err)
  } finally {
    isLoading.value = false
  }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadTilPosts()
})
</script>

<style scoped>
.pagination-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #09090B;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
}

.pagination-button:hover {
  background-color: rgba(244, 244, 245, 0.5);
}

.pagination-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  color: #18181B;
  cursor: pointer;
}

.pagination-number:hover {
  background-color: rgba(244, 244, 245, 0.5);
}

.pagination-number-active {
  background-color: #18181B;
  color: #FAFAFA;
}

/* TIL 카드 커스터마이징 */
.til-cards-container {
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

.til-cards-container :deep(.blog-card) {
  width: 1200px;
  max-width: 100%;
}

.til-cards-container :deep(.image-placeholder) {
  width: 300px;
}

.til-cards-container :deep(.text-content) {
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
  .til-cards-container :deep(.blog-card) {
    width: 100%;
    max-width: 1200px;
  }
}
</style>
