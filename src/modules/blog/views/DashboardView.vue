<template>
  <div class="dashboard-page">
    <!-- 타이틀 & 컨트롤 -->
    <div class="content-header">
      <div class="title-section">
        <h1 class="page-title">대시보드</h1>
      </div>
      <!-- 대시보드 컨트롤 -->
      <div class="controls">
        <div class="date-picker">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.33">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <span>2025년 5월 22일 - 6월 22일</span>
        </div>
        <div class="period-select">
          <span>30일 간</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.33">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 대시보드 그리드 -->
    <div class="dashboard-grid">
      <!-- 방문자 수 통계 -->
      <div class="stats-card large">
        <div class="card-header">
          <h3 class="card-title">전체 방문자 수</h3>
          <div class="stats-values">
            <span class="primary-stat">+400</span>
            <span class="growth-rate">+75%</span>
          </div>
        </div>
        <div class="chart-container">
          <div class="line-chart">
            <svg viewBox="0 0 880 106" class="chart-svg">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#2563EB;stop-opacity:0.1" />
                  <stop offset="100%" style="stop-color:#2563EB;stop-opacity:0" />
                </linearGradient>
              </defs>
              <path d="M10 80 L150 60 L300 45 L450 20 L600 35 L750 25 L870 30" stroke="#2563EB" stroke-width="2"
                fill="none" />
              <path d="M10 80 L150 60 L300 45 L450 20 L600 35 L750 25 L870 30 L870 106 L10 106 Z"
                fill="url(#chartGradient)" />
            </svg>
            <div class="chart-labels">
              <span>5월 22일</span>
              <span>6월 22일</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 유입 경로 & 도넛차트 -->
      <div class="stats-card medium">
        <div class="traffic-container">
          <div class="traffic-table">
            <h4 class="table-title">유입 경로</h4>
            <div class="table-content">
              <div class="table-row">
                <div class="source-item">
                  <div class="color-dot red"></div>
                  <span>Google 검색</span>
                </div>
                <span class="visitor-count">100</span>
              </div>
              <div class="table-row">
                <div class="source-item">
                  <div class="color-dot blue"></div>
                  <span>Facebook</span>
                </div>
                <span class="visitor-count">100</span>
              </div>
              <div class="table-row">
                <div class="source-item">
                  <div class="color-dot yellow"></div>
                  <span>X (Twitter)</span>
                </div>
                <span class="visitor-count">100</span>
              </div>
              <div class="table-row">
                <div class="source-item">
                  <div class="color-dot orange"></div>
                  <span>직접 방문 (Direct)</span>
                </div>
                <span class="visitor-count">100</span>
              </div>
              <div class="table-row">
                <div class="source-item">
                  <div class="color-dot green"></div>
                  <span>이메일 뉴스레터 (Email)</span>
                </div>
                <span class="visitor-count">100</span>
              </div>
            </div>
          </div>
          <div class="donut-chart">
            <svg width="192" height="192" viewBox="0 0 192 192">
              <circle cx="96" cy="96" r="80" fill="none" stroke="#E76E50" stroke-width="20"
                stroke-dasharray="125.6 376.8" stroke-dashoffset="0" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#274754" stroke-width="20"
                stroke-dasharray="125.6 376.8" stroke-dashoffset="-125.6" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#E8C468" stroke-width="20"
                stroke-dasharray="125.6 376.8" stroke-dashoffset="-251.2" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#F4A462" stroke-width="20"
                stroke-dasharray="125.6 376.8" stroke-dashoffset="-376.8" />
              <circle cx="96" cy="96" r="80" fill="none" stroke="#2A9D90" stroke-width="20"
                stroke-dasharray="125.6 376.8" stroke-dashoffset="-502.4" />
            </svg>
            <div class="donut-center">
              <span class="donut-value">500</span>
              <span class="donut-label">방문자</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 참여도 -->
      <div class="stats-card small">
        <h3 class="card-title">참여도</h3>
        <div class="engagement-stats">
          <div class="stat-item">
            <span class="stat-value">0%</span>
            <span class="stat-label">최근 30일간 참여</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">0%</span>
            <span class="stat-label">최근 7일간 참여</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">1</span>
            <span class="stat-label">팔로워</span>
          </div>
        </div>
      </div>

      <!-- 최근 포스트 -->
      <div class="stats-card large">
        <div class="posts-container">
          <div class="posts-header">
            <div class="tabs">
              <button class="tab active">최근 포스트</button>
              <button class="tab">팔로워 활동</button>
            </div>
          </div>
          <div class="posts-table">
            <div class="table-header">
              <span class="header-title">제목</span>
              <span class="header-date">발행일</span>
              <span class="header-views">조회수</span>
            </div>
            <div class="table-body">
              <div class="post-row">
                <span class="post-title">Git rebase 중 충돌 해결 과정 기록</span>
                <span class="post-date">2025년 6월 22일</span>
                <span class="post-views">100</span>
              </div>
              <div class="post-row">
                <span class="post-title">React useEffect 의존성 배열, 왜 주의해야 할까?</span>
                <span class="post-date">2025년 6월 21일</span>
                <span class="post-views">100</span>
              </div>
              <div class="post-row">
                <span class="post-title">Docker Compose로 로컬 개발 환경 빠르게 세팅하기</span>
                <span class="post-date">2025년 6월 20일</span>
                <span class="post-views">100</span>
              </div>
              <div class="post-row">
                <span class="post-title">S3 버킷 퍼블릭 접근 오류, 원인과 해결법</span>
                <span class="post-date">2025년 6월 19일</span>
                <span class="post-views">100</span>
              </div>
              <div class="post-row">
                <span class="post-title">Jest에서 비동기 함수 테스트하는 방법 정리</span>
                <span class="post-date">2025년 6월 18일</span>
                <span class="post-views">100</span>
              </div>
            </div>
          </div>
          <button class="view-all-btn">
            모든 포스트 보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.33">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- TIL 가이드 카드들 -->
      <div class="guide-cards">
        <div class="guide-card">
          <div class="guide-image"></div>
          <div class="guide-content">
            <div class="guide-badge">hiary AI 가이드</div>
            <h4 class="guide-title">효과적인 TIL 작성법</h4>
            <p class="guide-description">오늘 배운 핵심 내용을 한 문장으로 먼저 정리해보세요. 이어서, 실제로 겪었던 문제 상황과 이를 어떻게
              해결했는지 구체적으로 작성하면 좋습니다. 마지막으로, 내일 적용해보고 싶은 점이나 추가로 궁금한 내용을 덧붙이면 더욱 알찬 TIL이 완성됩니다.</p>
            <button class="guide-btn">전체 가이드 읽기</button>
          </div>
        </div>
        <div class="guide-card">
          <div class="guide-content">
            <div class="guide-badge">hiary AI 뉴스레터</div>
            <h4 class="guide-title">실행 가능한 코드와 설명을 함께 작성하기</h4>
            <p class="guide-description">코드 예시는 실제로 동작하는지 꼭 테스트한 후 공유하세요. 코드 블록 아래에는 해당 코드가 어떤 문제를
              해결하는지, 동작 원리가 무엇인지 간단하게 설명을 덧붙이면 이해도가 높아집니다. 마지막으로, 비슷한 상황에서 참고할 수 있는 팁이나 주의할 점도 함께
              기록해두면 좋습니다.</p>
            <button class="guide-btn-primary">주간 팁을 메일로 받아보기</button>
          </div>
        </div>
      </div>

      <!-- 추천 블로그 -->
      <div class="stats-card small">
        <h3 class="card-title">개발 분야 추천 블로그</h3>
        <div class="blog-recommendations">
          <div class="blog-item">
            <div class="blog-avatar"></div>
            <div class="blog-info">
              <h5 class="blog-name">Dev Sprint Log</h5>
              <p class="blog-description">매일매일의 개발 과정과 문제 해결 과정을 기록하는 팀 개발 TIL 블로그</p>
              <div class="blog-actions">
                <span class="blog-url">hiary.ai/devsprintlog</span>
                <button class="blog-visit-btn">방문하기</button>
              </div>
            </div>
          </div>
          <div class="separator-horizontal"></div>
          <div class="blog-item">
            <div class="blog-avatar"></div>
            <div class="blog-info">
              <h5 class="blog-name">Code Recipe</h5>
              <p class="blog-description">신입부터 시니어까지, 실무에서 바로 쓰는 코드 패턴과 노하우 공유</p>
              <div class="blog-actions">
                <span class="blog-url">hiary.ai/coderecipe</span>
                <button class="blog-visit-btn">방문하기</button>
              </div>
            </div>
          </div>
          <div class="separator-horizontal"></div>
          <div class="blog-item">
            <div class="blog-avatar"></div>
            <div class="blog-info">
              <h5 class="blog-name">Tech Growth Journal</h5>
              <p class="blog-description">커리어 성장, 기술 트렌드, 개발자의 성장 노하우를 다루는 인사이트 블로그</p>
              <div class="blog-actions">
                <span class="blog-url">hiary.ai/techgrowth</span>
                <button class="blog-visit-btn">방문하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 하단 카드들 -->
      <div class="bottom-cards">
        <div class="community-card">
          <div class="community-badge">hiaryAI 크리에이터 커뮤니티</div>
          <h3 class="community-title">전략을 이야기하세요. 조언을 받아보세요.<br>혹은 그냥 놀러오셔도 좋아요.</h3>
          <button class="community-btn">커뮤니티 참여하기</button>
        </div>
        <div class="news-card">
          <div class="news-badge">새로운 소식</div>
          <div class="news-items">
            <div class="news-item">
              <h4 class="news-title">TIL 에디터 디자인 설정 추가</h4>
              <span class="news-date">2025년 6월 22일</span>
            </div>
            <div class="news-item">
              <h4 class="news-title">프로필 소셜 링크 확대</h4>
              <span class="news-date">2025년 6월 22일</span>
            </div>
            <div class="news-item">
              <h4 class="news-title">기기 인증 및 이메일 2단계 보안</h4>
              <span class="news-date">2025년 6월 22일</span>
            </div>
          </div>
          <button class="news-btn">전체 기능 살펴보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 대시보드 페이지에는 별도 로직 없음
</script>

<style scoped>
.dashboard-page {
  width: 100%;
  padding: 0px 32px 32px;
}

.content-header {
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

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.date-picker svg {
  color: #18181B;
}

.date-picker span {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.period-select {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.period-select span {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.period-select svg {
  color: #18181B;
}

/* 대시보드 그리드 */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 32px;
}

.stats-card {
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.stats-card.large {
  align-self: stretch;
}

.stats-card.medium {
  align-self: stretch;
}

.stats-card.small {
  align-self: stretch;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.card-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #09090B;
  margin: 0;
}

.stats-values {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.primary-stat {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.33;
  color: #09090B;
}

.growth-rate {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
}

/* 차트 */
.chart-container {
  width: 100%;
  height: 106px;
}

.line-chart {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #71717A;
}

/* 트래픽 컨테이너 */
.traffic-container {
  display: flex;
  align-items: center;
  gap: 48px;
}

.traffic-table {
  flex: 1;
}

.table-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #09090B;
  margin: 0 0 16px 0;
  padding: 0 8px;
  border-bottom: 1px solid #E4E4E7;
  padding-bottom: 8px;
}

.table-content {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #E4E4E7;
}

.table-row:last-child {
  border-bottom: none;
}

.source-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.color-dot.red {
  background: #E76E50;
}

.color-dot.blue {
  background: #274754;
}

.color-dot.yellow {
  background: #E8C468;
}

.color-dot.orange {
  background: #F4A462;
}

.color-dot.green {
  background: #2A9D90;
}

.source-item span,
.visitor-count {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

/* 도넛 차트 */
.donut-chart {
  position: relative;
  width: 192px;
  height: 192px;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-value {
  display: block;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.2;
  color: #18181B;
}

.donut-label {
  display: block;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
}

/* 참여도 */
.engagement-stats {
  display: flex;
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.stat-value {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.33;
  color: #09090B;
}

.stat-label {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
}

.stat-divider {
  width: 1px;
  height: 48px;
  background: #E4E4E7;
  margin: 0 8px;
}

/* 포스트 */
.posts-container {
  width: 100%;
}

.posts-header {
  margin-bottom: 8px;
}

.tabs {
  display: flex;
  align-items: center;
  padding: 4px;
  background: #F4F4F5;
  border-radius: 8px;
  width: fit-content;
}

.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
  cursor: pointer;
}

.tab.active {
  background: #FFFFFF;
  color: #18181B;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.posts-table {
  margin-bottom: 8px;
}

.table-header {
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #E4E4E7;
}

.header-title {
  flex: 1;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
}

.header-date {
  width: 120px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
}

.header-views {
  width: 80px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.post-row {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #E4E4E7;
}

.post-row:last-child {
  border-bottom: none;
}

.post-title {
  flex: 1;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.post-date {
  width: 120px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.post-views {
  width: 80px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
}

.view-all-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
  cursor: pointer;
}

.view-all-btn:hover {
  background: rgba(244, 244, 245, 0.5);
}

/* 가이드 카드 */
.guide-cards {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px;
}

.guide-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #F4F4F5;
  border-radius: 8px;
  flex: 1;
}

.guide-image {
  width: 216px;
  height: 150px;
  background: #E9E9E9;
  border-radius: 8px;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0px;
  flex: 1;
}

.guide-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  background: #F4F4F5;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  width: fit-content;
}

.guide-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
  margin: 0;
}

.guide-description {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
  margin: 0;
}

.guide-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  cursor: pointer;
  width: fit-content;
}

.guide-btn-primary {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0px;
  border: none;
  background: #18181B;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #FAFAFA;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

/* 블로그 추천 */
.blog-recommendations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-item {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px;
}

.blog-avatar {
  width: 40px;
  height: 40px;
  background: #E9E9E9;
  border-radius: 50%;
}

.blog-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0px;
  flex: 1;
}

.blog-name {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
  margin: 0;
}

.blog-description {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
  margin: 0;
}

.blog-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.blog-url {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #000000;
}

.blog-visit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F4F4F5;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.separator-horizontal {
  height: 1px;
  background: #E4E4E7;
  margin: 0 8px;
}

/* 하단 카드 */
.bottom-cards {
  display: flex;
  gap: 24px;
}

.community-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #F4F4F5;
  border: 1px solid #E4E4E7;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  width: 601px;
  height: 269px;
}

.community-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  width: fit-content;
}

.community-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 30px;
  line-height: 1;
  color: #18181B;
  margin: 0;
  flex: 1;
}

.community-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  cursor: pointer;
  width: fit-content;
}

.news-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  width: 299px;
  height: 269px;
}

.news-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  width: fit-content;
}

.news-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.news-item {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.news-title {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: #18181B;
  margin: 0;
}

.news-date {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #71717A;
  width: 88px;
}

.news-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 0px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.33;
  color: #18181B;
  cursor: pointer;
  width: fit-content;
}

@media (max-width: 1200px) {
  .dashboard-page {
    padding: 12px;
  }

  .content-header {
    padding: 12px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .dashboard-grid {
    gap: 16px;
  }

  .traffic-container {
    flex-direction: column;
    gap: 24px;
  }

  .guide-cards {
    flex-direction: column;
    padding: 16px;
  }

  .guide-card {
    flex-direction: column;
    text-align: center;
  }

  .guide-image {
    width: 100%;
    max-width: 216px;
    align-self: center;
  }

  .bottom-cards {
    flex-direction: column;
  }

  .community-card,
  .news-card {
    width: 100%;
    height: auto;
  }
}
</style>
