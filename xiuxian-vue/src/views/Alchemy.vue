<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { PILLS } from '../utils/contentData'

const userStore = useUserStore()

const activeTab = ref('cultivation')
const purchaseMessage = ref('')

const pillCategories = [
  { id: 'cultivation', name: '修炼丹药', icon: '💊' },
  { id: 'breakthrough', name: '突破丹药', icon: '🚀' },
  { id: 'battle', name: '战斗丹药', icon: '⚔️' },
  { id: 'special', name: '特殊丹药', icon: '✨' }
]

const pillList = computed(() => {
  return PILLS[activeTab.value] || []
})

const buyPill = (pill) => {
  if (userStore.userData.lingqi < pill.price) {
    purchaseMessage.value = '灵石不足！'
    setTimeout(() => { purchaseMessage.value = '' }, 2000)
    return
  }
  
  userStore.consumeLingqi(pill.price)
  
  if (pill.effect.cultivation) {
    userStore.addCultivation(pill.effect.cultivation)
  }
  
  if (pill.effect.lifespan) {
    alert(`使用${pill.name}成功！增加${pill.effect.lifespan}年寿元`)
  }
  
  purchaseMessage.value = `购买成功！-${pill.price}灵石`
  setTimeout(() => { purchaseMessage.value = '' }, 2000)
  
  userStore.saveUserData()
}

const getGradeColor = (grade) => {
  const colors = {
    'SSR': 'border-gold bg-gold/10 text-gold',
    'SR': 'border-azure bg-azure/10 text-azure',
    'R': 'border-jade bg-jade/10 text-jade'
  }
  return colors[grade] || 'border-paper bg-paper/10 text-paper'
}

const getGradeLabel = (grade) => {
  const labels = { 'SSR': '绝品', 'SR': '精品', 'R': '普通' }
  return labels[grade] || grade
}

const formatEffect = (effect) => {
  if (effect.cultivation) return `+${effect.cultivation}修为`
  if (effect.breakthroughRate) return `突破概率+${effect.breakthroughRate * 100}%`
  if (effect.attack) return `攻击+${Math.round((effect.attack - 1) * 100)}%`
  if (effect.defense) return `防御+${Math.round((effect.defense - 1) * 100)}%`
  if (effect.revive) return '战斗复活一次'
  if (effect.rootChange) return '改变灵根属性'
  if (effect.lifespan) return `+${effect.lifespan}年寿元`
  return ''
}
</script>

<template>
  <div class="alchemy-page max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">丹药宝典</h1>
    <p class="text-center text-paper/60 mb-4">炼天地之精华，制无上灵丹</p>

    <!-- 灵石显示 -->
    <div class="flex justify-center mb-8">
      <div class="glass-card rounded-full px-6 py-2 flex items-center gap-2">
        <span class="text-gold text-xl">💎</span>
        <span class="text-gold font-bold text-lg">{{ userStore.userData.lingqi }}</span>
        <span class="text-paper/50">灵石</span>
      </div>
    </div>

    <!-- 购买提示 -->
    <div v-if="purchaseMessage" class="fixed top-20 left-1/2 -translate-x-1/2 z-50">
      <div :class="[
        'px-6 py-3 rounded-xl font-bold',
        purchaseMessage.includes('成功') ? 'bg-jade/20 text-jade' : 'bg-vermilion/20 text-vermilion'
      ]">
        {{ purchaseMessage }}
      </div>
    </div>

    <!-- 标签页 -->
    <div class="flex justify-center gap-2 mb-8">
      <button
        v-for="cat in pillCategories"
        :key="cat.id"
        @click="activeTab = cat.id"
        :class="[
          'px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2',
          activeTab === cat.id
            ? 'bg-gold text-ink font-bold'
            : 'bg-white/5 text-paper/70 hover:bg-white/10'
        ]"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <!-- 丹药列表 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="pill in pillList"
        :key="pill.id"
        :class="[
          'alchemy-card glass-card rounded-xl p-5 border-t-4 transition-all duration-300 hover:scale-[1.02]',
          getGradeColor(pill.grade)
        ]"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-paper">{{ pill.name }}</h3>
          <span :class="['text-xs px-2 py-1 rounded', getGradeColor(pill.grade)]">
            {{ getGradeLabel(pill.grade) }}
          </span>
        </div>
        
        <p class="text-sm text-paper/60 mb-3">{{ pill.desc }}</p>
        
        <!-- 效果 -->
        <div class="mb-3 p-2 bg-white/5 rounded-lg">
          <div class="text-sm text-azure">{{ formatEffect(pill.effect) }}</div>
        </div>
        
        <!-- 价格与购买 -->
        <div class="flex items-center justify-between">
          <span class="text-gold font-bold">💎 {{ pill.price }}</span>
          <button
            @click="buyPill(pill)"
            class="px-4 py-2 bg-gold/20 text-gold text-sm rounded-lg hover:bg-gold/30 transition-colors"
          >
            购买
          </button>
        </div>
      </div>
    </div>

    <!-- 丹药说明 -->
    <div class="mt-12 glass-card rounded-xl p-6">
      <h3 class="text-gold font-bold mb-4">📖 丹药说明</h3>
      <div class="grid md:grid-cols-2 gap-4 text-sm text-paper/70">
        <div>
          <h4 class="text-azure mb-2">修炼丹药</h4>
          <p>直接增加修为值，用于境界突破</p>
        </div>
        <div>
          <h4 class="text-azure mb-2">突破丹药</h4>
          <p>提升境界突破成功率，降低失败惩罚</p>
        </div>
        <div>
          <h4 class="text-azure mb-2">战斗丹药</h4>
          <p>临时提升战斗属性或特殊效果</p>
        </div>
        <div>
          <h4 class="text-azure mb-2">特殊丹药</h4>
          <p>稀有丹药，可改变灵根或增加寿元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alchemy-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}
</style>
