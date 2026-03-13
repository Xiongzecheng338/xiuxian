<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import { TECHNIQUES, TECHNIQUE_CATEGORIES } from '../utils/contentData'

const userStore = useUserStore()

const activeCategory = ref('cultivation')

const categories = Object.entries(TECHNIQUE_CATEGORIES).map(([key, val]) => ({
  id: key,
  ...val
}))

const techniqueList = computed(() => {
  return TECHNIQUES[activeCategory.value] || []
})

const canLearn = (tech) => {
  const realmIndex = Object.keys(userStore.realmData).indexOf(tech.realm)
  return userStore.realmIndex >= realmIndex
}

const learnTechnique = (tech) => {
  if (!canLearn(tech)) {
    alert(`需要达到【${userStore.realmData[tech.realm]?.name}】境界才能学习此功法`)
    return
  }
  
  if (tech.price > 0 && userStore.userData.lingqi < tech.price) {
    alert('灵石不足！')
    return
  }
  
  if (tech.price > 0) {
    userStore.consumeLingqi(tech.price)
  }
  
  userStore.userData.techniques = userStore.userData.techniques || []
  if (!userStore.userData.techniques.find(t => t.id === tech.id)) {
    userStore.userData.techniques.push(tech)
    userStore.saveUserData()
    alert(`恭喜学会【${tech.name}】！`)
  } else {
    alert('你已学会此功法')
  }
}

const isLearned = (techId) => {
  return userStore.userData.techniques?.some(t => t.id === techId)
}

const getGradeColor = (grade) => {
  const colors = {
    'SSR': 'text-gold border-gold bg-gold/10',
    'SR': 'text-azure border-azure bg-azure/10',
    'R': 'text-jade border-jade bg-jade/10'
  }
  return colors[grade] || 'text-paper border-paper'
}

const getGradeLabel = (grade) => {
  const labels = { 'SSR': '绝品', 'SR': '精品', 'R': '普通' }
  return labels[grade] || grade
}
</script>

<template>
  <div class="technique-page max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">功法秘籍</h1>
    <p class="text-center text-paper/60 mb-8">修炼无止境，功法通大道</p>

    <!-- 拥有的功法 -->
    <div v-if="userStore.userData.techniques?.length" class="mb-8">
      <h3 class="text-gold font-bold mb-3">📚 已学功法</h3>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tech in userStore.userData.techniques" 
          :key="tech.id"
          class="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full"
        >
          {{ tech.name }}
        </span>
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="flex justify-center gap-2 mb-8">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="activeCategory = cat.id"
        :class="[
          'px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2',
          activeCategory === cat.id
            ? 'bg-gold text-ink font-bold'
            : 'bg-white/5 text-paper/70 hover:bg-white/10'
        ]"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <!-- 功法列表 -->
    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="tech in techniqueList"
        :key="tech.id"
        :class="[
          'technique-card glass-card rounded-xl p-5 border-l-4 transition-all duration-300 hover:scale-[1.02]',
          getGradeColor(tech.grade)
        ]"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="text-xl font-bold text-paper">{{ tech.name }}</h3>
            <span :class="['text-xs px-2 py-1 rounded mt-1 inline-block', getGradeColor(tech.grade)]">
              {{ getGradeLabel(tech.grade) }}
            </span>
          </div>
          <div class="text-right">
            <span v-if="tech.price === 0" class="text-jade text-sm">免费</span>
            <span v-else class="text-gold text-sm">💎 {{ tech.price }}</span>
          </div>
        </div>
        
        <p class="text-sm text-paper/60 mb-3">{{ tech.desc }}</p>
        
        <!-- 功法效果 -->
        <div class="flex flex-wrap gap-2 mb-3">
          <span 
            v-for="(value, key) in tech.effect" 
            :key="key"
            class="text-xs px-2 py-1 bg-white/5 rounded"
          >
            <template v-if="key === 'cultivation'">修炼效率</template>
            <template v-else-if="key === 'attack'">攻击</template>
            <template v-else-if="key === 'defense'">防御</template>
            <template v-else-if="key === 'spirit'">神识</template>
            <template v-else-if="key === 'speed'">速度</template>
            <template v-else-if="key === 'all'">全属性</template>
            <template v-else>{{ key }}</template>
            +{{ Math.round((value - 1) * 100) }}%
          </span>
        </div>
        
        <!-- 学习要求 -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-paper/50">
            境界要求: {{ userStore.realmData[tech.realm]?.name }}
          </span>
          
          <button
            v-if="isLearned(tech.id)"
            class="px-4 py-1 bg-jade/20 text-jade text-sm rounded-lg"
            disabled
          >
            已学会
          </button>
          <button
            v-else
            @click="learnTechnique(tech)"
            :disabled="!canLearn(tech)"
            :class="[
              'px-4 py-1 text-sm rounded-lg transition-colors',
              canLearn(tech) 
                ? 'bg-gold/20 text-gold hover:bg-gold/30' 
                : 'bg-white/5 text-paper/50 cursor-not-allowed'
            ]"
          >
            {{ canLearn(tech) ? '学习' : '境界不足' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.technique-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}
</style>
