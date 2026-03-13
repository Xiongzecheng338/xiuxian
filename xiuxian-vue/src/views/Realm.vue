<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { calculateBreakthroughRate } from '../utils/gameMath'

const userStore = useUserStore()
const selectedRealm = ref(null)
const isBreakingThrough = ref(false)
const breakthroughResult = ref(null)

const realmKeys = Object.keys(userStore.realmData)

const getRealmColor = (color) => {
  const colors = {
    bronze: 'from-amber-700 to-amber-900 border-amber-700',
    jade: 'from-emerald-600 to-emerald-800 border-emerald-600',
    azure: 'from-blue-500 to-blue-700 border-blue-500',
    vermilion: 'from-red-600 to-red-800 border-red-600',
    gold: 'from-yellow-500 to-yellow-700 border-yellow-500',
    spirit: 'from-teal-400 to-teal-600 border-teal-400',
    paper: 'from-gray-300 to-gray-500 border-gray-400',
    darkgold: 'from-yellow-600 to-yellow-800 border-yellow-600',
    crimson: 'from-red-700 to-red-900 border-red-700',
  }
  return colors[color] || 'from-gray-500 to-gray-700 border-gray-500'
}

const selectRealm = (key) => {
  selectedRealm.value = selectedRealm.value === key ? null : key
}

const canBreakthrough = computed(() => {
  return userStore.userData.cultivation >= 1000 && 
         userStore.realmIndex < realmKeys.length - 1
})

const attemptBreakthrough = () => {
  if (!canBreakthrough.value || isBreakingThrough.value) return
  
  isBreakingThrough.value = true
  breakthroughResult.value = null
  
  setTimeout(() => {
    const result = userStore.checkBreakthrough()
    breakthroughResult.value = result
    
    if (result && result.success) {
      alert(`🎉 恭喜突破成功！

恭喜你突破至【${userStore.realmData[result.newRealm]?.name}】
实力大增，继续努力修炼吧！`)
    } else {
      alert(`💀 突破失败...

损失修为：-${result?.penalty || 300}
当前修为：${userStore.userData.cultivation}/1000

不要气馁，继续修炼积累修为！`)
    }
    
    isBreakingThrough.value = false
  }, 1500)
}

const nextRealm = computed(() => {
  const currentIndex = userStore.realmIndex
  if (currentIndex < realmKeys.length - 1) {
    return userStore.realmData[realmKeys[currentIndex + 1]]
  }
  return null
})

const getRealmProgress = (realmKey) => {
  const realmIndex = realmKeys.indexOf(realmKey)
  const userIndex = userStore.realmIndex
  
  if (realmIndex < userIndex) return 100
  if (realmIndex > userIndex) return 0
  return userStore.userData.cultivation / 10
}
</script>

<template>
  <div class="realm-page max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">境界体系</h1>
    <p class="text-center text-paper/60 mb-4">从初窥门径到天人合一，九大境界等你突破</p>

    <!-- 突破按钮 -->
    <div v-if="canBreakthrough" class="max-w-md mx-auto mb-8">
      <div class="glass-card rounded-2xl p-6 text-center">
        <div class="text-gold text-xl font-bold mb-2">🎯 可进行境界突破</div>
        <div class="text-paper/60 text-sm mb-4">
          当前突破概率: {{ (userStore.breakthroughRate * 100).toFixed(1) }}%
        </div>
        
        <div v-if="nextRealm" class="mb-4 p-3 bg-azure/10 rounded-xl">
          <div class="text-sm text-paper/70 mb-1">突破后境界</div>
          <div class="text-xl font-bold text-azure">{{ nextRealm.name }}</div>
          <div class="text-xs text-paper/50 mt-1">{{ nextRealm.desc }}</div>
        </div>
        
        <button
          @click="attemptBreakthrough"
          :disabled="isBreakingThrough"
          class="btn-breakthrough px-8 py-3 rounded-xl text-lg font-bold disabled:opacity-50"
        >
          {{ isBreakingThrough ? '🔮 突破中...' : '🚀 开始突破' }}
        </button>
        
        <p class="text-xs text-paper/50 mt-3">
          💡 突破失败将损失修为，请谨慎选择时机
        </p>
      </div>
    </div>

    <!-- 境界列表 -->
    <div class="space-y-4">
      <div
        v-for="(realm, key) in userStore.realmData"
        :key="key"
        class="realm-item glass-card rounded-2xl overflow-hidden transition-all duration-300"
        :class="{ 'ring-2 ring-gold': userStore.userData.realm === key }"
      >
        <div 
          @click="selectRealm(key)"
          class="p-6 cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <div :class="['w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold', getRealmColor(realm.color)]">
              {{ realm.icon }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <h3 class="text-2xl font-bold text-paper">{{ realm.name }}</h3>
                <span v-if="userStore.userData.realm === key" class="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full">当前境界</span>
                <span v-if="realmKeys.indexOf(key) < userStore.realmIndex" class="px-2 py-1 bg-jade/20 text-jade text-xs rounded-full">已突破</span>
                <span v-if="realmKeys.indexOf(key) > userStore.realmIndex" class="px-2 py-1 bg-white/10 text-paper/50 text-xs rounded-full">未解锁</span>
              </div>
              <p class="text-paper/60 mt-1">{{ realm.desc }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm text-paper/50">寿元</div>
              <div class="text-azure">{{ realm.lifespan }}</div>
              <div v-if="realm.combatBonus" class="text-xs text-vermilion mt-1">
                战力加成 x{{ realm.combatBonus }}
              </div>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div v-if="userStore.realmIndex === realmKeys.indexOf(key)" class="mt-4">
            <div class="flex justify-between text-xs text-paper/50 mb-1">
              <span>境界进度</span>
              <span>{{ userStore.userData.cultivation }} / 1000</span>
            </div>
            <div class="h-2 bg-mystic rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-azure to-gold transition-all duration-500"
                :style="{ width: userStore.realmProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- 展开详情 -->
        <transition name="expand">
          <div v-if="selectedRealm === key" class="px-6 pb-6 border-t border-gold/10">
            <div class="grid md:grid-cols-3 gap-6 mt-6">
              <!-- 修炼阶段 -->
              <div>
                <h4 class="text-gold font-bold mb-3">🧘 修炼阶段</h4>
                <ul class="space-y-2">
                  <li v-for="(stage, idx) in realm.stages" :key="stage" class="flex items-center gap-2 text-sm text-paper/70">
                    <span :class="['w-5 h-5 rounded-full flex items-center justify-center text-xs', 
                      realmKeys.indexOf(key) < userStore.realmIndex ? 'bg-jade text-ink' :
                      realmKeys.indexOf(key) === userStore.realmIndex && idx < Math.floor(userStore.userData.cultivation / 333) ? 'bg-azure text-ink' :
                      'bg-white/20 text-paper/50']">
                      {{ idx + 1 }}
                    </span>
                    {{ stage }}
                  </li>
                </ul>
              </div>

              <!-- 已获神通 -->
              <div>
                <h4 class="text-gold font-bold mb-3">✨ 已获神通</h4>
                <ul class="space-y-2">
                  <li v-for="ability in realm.abilities" :key="ability" class="flex items-center gap-2 text-sm text-paper/70">
                    <span class="text-jade">⚡</span>
                    {{ ability }}
                  </li>
                </ul>
              </div>

              <!-- 突破条件 -->
              <div>
                <h4 class="text-gold font-bold mb-3">🎯 突破条件</h4>
                <div class="text-sm text-paper/70">
                  <p class="mb-2">修为达到 1000 点</p>
                  <p v-if="realm.next" class="text-azure">
                    突破后：{{ realm.next }}
                  </p>
                  <p v-else class="text-gold">
                    🏆 已达巅峰境界！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.realm-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.btn-breakthrough {
  background: linear-gradient(135deg, #d4a853, #b8860b);
  color: #0a0e14;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-breakthrough:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(212, 168, 83, 0.4);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
