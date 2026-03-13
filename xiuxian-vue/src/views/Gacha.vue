<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { GACHA_POOLS, ROOT_EFFICIENCY } from '../utils/gameMath'

const userStore = useUserStore()

const activePool = ref('root')
const isAnimating = ref(false)
const pullResults = ref([])
const showResults = ref(false)

const pools = [
  { id: 'root', name: '灵根抽取', icon: '🌱', desc: '抽取先天灵根' },
  { id: 'artifact', name: '法宝抽取', icon: '⚔️', desc: '抽取上古法宝' }
]

const rootData = {
  SSR: [
    { name: '混沌灵根', element: '混沌', desc: '全属性+30%', bonus: 0.3 },
    { name: '天雷灵根', element: '雷', desc: '攻击+25%', bonus: 0.25 },
    { name: '九幽灵根', element: '暗', desc: '防御+25%', bonus: 0.25 }
  ],
  SR: [
    { name: '金属性灵根', element: '金', desc: '金系功法+15%', bonus: 0.15 },
    { name: '木属性灵根', element: '木', desc: '木系功法+15%', bonus: 0.15 },
    { name: '水属性灵根', element: '水', desc: '水系功法+15%', bonus: 0.15 },
    { name: '火属性灵根', element: '火', desc: '火系功法+15%', bonus: 0.15 },
    { name: '土属性灵根', element: '土', desc: '土系功法+15%', bonus: 0.15 }
  ],
  R: [
    { name: '杂灵根', element: '无', desc: '无特殊加成', bonus: 0 }
  ]
}

const artifactData = {
  SSR: [
    { name: '太初剑', type: '武器', attack: 500, rarity: 'SSR' },
    { name: '混沌鼎', type: '法宝', attack: 450, rarity: 'SSR' },
    { name: '昊天塔', type: '防御', defense: 500, rarity: 'SSR' }
  ],
  SR: [
    { name: '青锋剑', type: '武器', attack: 200, rarity: 'SR' },
    { name: '碧水环', type: '法宝', attack: 180, rarity: 'SR' },
    { name: '玄铁盾', type: '防御', defense: 200, rarity: 'SR' },
    { name: '烈焰枪', type: '武器', attack: 220, rarity: 'SR' }
  ],
  R: [
    { name: '铁剑', type: '武器', attack: 50, rarity: 'R' },
    { name: '木盾', type: '防御', defense: 50, rarity: 'R' },
    { name: '普通戒指', type: '饰品', attack: 30, rarity: 'R' }
  ]
}

const currentPool = computed(() => GACHA_POOLS[activePool.value])
const pityCount = computed(() => {
  return activePool.value === 'root' 
    ? userStore.userData.rootPullPity 
    : userStore.userData.artifactPullPity
})

const pityProgress = computed(() => {
  return Math.min(pityCount.value / currentPool.value.guaranteeCount * 100, 100)
})

const singlePrice = computed(() => currentPool.value?.prices[0] || 0)
const multiPrice = computed(() => currentPool.value?.prices[1] || 0)

const getRandomItem = (rarity, poolType) => {
  const pool = poolType === 'root' ? rootData : artifactData
  const items = pool[rarity]
  return items[Math.floor(Math.random() * items.length)]
}

const pull = async (count) => {
  if (isAnimating.value) return
  
  const result = userStore.pullGacha(activePool.value, count)
  
  if (!result.success) {
    alert(result.reason)
    return
  }

  isAnimating.value = true
  showResults.value = false

  pullResults.value = result.results.map(r => {
    const item = getRandomItem(r.rarity, activePool.value)
    return {
      ...r,
      item
    }
  })

  setTimeout(() => {
    showResults.value = true
    isAnimating.value = false
  }, count * 300)
}

const getRarityColor = (rarity) => {
  const colors = {
    SSR: 'text-gradient-ssr',
    SR: 'text-gradient-sr',
    R: 'text-paper/60'
  }
  return colors[rarity] || ''
}
</script>

<template>
  <div class="gacha-page max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">抽奖系统</h1>
    <p class="text-center text-paper/60 mb-8">逆天改命，就在今朝</p>

    <!-- 卡池选择 -->
    <div class="flex justify-center gap-4 mb-8">
      <button
        v-for="pool in pools"
        :key="pool.id"
        @click="activePool = pool.id"
        :class="[
          'pool-btn px-6 py-3 rounded-xl transition-all duration-300',
          activePool === pool.id
            ? 'bg-gold/20 ring-2 ring-gold'
            : 'bg-white/5 hover:bg-white/10'
        ]"
      >
        <span class="text-2xl mr-2">{{ pool.icon }}</span>
        <span class="text-paper">{{ pool.name }}</span>
      </button>
    </div>

    <!-- 保底进度 -->
    <div class="glass-card rounded-xl p-4 mb-8">
      <div class="flex justify-between text-sm mb-2">
        <span class="text-paper/70">保底进度</span>
        <span class="text-gold">{{ pityCount }} / {{ currentPool?.guaranteeCount }}</span>
      </div>
      <div class="h-2 bg-mystic rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-gold to-vermilion transition-all duration-500"
          :style="{ width: pityProgress + '%' }"
        ></div>
      </div>
      <p class="text-xs text-paper/50 mt-2">
        当前抽卡SSR概率: {{ Math.min(currentPool?.SSR + Math.floor(pityCount / currentPool?.guaranteeCount) * 0.2, 0.5) * 100 }}%
      </p>
    </div>

    <!-- 抽取按钮 -->
    <div class="flex justify-center gap-4 mb-8">
      <button
        @click="pull(1)"
        :disabled="isAnimating"
        class="pull-btn px-8 py-4 rounded-xl text-lg font-bold disabled:opacity-50"
      >
        <span class="mr-2">✨</span>
        单抽 {{ singlePrice }}灵石
      </button>
      <button
        @click="pull(10)"
        :disabled="isAnimating"
        class="pull-btn-multi px-8 py-4 rounded-xl text-lg font-bold disabled:opacity-50"
      >
        <span class="mr-2">🌟</span>
        十连 {{ multiPrice }}灵石
      </button>
    </div>

    <!-- 抽取结果 -->
    <transition name="fade">
      <div v-if="showResults" class="results-container">
        <div class="grid grid-cols-5 gap-2">
          <div
            v-for="(result, index) in pullResults"
            :key="index"
            :class="[
              'result-card glass-card rounded-xl p-3 text-center transition-all duration-500',
              result.rarity === 'SSR' ? 'result-ssr' : result.rarity === 'SR' ? 'result-sr' : ''
            ]"
            :style="{ animationDelay: index * 0.1 + 's' }"
          >
            <div class="text-2xl mb-1">
              {{ result.rarity === 'SSR' ? '💎' : result.rarity === 'SR' ? '💠' : '🔹' }}
            </div>
            <div :class="['text-xs font-bold mb-1', getRarityColor(result.rarity)]">
              {{ result.rarity }}
            </div>
            <div class="text-xs text-paper">
              {{ result.item.name }}
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 概率说明 -->
    <div class="mt-12 glass-card rounded-xl p-6">
      <h3 class="text-gold font-bold mb-4">概率公示</h3>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div class="text-center">
          <div class="text-vermilion font-bold">SSR</div>
          <div class="text-paper/60">{{ (currentPool?.SSR * 100).toFixed(1) }}%</div>
        </div>
        <div class="text-center">
          <div class="text-azure font-bold">SR</div>
          <div class="text-paper/60">{{ (currentPool?.SR * 100).toFixed(1) }}%</div>
        </div>
        <div class="text-center">
          <div class="text-jade font-bold">R</div>
          <div class="text-paper/60">{{ (currentPool?.R * 100).toFixed(1) }}%</div>
        </div>
      </div>
      <p class="text-xs text-paper/50 mt-4 text-center">
        保底机制：每{{ currentPool?.guaranteeCount }}抽必出SSR
      </p>
    </div>
  </div>
</template>

<style scoped>
.gacha-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.pool-btn {
  border: 1px solid transparent;
}

.pool-btn:hover {
  border-color: rgba(212, 168, 83, 0.3);
}

.pull-btn {
  background: linear-gradient(135deg, #4a6fa5, #2d4a6f);
  color: #f5f0e6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pull-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(74, 111, 165, 0.4);
}

.pull-btn-multi {
  background: linear-gradient(135deg, #d4a853, #b8860b);
  color: #0a0e14;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pull-btn-multi:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(212, 168, 83, 0.4);
}

.result-card {
  opacity: 0;
  transform: scale(0.5);
  animation: popIn 0.5s ease forwards;
}

.result-ssr {
  background: linear-gradient(135deg, rgba(212, 168, 83, 0.3), rgba(197, 61, 67, 0.2));
  border: 1px solid rgba(212, 168, 83, 0.5);
}

.result-sr {
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.2), rgba(90, 126, 122, 0.2));
  border: 1px solid rgba(74, 111, 165, 0.3);
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.text-gradient-ssr {
  background: linear-gradient(135deg, #d4a853, #dc143c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-sr {
  background: linear-gradient(135deg, #4a6fa5, #7eb8a2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
