<template>
    <div class="explore-page">
        <!-- 탐색 검색 -->
        <div class="content-header">
            <div class="title-section">
                <h1 class="page-title">탐색</h1>
            </div>
            <div class="search-container">
                <div class="search-input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.3">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
        </div>

        <!-- 탐색 콘텐츠 -->
        <div class="explore-content">
            <!-- 콘텐츠 섹션들 -->
            <div class="content-sections">
                <!-- 트렌딩 섹션 -->
                <section class="content-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <h2 class="section-title">트렌딩</h2>
                            <button class="view-all-btn">
                                <span>전체보기</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <div class="navigation-controls">
                            <button class="nav-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button class="nav-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="blog-cards-horizontal">
                        <div class="blog-card horizontal-card" v-for="blog in trendingBlogs" :key="blog.id">
                            <div class="card-image" :style="{ backgroundColor: blog.color }"></div>
                            <div class="card-content">
                                <div class="card-info">
                                    <h3 class="card-title">{{ blog.title }}</h3>
                                    <p class="card-description">{{ blog.description }}</p>
                                </div>
                                <div class="card-footer">
                                    <span class="card-url">{{ blog.url }}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1.3">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 12l4 4 4-4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 구분선 -->
                <div class="section-separator"></div>

                <!-- Javascript 관련 블로그 섹션 -->
                <section class="content-section">
                    <div class="section-header">
                        <div class="section-title-wrapper">
                            <h2 class="section-title">Javascript와 관련된 블로그</h2>
                            <button class="view-all-btn">
                                <span>전체보기</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M5 12h14" />
                                    <path d="M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        <div class="navigation-controls">
                            <button class="nav-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button class="nav-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.3">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="blog-cards-vertical">
                        <div class="blog-card vertical-card" v-for="blog in javascriptBlogs" :key="blog.id">
                            <div class="card-image-vertical"></div>
                            <div class="card-content-vertical">
                                <div class="card-info">
                                    <h3 class="card-title">{{ blog.title }}</h3>
                                    <p class="card-description">{{ blog.description }}</p>
                                </div>
                                <div class="card-footer">
                                    <span class="card-url">{{ blog.url }}</span>
                                    <button class="visit-btn">
                                        <span>방문하기</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="1.3">
                                            <path d="M5 12h14" />
                                            <path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 구분선 -->
                <div class="section-separator"></div>

                <!-- 푸터 -->
                <footer class="explore-footer">
                    <h3 class="footer-title">더 많은 주제 탐색하기</h3>
                    <div class="tech-tags">
                        <div class="tag-row">
                            <button class="tech-tag" v-for="tag in techTags.slice(0, 7)" :key="tag">{{ tag }}</button>
                        </div>
                        <div class="tag-row">
                            <button class="tech-tag" v-for="tag in techTags.slice(7, 14)" :key="tag">{{ tag }}</button>
                        </div>
                        <div class="tag-row">
                            <button class="tech-tag" v-for="tag in techTags.slice(14, 21)" :key="tag">{{ tag }}</button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 탐색 페이지 데이터
const trendingBlogs = [
    {
        id: 1,
        title: "Dev Sprint Log",
        description: "매일매일의 개발 과정과 문제 해결 과정을 기록하는 팀 개발 TIL 블로그",
        url: "hiary.ai/devsprintlog",
        color: "#294FF7"
    },
    {
        id: 2,
        title: "Code Recipe",
        description: "신입부터 시니어까지, 실무에서 바로 쓰는 코드 패턴과 노하우 공유",
        url: "hiary.ai/coderecipe",
        color: "#BEF57B"
    },
    {
        id: 3,
        title: "Tech Growth Journal",
        description: "커리어 성장, 기술 트렌드, 개발자의 성장 노하우를 다루는 인사이트 블로그",
        url: "hiary.ai/techgrowth",
        color: "#F7D354"
    },
    {
        id: 4,
        title: "Dev Sprint Log",
        description: "매일매일의 개발 과정과 문제 해결 과정을 기록하는 팀 개발 TIL 블로그",
        url: "hiary.ai/devsprintlog",
        color: "#1749F7"
    }
]

const javascriptBlogs = [
    {
        id: 1,
        title: "Daily Dev Nuggets",
        description: "하루 한 가지 개발 팁과 실전 사례를 짧고 굵게 공유하는 일일 TIL 블로그",
        url: "hiary.ai/dailydevnuggets"
    },
    {
        id: 2,
        title: "Debugging Stories",
        description: "에러 극복 과정과 삽질 기록을 공유하는 문제해결 블로그",
        url: "hiary.ai/backendbuilders"
    },
    {
        id: 3,
        title: "Frontend Diary",
        description: "UI/UX, 프론트엔드 프레임워크, 트렌드까지 한눈에 정리하는 프론트엔드 저널",
        url: "hiary.ai/frontenddiary"
    },
    {
        id: 4,
        title: "Frontend Diary",
        description: "UI/UX, 프론트엔드 프레임워크, 트렌드까지 한눈에 정리하는 프론트엔드 저널",
        url: "hiary.ai/devsprintlog"
    }
]

const techTags = [
    "Javascript", "Typescript", "React", "Vue.js", "Angular", "Node.js", "Express",
    "Python", "Django", "Flask", "Java", "Spring", "Kotlin", "Swift",
    "iOS", "Android", "API", "GraphQL", "Rest", "Database", "MySQL"
]
</script>

<style scoped>
.explore-page {
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

.search-container {
    display: flex;
    align-items: center;
    width: 336px;
}

.search-input {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 4px;
    padding: 4px 12px;
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    border-radius: 6px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    width: 100%;
    height: 32px;
}

.search-input svg {
    color: #71717A;
    flex-shrink: 0;
}

.search-input input {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.43;
    color: #71717A;
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
}

.search-input input::placeholder {
    color: #71717A;
}

.explore-content {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 32px;
    flex: 1;
}

.content-sections {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.content-section {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 12px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    gap: 10px;
}

.section-title-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-title {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #09090B;
    margin: 0;
}

.view-all-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    height: 24px;
}

.view-all-btn span {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.33;
    color: #DC2626;
}

.view-all-btn svg {
    color: #DC2626;
}

.view-all-btn:hover {
    background: #F4F4F5;
}

.navigation-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 64px;
    gap: 8px;
}

.nav-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 24px;
    height: 24px;
}

.nav-btn svg {
    color: #18181B;
}

.nav-btn:hover {
    background: #F4F4F5;
}

.blog-cards-horizontal {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    gap: 12px;
}

.blog-cards-vertical {
    display: flex;
    flex-direction: row;
    align-self: stretch;
    gap: 12px;
}

.blog-card {
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
}

.horizontal-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
}

.vertical-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 16px;
    width: 301.33px;
    background: #F4F4F5;
}

.card-image {
    display: flex;
    align-items: center;
    align-self: stretch;
    height: 100px;
    border-radius: 8px 8px 0px 0px;
}

.card-image-vertical {
    width: 40px;
    height: 40px;
    background: #E9E9E9;
    border-radius: 9999px;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 8px;
    padding: 16px;
}

.card-content-vertical {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 8px;
    padding: 4px 0px;
}

.card-info {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 4px;
    height: 73px;
}

.card-title {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
    margin: 0;
    height: 20px;
}

.vertical-card .card-title {
    color: #18181B;
}

.card-description {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.33;
    color: #18181B;
    margin: 0;
    opacity: 0.7;
    height: 49px;
}

.vertical-card .card-description {
    color: #71717A;
    opacity: 1;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    gap: 8px;
}

.card-url {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.33;
    color: #18181B;
    flex: 1;
}

.vertical-card .card-url {
    color: #000000;
}

.card-footer svg {
    color: #18181B;
}

.vertical-card .card-footer svg {
    color: #18181B;
}

.visit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: #F4F4F5;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    height: 24px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.visit-btn span {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.33;
    color: #18181B;
}

.visit-btn svg {
    color: #18181B;
}

.visit-btn:hover {
    background: #E4E4E7;
}

.section-separator {
    align-self: stretch;
    height: 1px;
    background: #E4E4E7;
}

.explore-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 32px;
    width: 100%;
    max-width: 1024px;
    min-height: 200px;
    background: #F4F4F5;
    margin: 0 auto;
    padding: 32px 16px;
}

.footer-title {
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 1;
    color: #18181B;
    text-align: center;
    margin: 0;
}

.tech-tags {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.tag-row {
    display: flex;
    gap: 8px;
}

.tech-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #18181B;
    border-radius: 9999px;
    cursor: pointer;
    height: 36px;
    font-family: 'Pretendard Variable', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.43;
    color: #18181B;
}

.tech-tag:hover {
    background: #F4F4F5;
}

@media (max-width: 1200px) {
    .explore-page {
        padding: 12px;
    }

    .content-header {
        padding: 12px;
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    .search-container {
        width: 100%;
    }

    .content-sections {
        gap: 16px;
    }

    .blog-cards-horizontal,
    .blog-cards-vertical {
        flex-wrap: wrap;
        justify-content: center;
    }

    .explore-footer {
        padding: 24px 16px;
    }
}
</style>
