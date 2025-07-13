<template>
  <div class="series-card">
    <!-- 이미지 플레이스홀더 -->
    <div class="image-container">
      <div class="image-placeholder"></div>
    </div>

    <!-- 텍스트 콘텐츠 -->
    <div class="text-content">
      <!-- 배지와 태그 -->
      <div class="badge-container">
        <Badge class="series-badge">{{ props.category }}</Badge>
        <div class="tags-container">
          <span class="tags-text">{{ props.tags }}</span>
        </div>
      </div>

      <!-- 제목과 화살표 -->
      <div class="title-container">
        <h3 class="title-text">{{ props.title }}</h3>
        <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7 7 10 10"></path>
          <path d="M7 17h10V7"></path>
        </svg>
      </div>

      <!-- 설명 -->
      <div class="description-container">
        <p class="description-text">{{ props.description }}</p>
      </div>

      <!-- 날짜 -->
      <div class="date-container">
        <span class="date-text">{{ props.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '../components/ui/badge.vue'

interface SeriesCardProps {
  title: string
  description: string
  tags: string
  date: string
  category: string
}

const props = defineProps<SeriesCardProps>()
</script>

<style scoped>
.series-card {
  width: 380px;
  height: 100%;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.series-card:hover {
  background: #FAFAFA;
}

.image-container {
  width: 100%;
  height: auto;
  padding: 0;
  flex-shrink: 0;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  background: #E9E9E9;
  border-radius: 12px;
}

.text-content {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 0;
  flex: 1;
}

.badge-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border: 1px solid #E4E4E7;
  border-radius: 9999px;
  margin-bottom: 16px;
  width: fit-content;
}

.series-badge {
  background: #18181B !important;
  color: #FAFAFA !important;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  padding: 2px 8px;
  border-radius: 6px;
  border: none;
}

.tags-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
}

.tags-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  color: #09090B;
  text-align: center;
}

.title-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  padding: 16px 0 12px 0;
  margin-bottom: 8px;
}

.title-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 30px;
  line-height: 1.2;
  color: #09090B;
  text-align: left;
  flex: 1;
  margin: 0;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  color: #18181B;
  flex-shrink: 0;
}

.description-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding: 0 0 20px 0;
  margin-bottom: 8px;
  flex: 1;
}

.description-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #71717A;
  text-align: left;
  flex: 1;
  margin: 0;
  height: 96px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.date-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 8px;
}

.date-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
  width: 124px;
}
</style>
