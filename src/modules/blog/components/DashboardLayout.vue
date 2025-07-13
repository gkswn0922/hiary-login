<template>
    <div class="dashboard-container">
        <!-- 사이드바 -->
        <DashboardSidebar />

        <!-- 메인 콘텐츠 -->
        <main class="main-content">
            <!-- 헤더 -->
            <DashboardHeader />

            <!-- 콘텐츠 영역 -->
            <div class="content">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import DashboardSidebar from '@/components/DashboardSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<style scoped>
.dashboard-container {
    display: flex;
    flex-direction: row;
    width: 1920px;
    height: 100vh;
    margin: 0 auto;
}

.main-content {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex: 1;
    background: #FFFFFF;
    border-left: 1px solid #E4E4E7;
    height: 100vh;
    overflow-y: auto;
}

.content {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 32px;
    padding: 16px;
    flex: 1;
}

@media (max-width: 1920px) {
    .dashboard-container {
        width: 100%;
        max-width: 1920px;
        height: 100vh;
    }
}

@media (max-width: 1200px) {
    .dashboard-container {
        width: 100%;
        flex-direction: column;
        height: auto;
    }

    .content {
        padding: 12px;
    }
}
</style>
