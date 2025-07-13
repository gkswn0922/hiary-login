<template>
  <div class="tags-page">
    <div class="tags-header">
      <div class="title-section">
        <h1 class="page-title">태그</h1>
      </div>
      <button class="add-button">추가하기</button>
    </div>

    <div class="tags-table">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="table-head">
                <button class="sort-button">
                  <span>이름</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M7 15l5-5 5 5" />
                    <path d="M7 9l5 5 5-5" />
                  </svg>
                </button>
              </th>
              <th class="table-head">
                <button class="sort-button">
                  <span>슬러그</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M7 15l5-5 5 5" />
                    <path d="M7 9l5 5 5-5" />
                  </svg>
                </button>
              </th>
              <th class="table-head">
                <button class="sort-button">
                  <span>포스트 개수</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M7 15l5-5 5 5" />
                    <path d="M7 9l5 5 5-5" />
                  </svg>
                </button>
              </th>
              <th class="table-head table-head-actions"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tagsList" :key="tag.id" class="table-row">
              <td class="table-cell">{{ tag.name }}</td>
              <td class="table-cell">{{ tag.slug }}</td>
              <td class="table-cell">{{ tag.postCount }}개의 포스트</td>
              <td class="table-cell table-cell-actions">
                <button class="action-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 태그 페이지 데이터
const tagsList = [
  {
    id: 1,
    name: "JavaScript",
    slug: "#javascript",
    postCount: 1
  },
  {
    id: 2,
    name: "React",
    slug: "#react",
    postCount: 0
  },
  {
    id: 3,
    name: "Vue.js",
    slug: "#vuejs",
    postCount: 3
  },
  {
    id: 4,
    name: "파이썬",
    slug: "#python",
    postCount: 4
  },
  {
    id: 5,
    name: "API 통합",
    slug: "#api-integration",
    postCount: 5
  }
]
</script>

<style scoped>
.tags-page {
  width: 100%;
  padding: 0px 32px 32px;
}

.tags-header {
  display: flex;
  align-items: flex-end;
  align-self: stretch;
  gap: 6px;
  padding: 12px 32px 0px;
}

.title-section {
  flex: 1;
}

.page-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -1.67%;
  color: #09090B;
  margin: 0;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #18181B;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  height: 36px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #FFFFFF;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
  background: #27272A;
}

.tags-table {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.table-container {
  border-radius: 6px;
  border: 1px solid #E4E4E7;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-head {
  border-bottom: 1px solid #E4E4E7;
  padding: 0px 8px 0px 0px;
  text-align: left;
}

.table-head-actions {
  width: 64px;
  padding: 0px 8px;
}

.sort-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
  width: 100%;
}

.sort-button:hover {
  background: #F4F4F5;
}

.sort-button svg {
  color: #71717A;
}

.table-row {
  border-bottom: 1px solid #E4E4E7;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 8px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
  border-bottom: 1px solid #E4E4E7;
}

.table-cell-actions {
  text-align: center;
  padding: 8px;
}

.action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 32px;
  height: 32px;
}

.action-button:hover {
  background: #F4F4F5;
}

.action-button svg {
  color: #18181B;
}

@media (max-width: 1200px) {
  .tags-page {
    padding: 12px;
  }

  .tags-header {
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .add-button {
    align-self: flex-start;
  }

  .table-container {
    overflow-x: auto;
  }
}
</style>
