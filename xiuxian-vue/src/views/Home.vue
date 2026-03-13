<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const realmKeys = computed(() => Object.keys(userStore.realmData))

const quickActions = [
  { id: 'practice', name: '修炼', icon: '🧘', path: '/practice', desc: '开始修炼' },
  { id: 'gacha', name: '抽奖', icon: '🎰', path: '/gacha', desc: '抽取灵根' },
  { id: 'battle', name: '战斗', icon: '⚔️', path: '/battle', desc: '试炼挑战' },
  { id: 'task', name: '任务', icon: '📋', path: '/task', desc: '每日任务' }
]

const navigateTo = (path) => {
  router.push(path)
}

const getRealmColor = (color) => {
  const colors = {
    bronze: 'from-amber-700 to-amber-900',
    jade: 'from-emerald-600 to-emerald-800',
    azure: 'from-blue-500 to-blue-700',
    vermilion: 'from-red-600 to-red-800',
    gold: 'from-yellow-500 to-yellow-700',
    spirit: 'from-teal-400 to-teal-600',
    paper: 'from-gray-300 to-gray-500',
    darkgold: 'from-yellow-600 to-yellow-800',
    crimson: 'from-red-700 to-red-900',
  }
  return colors[color] || 'from-gray-500 to-gray-700'
}

const totalStats = computed(() => ({
  wins: userStore.userData.battleStats?.wins || 0,
  techniques: userStore.userData.techniques?.length || 0,
  achievements: userStore.userData.achievements?.length || 0
}))
</script>

<template>
  <div class="home-page">
    <!-- 欢迎横幅 -->
    <section class="relative py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent"></div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold text-gold mb-3 animate-float">
          太虚仙门
        </h1>
        <p class="text-2xl md:text-3xl text-paper/80 mb-4">
          问道长生
        </p>
        <p class="text-paper/60 max-w-2xl mx-auto mb-6">
          踏入修仙之路，感悟天地之道。从初窥门径到天人合一，踏上你的问道长生之途。
        </p>
        
        <!-- 快速操作 -->
        <div class="flex justify-center gap-3 flex-wrap">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="navigateTo(action.path)"
            class="quick-btn px-5 py-2 rounded-full text-sm font-bold"
          >
            <span class="mr-1">{{ action.icon }}</span>
            {{ action.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- 用户状态面板 -->
    <section class="max-w-4xl mx-auto px-4 mb-8">
      <div class="glass-card rounded-2xl p-5">
        <div class="flex items-center gap-4 mb-5">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
            <span class="text-3xl">🧑‍🚀</span>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gold">{{ userStore.currentRealm?.name }}</h2>
            <p class="text-paper/60 text-sm">{{ userStore.currentRealm?.desc }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-paper/50">灵石</div>
            <div class="text-xl font-bold text-gold">{{ userStore.userData.lingqi }}</div>
          </div>
        </div>

        <!-- 修为进度条 -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-paper/70">修为进度</span>
            <span class="text-azure">{{ userStore.userData.cultivation }} / 1000</span>
          </div>
          <div class="h-3 bg-mystic rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-azure to-gold transition-all duration-500"
              :style="{ width: userStore.realmProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 灵根信息 -->
        <div v-if="userStore.userData.rootType" class="mb-4 p-3 bg-gold/10 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-sm text-paper/50">先天灵根</span>
              <span class="ml-2 text-gold font-bold">{{ userStore.userData.rootType }}</span>
            </div>
            <span class="text-jade text-sm">+{{ (userStore.rootEfficiency * 100).toFixed(0) }}%修炼</span>
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="grid grid-cols-4 gap-3">
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-xl font-bold text-gold">{{ userStore.userData.lingqi }}</div>
            <div class="text-xs text-paper/50">灵石</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-xl font-bold text-azure">{{ userStore.userData.breakthroughs }}</div>
            <div class="text-xs text-paper/50">突破</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-xl font-bold text-jade">{{ userStore.userData.loginDays }}</div>
            <div class="text-xs text-paper/50">签到</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-xl font-bold text-vermilion">{{ totalStats.techniques }}</div>
            <div class="text-xs text-paper/50">功法</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 境界展示 -->
    <section class="max-w-6xl mx-auto px-4 pb-20">
      <h2 class="text-2xl font-bold text-center text-gold mb-6">境界体系</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div
          v-for="(realm, key) in userStore.realmData"
          :key="key"
          @click="navigateTo('/realm')"
          :class="[
            'realm-card glass-card rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-105',
            userStore.userData.realm === key ? 'ring-2 ring-gold' : ''
          ]"
        >
          <div class="flex items-center gap-2 mb-2">
            <div :class="['w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm', getRealmColor(realm.color)]">
              {{ realm.icon }}
            </div>
          </div>
          <h3 class="font-bold text-paper text-sm">{{ realm.name }}</h3>
          <p class="text-xs text-paper/50">{{ realm.lifespan }}</p>
        </div>
      </div>
    </section>

    <!-- 功能快捷入口 -->
    <section class="max-w-4xl mx-auto px-4 pb-20">
      <h2 class="text-2xl font-bold text-center text-gold mb-6">功能入口</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="action in quickActions"
          :key="action.id"
          @click="navigateTo(action.path)"
          class="feature-card glass-card rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div class="text-3xl mb-2">{{ action.icon }}</div>
          <h3 class="font-bold text-paper">{{ action.name }}</h3>
          <p class="text-xs text-paper/50">{{ action.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 80px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.quick-btn {
  background: linear-gradient(135deg, rgba(212, 168, 83, 0.2), rgba(212, 168, 83, 0.1));
  color: #f5f0e6;
  border: 1px solid rgba(212, 168, 83, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: linear-gradient(135deg, rgba(212, 168, 83, 0.3), rgba(212, 168, 83, 0.2));
  transform: translateY(-2px);
}

.realm-card:hover {
  border-color: rgba(212, 168, 83, 0.4);
}

.feature-card:hover {
  border-color: rgba(212, 168, 83, 0.4);
}
</style>
