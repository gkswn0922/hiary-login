<template>
  <aside class="sidebar">
    <!-- 사이드바 헤더 -->
    <div class="sidebar-header">
      <div class="brand-button">
        <div class="brand-icon">
          <div class="star-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
        </div>
        <span class="brand-text">Aiden의 TIL 블로그</span>
      </div>
    </div>

    <!-- 사이드바 콘텐츠 -->
    <div class="sidebar-content">
      <!-- 메인 메뉴 -->
      <div class="sidebar-group">
        <div class="sidebar-menu">
          <!-- 대시보드 -->
          <div class="menu-item">
            <div class="menu-button" :class="{ 'active': $route.path === '/dashboard' }" @click="handleDashboardClick">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <span class="menu-text">대시보드</span>
            </div>
          </div>

          <!-- 탐색 -->
          <div class="menu-item">
            <div class="menu-button" :class="{ 'active': $route.path === '/dashboard/explore' }"
              @click="handleExploreClick">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                </svg>
              </div>
              <span class="menu-text">탐색</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 게시물 그룹 -->
      <div class="sidebar-group">
        <div class="sidebar-menu">
          <!-- 게시물 (확장 가능) -->
          <div class="menu-item">
            <div class="menu-button collapsible">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                  <path d="M8 18h1" />
                  <path d="M18.4 9.6a2 2 0 1 1 3 3L16 18l-4 1 1-4Z" />
                </svg>
              </div>
              <span class="menu-text">게시물</span>
              <div class="collapse-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>

            <!-- 서브메뉴 -->
            <div class="submenu" v-show="isPostsExpanded">
              <div class="submenu-item">
                <div class="submenu-button">
                  <span class="submenu-text">임시저장됨</span>
                  <div class="badge">23</div>
                </div>
              </div>
              <div class="submenu-item">
                <div class="submenu-button">
                  <span class="submenu-text">게시됨</span>
                  <div class="badge">23</div>
                </div>
              </div>
              <div class="submenu-item">
                <div class="submenu-button">
                  <span class="submenu-text">삭제됨</span>
                  <div class="badge">23</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 기타 메뉴 -->
      <div class="sidebar-group">
        <div class="sidebar-menu">
          <!-- 태그 -->
          <div class="menu-item">
            <div class="menu-button" :class="{ 'active': $route.path === '/dashboard/tags' }" @click="handleTagsClick">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                  <path d="m2 17 10 5 10-5" />
                  <path d="m2 12 10 5 10-5" />
                </svg>
              </div>
              <span class="menu-text">태그</span>
            </div>
          </div>

          <!-- 시리즈 -->
          <div class="menu-item">
            <div class="menu-button" :class="{ 'active': $route.path === '/dashboard/series' }"
              @click="handleSeriesClick">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v11a4 4 0 0 0 4 4Z" />
                </svg>
              </div>
              <span class="menu-text">시리즈</span>
            </div>
          </div>

          <!-- 뱃지 -->
          <div class="menu-item">
            <div class="menu-button">
              <div class="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span class="menu-text">뱃지</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 사이드바 푸터 -->
    <div class="sidebar-footer">
      <div class="user-section">
        <div class="user-avatar">
          <img src="/src/assets/avator.svg" alt="User Avatar" />
        </div>
        <div class="chevron-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-toggle">
          <div class="settings-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        <div class="theme-switch">
          <div class="switch-container">
            <div class="switch-track">
              <div class="switch-thumb">
                <div class="sun-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="12" cy="12" r="4" />
                    <path d="m12 2 0 2" />
                    <path d="m12 20 0 2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="m2 12 2 0" />
                    <path d="m20 12 2 0" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 게시물 메뉴 확장 상태
const isPostsExpanded = ref(true)


// 대시보드 클릭 핸들러
const handleDashboardClick = () => {
  router.push('/dashboard')
}

// 탐색 클릭 핸들러
const handleExploreClick = () => {
  router.push('/dashboard/explore')
}

// 태그 클릭 핸들러
const handleTagsClick = () => {
  router.push('/dashboard/tags')
}

// 시리즈 클릭 핸들러
const handleSeriesClick = () => {
  router.push('/dashboard/series')
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 256px;
  height: 100vh;
  background: #FAFAFA;
  position: relative;
}

.sidebar-header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  padding: 8px;
}

.brand-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.brand-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.brand-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px;
  width: 32px;
  height: 32px;
  background: #18181B;
  border-radius: 8px;
}

.star-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #FAFAFA;
}

.brand-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  color: #3F3F46;
  flex: 1;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

.sidebar-group {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 8px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 4px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #71717A;
  text-align: left;
}

.menu-button:hover {
  background: #F4F4F5;
}

.menu-button.collapsible {
  justify-content: space-between;
}

.menu-button.active {
  background: #F4F4F5;
}

.menu-button.active .menu-text {
  color: #18181B;
  font-weight: 500;
}

.menu-button.active .menu-icon {
  color: #18181B;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #3F3F46;
}

.menu-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  color: #3F3F46;
  flex: 1;
}

.collapse-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #3F3F46;
}

.submenu {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 4px;
  padding: 2px 0px 2px 24px;
}

.submenu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 2px;
}

.submenu-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
}

.submenu-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.submenu-text {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  color: #3F3F46;
  flex: 1;
}

.badge {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0px 4px;
  background: #F4F4F5;
  border-radius: 6px;
  position: absolute;
  right: 8px;
  height: 20px;
}

.sidebar-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin-top: auto;
  border-top: 1px solid #E4E4E7;
  background: #FAFAFA;
}

.user-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
}

.user-avatar {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  overflow: hidden;
  background: #FFFFFF;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chevron-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #3F3F46;
}

.settings-section {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.settings-toggle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0);
  border-radius: 6px;
}

.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #18181B;
}

.theme-switch {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.switch-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  padding: 0px 2px;
  width: 36px;
  height: 20px;
  background: #18181B;
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 9999px;
}

.switch-track {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  border-radius: 9999px;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.switch-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
}

.sun-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  color: #FFFFFF;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #E4E4E7;
    border-right: none;
  }

  .sidebar-content {
    overflow-y: visible;
  }
}
</style>
