<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const isMeditating = ref(false)
const meditationSeconds = ref(0)
let meditationTimer = null

const meditationTypes = [
  { id: 'normal', name: '普通修炼', icon: '🧘', efficiency: 1, desc: '基础修炼方式' },
  { id: 'insight', name: '悟道修炼', icon: '💡', efficiency: 1.5, desc: '消耗灵石，效率+50%', cost: 10 },
  { id: 'spirit', name: '神识修炼', icon: '👁️', efficiency: 2, desc: '需要灵根，效率+100%', requireRoot: true }
]

const activeMeditationType = ref('normal')

const currentType = computed(() => meditationTypes.find(t => t.id === activeMeditationType.value))

const cultivationPerMinute = computed(() => {
  const base = 10
  const realmBonus = (userStore.realmIndex + 1) * 2
  const rootBonus = userStore.rootEfficiency * 100
  return Math.floor(base * currentType.value.efficiency * (1 + realmBonus / 100 + rootBonus / 100))
})

const canMeditate = computed(() => {
  if (activeMeditationType.value === 'insight') {
    return userStore.userData.lingqi >= currentType.value.cost
  }
  if (activeMeditationType.value === 'spirit') {
    return !!userStore.userData.rootType
  }
  return true
})

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const startMeditation = () => {
  if (isMeditating.value || !canMeditate.value) return
  
  if (activeMeditationType.value === 'insight') {
    userStore.consumeLingqi(currentType.value.cost)
  }
  
  isMeditating.value = true
  meditationSeconds.value = 0

  meditationTimer = setInterval(() => {
    meditationSeconds.value++
  }, 1000)
}

const stopMeditation = () => {
  if (!isMeditating.value) return

  clearInterval(meditationTimer)
  isMeditating.value = false

  const mins = Math.floor(meditationSeconds.value / 60)
  if (mins > 0) {
    const cultivationGain = mins * cultivationPerMinute.value
    userStore.addCultivation(cultivationGain)
    userStore.userData.practiceHours += Math.floor(mins / 60)
    userStore.saveUserData()

    const breakthrough = userStore.checkBreakthrough()

    let message = `修炼完成！

本次修炼：${mins}分钟
修炼方式：${currentType.value.name}
修炼效率：${cultivationPerMinute.value}/分钟
获得修为：+${cultivationGain}
当前境界：${userStore.currentRealm?.name}
当前修为：${userStore.userData.cultivation}/1000`

    if (breakthrough) {
      message += `\n🎉 恭喜突破境界！进入【${userStore.realmData[breakthrough.newRealm]?.name}】`
    }

    alert(message)
  } else {
    alert('修炼时间太短，至少需要1分钟才能获得修为')
  }

  meditationSeconds.value = 0
}

const getEfficiencyColor = (efficiency) => {
  if (efficiency >= 2) return 'text-vermilion'
  if (efficiency >= 1.5) return 'text-gold'
  return 'text-jade'
}

onUnmounted(() => {
  if (meditationTimer) {
    clearInterval(meditationTimer)
  }
})
</script>

<template>
  <div class="practice-page max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">修炼中心</h1>
    <p class="text-center text-paper/60 mb-8">静心凝神，感悟天地灵气</p>

    <!-- 修炼状态卡片 -->
    <div class="glass-card rounded-2xl p-6 mb-6">
      <!-- 境界显示 -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <div class="text-sm text-paper/50 mb-1">当前境界</div>
          <div class="text-2xl font-bold text-gold">{{ userStore.currentRealm?.name }}</div>
        </div>
        <div class="text-right">
          <div class="text-sm text-paper/50 mb-1">突破概率</div>
          <div class="text-xl font-bold text-azure">{{ (userStore.breakthroughRate * 100).toFixed(1) }}%</div>
        </div>
      </div>

      <!-- 修为进度 -->
      <div class="mb-6">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-paper/70">修为进度</span>
          <span class="text-azure">{{ userStore.userData.cultivation }} / 1000</span>
        </div>
        <div class="h-4 bg-mystic rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-azure to-gold transition-all duration-500"
            :style="{ width: userStore.realmProgress + '%' }"
          ></div>
        </div>
      </div>

      <!-- 灵根显示 -->
      <div v-if="userStore.userData.rootType" class="mb-6 p-3 bg-gold/10 rounded-xl">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-sm text-paper/50">先天灵根</span>
            <span class="ml-2 text-gold font-bold">{{ userStore.userData.rootType }}</span>
          </div>
          <span class="text-jade text-sm">修炼效率+{{ (userStore.rootEfficiency * 100).toFixed(0) }}%</span>
        </div>
      </div>

      <!-- 冥想计时器 -->
      <div class="text-center mb-6">
        <div class="text-6xl font-mono text-gold mb-2">
          {{ formatTime(meditationSeconds) }}
        </div>
        <div :class="['text-sm mb-4', isMeditating ? 'text-gold' : 'text-paper/50']">
          {{ isMeditating ? '🧘 冥想中...' : '⏸️ 待命中' }}
        </div>
      </div>

      <!-- 修炼方式选择 -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <button
          v-for="type in meditationTypes"
          :key="type.id"
          @click="activeMeditationType = type.id"
          :disabled="(type.requireRoot && !userStore.userData.rootType) || (type.cost && userStore.userData.lingqi < type.cost)"
          :class="[
            'p-3 rounded-xl text-center transition-all duration-300',
            activeMeditationType === type.id 
              ? 'bg-gold/20 ring-2 ring-gold' 
              : 'bg-white/5 hover:bg-white/10',
            (type.requireRoot && !userStore.userData.rootType) || (type.cost && userStore.userData.lingqi < type.cost)
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer'
          ]"
        >
          <div class="text-2xl mb-1">{{ type.icon }}</div>
          <div class="text-xs text-paper font-bold">{{ type.name }}</div>
          <div :class="['text-xs', getEfficiencyColor(type.efficiency)]">效率 x{{ type.efficiency }}</div>
        </button>
      </div>

      <!-- 修炼效率显示 -->
      <div class="bg-azure/10 rounded-xl p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-paper/70">预计修炼效率：</span>
            <span class="text-azure font-bold">{{ cultivationPerMinute }}</span>
            <span class="text-paper/50"> 修为/分钟</span>
          </div>
          <div v-if="currentType.cost" class="text-gold">
            消耗: {{ currentType.cost }}灵石/次
          </div>
        </div>
      </div>

      <!-- 修炼按钮 -->
      <div class="flex justify-center gap-4">
        <button
          v-if="!isMeditating"
          @click="startMeditation"
          :disabled="!canMeditate"
          class="btn-meditate px-10 py-4 rounded-xl text-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          🧘 开始修炼
        </button>
        <button
          v-else
          @click="stopMeditation"
          class="btn-stop px-10 py-4 rounded-xl text-xl font-bold"
        >
          ⏹️ 停止修炼
        </button>
      </div>
    </div>

    <!-- 修炼提示 -->
    <div class="glass-card rounded-xl p-4 mb-6">
      <h3 class="text-gold font-bold mb-3">💡 修炼须知</h3>
      <ul class="text-sm text-paper/60 space-y-1">
        <li>• 修为达到1000即可尝试突破境界</li>
        <li>• 突破有概率失败，失败会损失修为</li>
        <li>• 拥有灵根可提升修炼效率</li>
        <li>• 悟道修炼需要消耗灵石</li>
        <li>• 神识修炼需要拥有灵根</li>
      </ul>
    </div>

    <!-- 统计数据 -->
    <div class="grid grid-cols-4 gap-4">
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-gold">{{ userStore.userData.breakthroughs }}</div>
        <div class="text-xs text-paper/50">突破次数</div>
      </div>
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-azure">{{ userStore.userData.practiceHours }}</div>
        <div class="text-xs text-paper/50">修炼时长</div>
      </div>
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-jade">{{ userStore.userData.loginDays }}</div>
        <div class="text-xs text-paper/50">签到天数</div>
      </div>
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-vermilion">{{ userStore.realmIndex + 1 }}</div>
        <div class="text-xs text-paper/50">当前境界</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.btn-meditate {
  background: linear-gradient(135deg, #5a7e7a, #3d5c58);
  color: #f5f0e6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-meditate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(90, 126, 122, 0.4);
}

.btn-stop {
  background: linear-gradient(135deg, #c53d43, #8b282c);
  color: #f5f0e6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-stop:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(197, 61, 67, 0.4);
}
</style>
