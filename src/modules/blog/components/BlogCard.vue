<template>
  <Card class="blog-card">
    <div class="card-content">
      <!-- 이미지 플레이스홀더 -->
      <div class="image-placeholder"></div>

      <!-- 텍스트 콘텐츠 -->
      <div class="text-content">
        <!-- 배지와 날짜 -->
        <div class="badge-date-row">
          <div class="badge-container">
            <Badge class="ai-badge">인공지능</Badge>
            <div class="tags-container">
              <span class="tags-text">{{ props.tags }}</span>
            </div>
          </div>
          <span class="date-text">{{ props.date }}</span>
        </div>

        <!-- 제목 -->
        <div class="title-container">
          <h3 class="title-text">{{ props.title }}</h3>
        </div>

        <!-- 설명 -->
        <div class="description-container">
          <p class="description-text">{{ props.description }}</p>
        </div>

        <!-- 더 보기 버튼 -->
        <div class="button-container">
          <button class="more-button">
            <span class="button-text">더 보기</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12,5 19,12 12,19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '../components/ui/card.vue'
import Badge from '../components/ui/badge.vue'

interface BlogCardProps {
  title: string
  description: string
  tags: string
  date: string
}

const props = defineProps<BlogCardProps>()
</script>

<style scoped>
.blog-card {
  width: 1024px;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.card-content {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  min-height: 200px;
}

.image-placeholder {
  width: 260px;
  height: 100%;
  background: #E9E9E9;
  flex-shrink: 0;
}

.text-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 24px 24px 0;
}

.badge-date-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  padding-bottom: 12px;
}

.badge-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-radius: 9999px;
}

.ai-badge {
  background: #18181B !important;
  color: #FAFAFA !important;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  padding: 2px 8px;
  /* border-radius: 6px; */
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

.date-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
  width: 128px;
  height: 28px;
  display: flex;
  align-items: center;
}

.title-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding-bottom: 12px;
}

.title-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.25;
  color: #09090B;
  text-align: left;
  flex: 1;
  margin: 0;
}

.description-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  align-self: stretch;
  padding-bottom: 12px;
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
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 8px;
}

.more-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  width: auto;
}

.more-button:hover {
  background: #F4F4F5;
}

.button-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25;
  color: #18181B;
  text-align: left;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #18181B;
  flex-shrink: 0;
}

/* 반응형 처리 */
@media (max-width: 1024px) {
  .blog-card {
    width: 100%;
    max-width: 1024px;
  }
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
    gap: 16px;
  }

  .image-placeholder {
    width: 100%;
    height: 200px;
  }

  .text-content {
    padding: 16px;
  }

  .badge-date-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .date-text {
    width: auto;
    height: auto;
  }
}
</style>
