<template>
  <nav class="w-full bg-white border-b border-gray-200">
    <div class="max-w-full mx-auto px-12">
      <div class="max-w-6xl mx-auto flex items-center justify-between h-16">
        <!-- 로고 -->
        <div class="flex items-center gap-2">
          <h1 class="logo-text">
            Aiden's Blog
          </h1>
        </div>

        <!-- 네비게이션 메뉴 -->
        <div class="flex items-center gap-1">
          <router-link to="/blog" class="nav-item" :class="{ 'nav-item-active': $route.path === '/blog' }">
            홈
          </router-link>
          <router-link to="/til" class="nav-item" :class="{ 'nav-item-active': $route.path === '/til' }">
            TIL
          </router-link>
          <router-link to="/series" class="nav-item" :class="{ 'nav-item-active': $route.path === '/series' }">
            시리즈
          </router-link>
        </div>

        <!-- 팔로우 버튼 -->
        <div class="flex items-center">
          <button @click="toggleFollow" class="follow-button" :class="{ 'following': isFollowing }">
            <!-- 팔로우 아이콘 -->
            <svg v-if="!isFollowing" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" class="follow-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>

            <!-- 팔로잉 아이콘 (체크마크) -->
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="follow-icon">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>

            {{ isFollowing ? '팔로잉' : '팔로우' }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'


// 팔로우 관련 상태
const isFollowing = ref(false)
const isLoading = ref(false)

// 팔로우 토글 함수
const toggleFollow = async () => {
  isLoading.value = true

  try {
    // API URL 설정
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

    // 방문한 사용자 ID
    const visitedUserId = 'aiden_cho'

    // 팔로우 상태
    const newFollowStatus = !isFollowing.value

    // POST 요청 데이터
    const requestData = {
      user_id: visitedUserId,
      follow_status: newFollowStatus
    }

    // API 호출
    const response = await fetch(`${API_URL}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    // 성공시 상태 업데이트
    isFollowing.value = newFollowStatus

    console.log('Follow success', result)

  } catch (error) {
    console.error('Follow failed', error)

  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #09090B;
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

.nav-item:hover {
  background-color: rgba(244, 244, 245, 0.5);
}

.nav-item-active {
  background-color: rgba(244, 244, 245, 0.7);
  font-weight: 600;
}

.follow-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background-color: #2563EB;
  color: white;
  border: 1px solid #2563EB;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  min-width: 88px;
  justify-content: center;
}

.follow-button:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
  color: white;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
}

.follow-button:hover .follow-icon {
  color: white;
}

.follow-button.following {
  background-color: white;
  color: #2563EB;
  border: 1px solid #2563EB;
}

.follow-button.following:hover {
  background-color: #F0F4FF;
  border-color: #1d4ed8;
  color: #1d4ed8;
}

.follow-button.following .follow-icon {
  color: #2563EB;
}

.follow-button.following:hover .follow-icon {
  color: #1d4ed8;
}

.follow-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #09090B;
  cursor: pointer;
}

.logo-text:hover {
  color: #2563EB;
}
</style>
