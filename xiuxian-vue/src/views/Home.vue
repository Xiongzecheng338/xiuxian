<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const realmKeys = computed(() => Object.keys(userStore.realmData))

const quickActions = [
  { id: 'practice', name: '修炼', icon: '🧘', path: '/practice', desc: '开始修炼', color: 'azure' },
  { id: 'gacha', name: '抽奖', icon: '🎰', path: '/gacha', desc: '抽取灵根', color: 'gold' },
  { id: 'battle', name: '战斗', icon: '⚔️', path: '/battle', desc: '试炼挑战', color: 'vermilion' },
  { id: 'task', name: '任务', icon: '📋', path: '/task', desc: '每日任务', color: 'jade' }
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

const getActionColor = (color) => {
  const colors = {
    azure: 'hover:from-blue-500/30 hover:to-blue-700/30 border-blue-500/30',
    gold: 'hover:from-yellow-500/30 hover:to-yellow-700/30 border-yellow-500/30',
    vermilion: 'hover:from-red-500/30 hover:to-red-700/30 border-red-500/30',
    jade: 'hover:from-emerald-500/30 hover:to-emerald-700/30 border-emerald-500/30',
  }
  return colors[color] || ''
}

const totalStats = computed(() => ({
  wins: userStore.userData.battleStats?.wins || 0,
  techniques: userStore.userData.techniques?.length || 0,
  achievements: userStore.userData.achievements?.length || 0
}))

const realmProgressPercent = computed(() => {
  return Math.min(100, userStore.realmProgress)
})
</script>

<template>
  <div class="home-page">
    <!-- 欢迎横幅 -->
    <section class="relative py-10 md:py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent"></div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-gold mb-2 md:mb-3 animate-float">
          太虚仙门
        </h1>
        <p class="text-xl md:text-2xl lg:text-3xl text-paper/80 mb-3 md:mb-4">
          问道长生
        </p>
        <p class="text-sm md:text-base text-paper/60 max-w-2xl mx-auto mb-5 md:mb-6 leading-relaxed">
          踏入修仙之路，感悟天地之道。从初窥门径到天人合一，踏上你的问道长生之途。
        </p>
        
        <!-- 快速操作 -->
        <div class="flex justify-center gap-2 md:gap-3 flex-wrap">
          <button
            v-for="action in quickActions"
            :key="action.id"
            @click="navigateTo(action.path)"
            :class="[
              'quick-btn px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95',
              getActionColor(action.color)
            ]"
          >
            <span class="mr-1.5">{{ action.icon }}</span>
            <span class="hidden xs:inline">{{ action.name }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- 用户状态面板 -->
    <section class="max-w-4xl mx-auto px-3 md:px-4 mb-6">
      <div class="glass-card rounded-2xl p-4 md:p-5">
        <div class="flex items-center gap-3 md:gap-4 mb-4">
          <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center flex-shrink-0">
            <span class="text-2xl md:text-3xl">🧑‍🚀</span>
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-lg md:text-xl font-bold text-gold truncate">
              {{ userStore.currentRealm?.name }}
            </h2>
            <p class="text-sm text-paper/60 truncate">
              {{ userStore.currentRealm?.desc }}
            </p>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="text-xs text-paper/50">灵石</div>
            <div class="text-lg md:text-xl font-bold text-gold tabular-nums">
              {{ userStore.userData.lingqi }}
            </div>
          </div>
        </div>

        <!-- 修为进度条 -->
        <div class="mb-3 md:mb-4">
          <div class="flex justify-between text-xs md:text-sm mb-1.5">
            <span class="text-paper/70">修为进度</span>
            <span class="text-azure font-medium tabular-nums">
              {{ userStore.userData.cultivation }} / 1000
            </span>
          </div>
          <div class="h-2.5 md:h-3 bg-mystic rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-azure to-gold transition-all duration-500 ease-out"
              :style="{ width: realmProgressPercent + '%' }"
            ></div>
          </div>
        </div>

        <!-- 灵根信息 -->
        <div v-if="userStore.userData.rootType" class="mb-3 md:mb-4 p-2.5 md:p-3 bg-gold/10 rounded-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xs md:text-sm text-paper/50">先天灵根</span>
              <span class="text-gold font-bold text-sm md:text-base">{{ userStore.userData.rootType }}</span>
            </div>
            <span class="text-jade text-xs md:text-sm font-medium">
              +{{ (userStore.rootEfficiency * 100).toFixed(0) }}%修炼
            </span>
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="grid grid-cols-4 gap-2 md:gap-3">
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-lg md:text-xl font-bold text-gold tabular-nums">{{ userStore.userData.lingqi }}</div>
            <div class="text-[10px] md:text-xs text-paper/50">灵石</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-lg md:text-xl font-bold text-azure tabular-nums">{{ userStore.userData.breakthroughs }}</div>
            <div class="text-[10px] md:text-xs text-paper/50">突破</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-lg md:text-xl font-bold text-jade tabular-nums">{{ userStore.userData.loginDays }}</div>
            <div class="text-[10px] md:text-xs text-paper/50">签到</div>
          </div>
          <div class="text-center p-2 bg-white/5 rounded-lg">
            <div class="text-lg md:text-xl font-bold text-vermilion tabular-nums">{{ totalStats.techniques }}</div>
            <div class="text-[10px] md:text-xs text-paper/50">功法</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 境界展示 -->
    <section class="max-w-6xl mx-auto px-3 md:px-4 pb-10 md:pb-16">
      <h2 class="text-xl md:text-2xl font-bold text-center text-gold mb-4 md:mb-6">境界体系</h2>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3">
        <button
          v-for="(realm, key) in userStore.realmData"
          :key="key"
          @click="navigateTo('/realm')"
          :class="[
            'realm-card glass-card rounded-xl p-2 md:p-3 cursor-pointer transition-all duration-200 active:scale-95',
            userStore.userData.realm === key ? 'ring-2 ring-gold' : ''
          ]"
        >
          <div :class="[
            'w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs md:text-sm mb-1.5 md:mb-2 mx-auto',
            getRealmColor(realm.color)
          ]">
            {{ realm.icon }}
          </div>
          <h3 class="font-bold text-paper text-xs md:text-sm text-center leading-tight mb-0.5">{{ realm.name }}</h3>
          <p class="text-[10px] md:text-xs text-paper/50 text-center leading-tight">{{ realm.lifespan }}</p>
        </button>
      </div>
    </section>

    <!-- 功能快捷入口 -->
    <section class="max-w-4xl mx-auto px-3 md:px-4 pb-20 md:pb-24">
      <h2 class="text-xl md:text-2xl font-bold text-center text-gold mb-4 md:mb-6">功能入口</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <button
          v-for="action in quickActions"
          :key="action.id"
          @click="navigateTo(action.path)"
          :class="[
            'feature-card glass-card rounded-xl p-3 md:p-4 text-center cursor-pointer transition-all duration-200 active:scale-95',
            getActionColor(action.color)
          ]"
        >
          <div class="text-2xl md:text-3xl mb-1.5 md:mb-2">{{ action.icon }}</div>
          <h3 class="font-bold text-paper text-sm md:text-base">{{ action.name }}</h3>
          <p class="text-xs text-paper/50 mt-0.5">{{ action.desc }}</p>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-bottom: 100px;
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
}

.quick-btn:hover {
  background: linear-gradient(135deg, rgba(212, 168, 83, 0.3), rgba(212, 168, 83, 0.2));
  transform: translateY(-1px);
}

.realm-card:hover {
  border-color: rgba(212, 168, 83, 0.4);
}

.feature-card:hover {
  border-color: rgba(212, 168, 83, 0.4);
}

@media (max-width: 380px) {
  .xs\:inline {
    display: inline;
  }
}

@media (min-width: 381px) {
  .xs\:inline {
    display: inline;
  }
  .xs\:hidden {
    display: none;
  }
}
</style>
