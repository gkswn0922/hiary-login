<template>
  <footer class="w-full bg-white border-t border-gray-200">
    <div class="max-w-full mx-auto px-12 py-12">
      <div class="max-w-6xl mx-auto border-t border-gray-200 pt-8">
        <div class="flex items-center justify-between">
          <!-- 저작권 정보 -->
          <div class="text-sm text-gray-600">
            ©️2025 Aiden's Blog
          </div>

          <!-- 링크들 -->
          <div class="flex items-center gap-4">
            <button class="footer-link">
              이용약관
            </button>
            <button class="footer-link">
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-link {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: #71717A;
  text-decoration: none;
}

.footer-link:hover {
  color: #18181B;
}
</style>
