<template>
    <div class="series-page">
        <!-- 헤더 -->
        <div class="header">
            <div class="header-title">
                <h1>시리즈</h1>
            </div>
            <button class="add-button">
                <span>추가하기</span>
            </button>
        </div>

        <!-- 시리즈 테이블 -->
        <div class="series-table-container">
            <div class="series-table">
                <!-- 테이블 헤더 -->
                <div class="table-header">
                    <div class="table-row">
                        <div class="table-cell table-cell-name">
                            <button class="sort-button">
                                <span>이름</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M7 15l5-5 5 5" />
                                    <path d="M7 9l5 5 5-5" />
                                </svg>
                            </button>
                        </div>
                        <div class="table-cell table-cell-slug">
                            <button class="sort-button">
                                <span>슬러그</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M7 15l5-5 5 5" />
                                    <path d="M7 9l5 5 5-5" />
                                </svg>
                            </button>
                        </div>
                        <div class="table-cell table-cell-count">
                            <button class="sort-button">
                                <span>포스트 개수</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M7 15l5-5 5 5" />
                                    <path d="M7 9l5 5 5-5" />
                                </svg>
                            </button>
                        </div>
                        <div class="table-cell table-cell-actions">
                            <!-- 액션 헤더 -->
                        </div>
                    </div>
                </div>

                <!-- 테이블 바디 -->
                <div class="table-body">
                    <div v-for="series in seriesData" :key="series.id" class="series-group">
                        <!-- 시리즈 행 -->
                        <div class="table-row series-row">
                            <div class="table-cell table-cell-name">
                                <div class="series-name-cell">
                                    <button @click="toggleSeries(series.id)" class="expand-button">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="1.3">
                                            <path v-if="!isExpanded(series.id)" d="M9 18l6-6-6-6" />
                                            <path v-else d="M18 15l-6-6-6 6" />
                                        </svg>
                                    </button>
                                    <span class="series-name">{{ series.title }}</span>
                                </div>
                            </div>
                            <div class="table-cell table-cell-slug">
                                <span class="series-slug">{{ series.slug }}</span>
                            </div>
                            <div class="table-cell table-cell-count">
                                <span class="post-count">{{ series.posts.length }}개의 포스트</span>
                            </div>
                            <div class="table-cell table-cell-actions">
                                <button class="action-button">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1.3">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- 포스트 목록 (펼쳐진 경우) -->
                        <div v-if="isExpanded(series.id)" class="post-list">
                            <div v-for="post in series.posts" :key="post.id" class="post-item">
                                <div class="post-name">{{ post.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 타입 정의
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
    slug: string
    description: string
    posts: SeriesPost[]
}

// 반응형 데이터
const seriesData = ref<SeriesData[]>([])
const expandedSeries = ref<Set<number>>(new Set())

// 시리즈 펼침/접기 토글
const toggleSeries = (seriesId: number) => {
    if (expandedSeries.value.has(seriesId)) {
        expandedSeries.value.delete(seriesId)
    } else {
        expandedSeries.value.add(seriesId)
    }
}

// 시리즈 펼침 상태 확인
const isExpanded = (seriesId: number) => {
    return expandedSeries.value.has(seriesId)
}

// 시리즈 데이터 로드
const loadSeriesData = async () => {
    try {
        // 하드코딩된 데이터 사용
        const data = [
            {
                id: 1,
                title: "인공지능",
                slug: "ai",
                description: "데이터 전처리부터 모델 최적화까지, AI 개발의 전 과정을 기록합니다.",
                posts: [
                    {
                        id: 1,
                        title: "XGBoost와 LightGBM의 깊은 이해와 현업 적용",
                        description: "Python API와 sklearn wrapper의 차이점을 분석하고, GOSS 알고리즘의 실제 구현과 논문의 차이를 발견했습니다.",
                        tags: "XGBoost, LightGBM, Gradient",
                        date: "2025-09-01"
                    },
                    {
                        id: 2,
                        title: "Attention 메커니즘과 Transformer 구조 이해",
                        description: "RNN의 발전된 형태인 Attention 메커니즘의 작동 원리를 학습했습니다.",
                        tags: "Attention, Transformer, NLP",
                        date: "2025-08-30"
                    },
                    {
                        id: 3,
                        title: "t-SNE와 차원 축소 기법 실습",
                        description: "고차원 데이터를 시각화하는 t-SNE와 PCA의 차이점을 이해했습니다.",
                        tags: "t-SNE, PCA, 차원축소",
                        date: "2025-08-25"
                    },
                    {
                        id: 4,
                        title: "Optimizer 시리즈 심층 분석 - SGD부터 AdamW까지",
                        description: "다양한 옵티마이저의 특성과 실제 성능 비교를 진행했습니다.",
                        tags: "Optimizer, SGD, Adam",
                        date: "2025-08-20"
                    }
                ]
            },
            {
                id: 2,
                title: "백엔드 설계",
                slug: "backend",
                description: "AWS부터 쿠버네티스까지, 클라우드 네이티브 환경을 구축하고 운영하는 과정을 기록합니다.",
                posts: [
                    {
                        id: 5,
                        title: "Circuit Breaker 패턴으로 마이크로서비스 안정성 확보",
                        description: "Spring Cloud Netflix Hystrix를 사용하여 마이크로서비스 간 장애 전파를 방지하는 방법을 학습했습니다.",
                        tags: "Spring Boot, MSA, Circuit Breaker",
                        date: "2025-08-20"
                    },
                    {
                        id: 6,
                        title: "Redis를 활용한 캐싱 전략과 성능 최적화",
                        description: "API 응답 시간을 80% 단축시킨 Redis 캐싱 전략을 정리했습니다.",
                        tags: "Redis, Caching, Performance",
                        date: "2025-08-15"
                    }
                ]
            },
            {
                id: 3,
                title: "프론트엔드 개발",
                slug: "frontend",
                description: "React부터 Vue.js까지, 모던 프론트엔드 개발의 핵심 기술들을 다룹니다.",
                posts: [
                    {
                        id: 7,
                        title: "React 18의 새로운 기능들과 성능 최적화",
                        description: "React 18에서 도입된 Concurrent Features와 Suspense를 실제 프로젝트에 적용해보았습니다.",
                        tags: "React, React 18, Performance",
                        date: "2025-08-05"
                    },
                    {
                        id: 8,
                        title: "Vue 3 Composition API와 TypeScript 통합",
                        description: "Vue 3의 Composition API를 TypeScript와 함께 사용하는 방법을 학습했습니다.",
                        tags: "Vue.js, TypeScript, Composition API",
                        date: "2025-08-01"
                    }
                ]
            }
        ]

        seriesData.value = data
    } catch (error) {
        console.error('시리즈 데이터 로드 실패:', error)
    }
}

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
    loadSeriesData()
})
</script>

<style scoped>
.series-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    gap: 32px;
    padding: 32px;
}

/* 헤더 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding: 0 12px;
    gap: 6px;
}

.header-title h1 {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.33;
    color: #09090B;
    margin: 0;
}

.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    background: #18181B;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    height: 36px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
    background: #27272A;
}

.add-button span {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #FAFAFA;
}

/* 테이블 */
.series-table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 32px 32px;
}

.series-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
}

.table-header {
    border-radius: 6px;
}

.table-row {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #E4E4E7;
}

.table-cell {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 36px;
}

.table-cell-name {
    width: 529px;
    padding: 0 8px 0 0;
}

.table-cell-slug {
    flex: 1;
    padding: 16px;
}

.table-cell-count {
    width: 164px;
    padding: 16px;
}

.table-cell-actions {
    width: 64px;
    padding: 8px;
}

.sort-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    height: 36px;
}

.sort-button:hover {
    background: #F4F4F5;
}

.sort-button span {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #71717A;
}

.sort-button svg {
    color: #71717A;
}

.table-body {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.series-group {
    display: flex;
    flex-direction: column;
}

.series-row {
    background: #FFFFFF;
}

.series-row:hover {
    background: #F9F9FB;
}

.series-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.expand-button:hover {
    background: #F4F4F5;
}

.expand-button svg {
    color: #18181B;
}

.series-name {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
}

.series-slug {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
}

.post-count {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
}

.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.action-button:hover {
    background: #F4F4F5;
}

.action-button svg {
    color: #18181B;
}

.post-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 32px 16px;
    border-bottom: 1px solid #E5E7EB;
}

.post-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.post-name {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
}

/* 반응형 */
@media (max-width: 1024px) {
    .series-page {
        padding: 16px;
    }

    .series-table-container {
        padding: 0 16px 16px;
    }

    .table-cell-name {
        width: 300px;
    }

    .table-cell-count {
        width: 120px;
    }
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .table-cell-name {
        width: 200px;
    }

    .table-cell-slug {
        display: none;
    }

    .table-cell-count {
        width: 100px;
    }
}
</style>
