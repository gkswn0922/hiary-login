<template>
  <header class="header">
    <div class="header-content">
      <button class="sidebar-toggle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      </button>
      <div class="separator"></div>
      <nav class="breadcrumb">
        <span class="breadcrumb-current">{{ getBreadcrumbTitle() }}</span>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const getBreadcrumbTitle = () => {
  switch (route.path) {
    case '/dashboard':
      return '대시보드'
    case '/dashboard/explore':
      return '탐색'
    case '/dashboard/tags':
      return '태그'
    case '/dashboard/series':
      return '시리즈'
    case '/dashboard/badges':
      return '뱃지'
    default:
      return '대시보드'
  }
}
</script>

<style scoped>
/* 헤더 */
.header {
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 0px 16px;
  border-bottom: 1px solid #E4E4E7;
  height: 64px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #18181B;
  cursor: pointer;
}

.sidebar-toggle:hover {
  background: #F4F4F5;
}

.separator {
  width: 1px;
  height: 15px;
  background: #E4E4E7;
}

.breadcrumb-current {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}
</style>
