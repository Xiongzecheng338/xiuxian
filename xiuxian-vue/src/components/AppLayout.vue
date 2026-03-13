<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/', icon: '🏠' },
  { name: '境界', path: '/realm', icon: '🧘' },
  { name: '功法', path: '/technique', icon: '📜' },
  { name: '丹药', path: '/alchemy', icon: '⚗️' },
  { name: '修炼', path: '/practice', icon: '⚡' },
  { name: '抽奖', path: '/gacha', icon: '🎰' },
  { name: '战斗', path: '/battle', icon: '⚔️' },
  { name: '任务', path: '/task', icon: '📋' },
  { name: '成就', path: '/achievement', icon: '�' },
  { name: '资讯', path: '/news', icon: '📰' },
]

const isActive = (path) => {
  return route.path === path
}

const navigateTo = (path) => {
  router.push(path)
  isMobileMenuOpen.value = false
}

onMounted(() => {
  userStore.initUserData()
  const loginResult = userStore.checkDailyLogin()
  if (loginResult) {
    console.log(`签到成功！连续${loginResult.consecutiveDays}天，获得${loginResult.reward}灵石`)
  }
})
</script>

<template>
  <div class="app-layout">
    <!-- 顶部导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 glass-header">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-2 cursor-pointer" @click="navigateTo('/')">
            <span class="text-2xl">⛩️</span>
            <span class="font-bold text-gold text-lg hidden sm:block">太虚仙门</span>
          </div>

          <!-- 桌面导航 -->
          <nav class="hidden md:flex items-center gap-1">
            <button
              v-for="item in navItems"
              :key="item.path"
              @click="navigateTo(item.path)"
              :class="[
                'nav-item px-3 py-2 rounded-lg text-sm transition-all duration-300',
                isActive(item.path)
                  ? 'bg-gold/20 text-gold'
                  : 'text-paper/70 hover:text-paper hover:bg-white/5'
              ]"
            >
              <span class="mr-1">{{ item.icon }}</span>
              {{ item.name }}
            </button>
          </nav>

          <!-- 用户信息 -->
          <div class="flex items-center gap-3">
            <div class="hidden sm:flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-full">
              <span class="text-gold">💎</span>
              <span class="text-gold text-sm font-bold">{{ userStore.userData.lingqi }}</span>
            </div>

            <!-- 移动端菜单按钮 -->
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="md:hidden p-2 text-paper"
            >
              <span class="text-xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <transition name="slide">
        <div v-if="isMobileMenuOpen" class="md:hidden glass-header border-t border-gold/20">
          <nav class="flex flex-col p-2">
            <button
              v-for="item in navItems"
              :key="item.path"
              @click="navigateTo(item.path)"
              :class="[
                'nav-item px-4 py-3 rounded-lg text-left transition-all',
                isActive(item.path)
                  ? 'bg-gold/20 text-gold'
                  : 'text-paper/70 hover:text-paper hover:bg-white/5'
              ]"
            >
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.name }}
            </button>
          </nav>
        </div>
      </transition>
    </header>

    <!-- 主内容区 -->
    <main class="pt-16 min-h-screen">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 状态栏 -->
    <footer class="fixed bottom-0 left-0 right-0 glass-footer md:hidden">
      <div class="flex items-center justify-around py-2">
        <div class="text-center">
          <div class="text-xs text-paper/50">境界</div>
          <div class="text-sm text-gold">{{ userStore.currentRealm?.name }}</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-paper/50">修为</div>
          <div class="text-sm text-azure">{{ userStore.userData.cultivation }}/1000</div>
        </div>
        <div class="text-center">
          <div class="text-xs text-paper/50">灵石</div>
          <div class="text-sm text-gold">{{ userStore.userData.lingqi }}</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.glass-header {
  background: rgba(10, 14, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 168, 83, 0.1);
}

.glass-footer {
  background: rgba(10, 14, 20, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(212, 168, 83, 0.1);
}

.nav-item {
  font-weight: 500;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
