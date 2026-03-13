<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import { ACHIEVEMENT_MILESTONES, calculateAchievementPoints } from '../utils/gameMath'

const userStore = useUserStore()

const achievementsList = [
  {
    id: 'cult_1000',
    category: 'cult',
    name: '初窥门径',
    desc: '累计修为达到1000',
    icon: '🧘',
    milestones: [1000, 10000, 100000, 1000000]
  },
  {
    id: 'break_1',
    category: 'breakthrough',
    name: '首次突破',
    desc: '突破境界1次',
    icon: '🚀',
    milestones: [1, 10, 50, 100]
  },
  {
    id: 'login_7',
    category: 'login',
    name: '坚持不懈',
    desc: '连续签到7天',
    icon: '📅',
    milestones: [7, 30, 100, 365]
  },
  {
    id: 'battle_10',
    category: 'battle',
    name: '初试身手',
    desc: '战斗胜利10次',
    icon: '⚔️',
    milestones: [10, 100, 1000, 10000]
  },
  {
    id: 'realm_5',
    category: 'realm',
    name: '小有所成',
    desc: '达到第5个境界',
    icon: '⭐',
    milestones: [1, 3, 5, 9]
  },
  {
    id: 'artifact_10',
    category: 'artifact',
    name: '法宝收藏家',
    desc: '拥有10件法宝',
    icon: '💎',
    milestones: [1, 10, 50, 100]
  }
]

const getAchievementProgress = (achievement) => {
  const category = achievement.category
  let current = 0
  
  switch (category) {
    case 'cult':
      current = userStore.userData.cultivation
      break
    case 'breakthrough':
      current = userStore.userData.breakthroughs
      break
    case 'login':
      current = userStore.userData.loginDays
      break
    case 'battle':
      current = userStore.userData.battleStats.wins
      break
    case 'realm':
      current = userStore.realmIndex
      break
    case 'artifact':
      current = userStore.userData.artifacts?.length || 0
      break
  }
  
  return {
    current,
    max: achievement.milestones[3],
    tier: achievement.milestones.findIndex(m => m <= current) + 1,
    nextTier: achievement.milestones.findIndex(m => m > current) + 1
  }
}

const totalPoints = computed(() => {
  return userStore.userData.achievements.length * 100
})
</script>

<template>
  <div class="achievement-page max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">成就系统</h1>
    <p class="text-center text-paper/60 mb-8">修仙路上的里程碑</p>

    <!-- 成就统计 -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-3xl font-bold text-gold">{{ userStore.userData.achievements?.length || 0 }}</div>
        <div class="text-xs text-paper/50">已完成成就</div>
      </div>
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-3xl font-bold text-azure">{{ totalPoints }}</div>
        <div class="text-xs text-paper/50">成就点数</div>
      </div>
      <div class="glass-card rounded-xl p-4 text-center">
        <div class="text-3xl font-bold text-jade">{{ achievementsList.length }}</div>
        <div class="text-xs text-paper/50">成就总数</div>
      </div>
    </div>

    <!-- 成就列表 -->
    <div class="space-y-4">
      <div
        v-for="achievement in achievementsList"
        :key="achievement.id"
        class="glass-card rounded-xl p-5"
      >
        <div class="flex items-center gap-4">
          <!-- 图标 -->
          <div :class="[
            'achievement-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
            getAchievementProgress(achievement).tier > 0 ? 'bg-gold/20' : 'bg-white/5'
          ]">
            {{ achievement.icon }}
          </div>
          
          <!-- 信息 -->
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-bold text-paper">{{ achievement.name }}</h3>
              <div class="flex gap-1">
                <span 
                  v-for="tier in 4" 
                  :key="tier"
                  :class="[
                    'w-2 h-2 rounded-full',
                    tier <= getAchievementProgress(achievement).tier ? 'bg-gold' : 'bg-white/20'
                  ]"
                ></span>
              </div>
            </div>
            <p class="text-sm text-paper/60 mb-2">{{ achievement.desc }}</p>
            
            <!-- 进度条 -->
            <div class="flex items-center gap-2">
              <div class="flex-1 h-2 bg-mystic rounded-full overflow-hidden">
                <div 
                  :class="[
                    'h-full transition-all duration-500',
                    getAchievementProgress(achievement).tier >= 4 ? 'bg-gold' : 'bg-gradient-to-r from-azure to-gold'
                  ]"
                  :style="{ 
                    width: (getAchievementProgress(achievement).current / getAchievementProgress(achievement).max * 100) + '%' 
                  }"
                ></div>
              </div>
              <span class="text-xs text-paper/50">
                {{ getAchievementProgress(achievement).current }} / {{ getAchievementProgress(achievement).max }}
              </span>
            </div>
          </div>
          
          <!-- 奖励 -->
          <div class="text-right">
            <div class="text-gold text-sm font-bold">
              +{{ calculateAchievementPoints(getAchievementProgress(achievement).tier) * 10 }}
            </div>
            <div class="text-xs text-paper/50">灵石</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成就提示 -->
    <div class="mt-8 text-center text-paper/40 text-sm">
      <p>💡 完成成就可获得大量灵石奖励</p>
    </div>
  </div>
</template>

<style scoped>
.achievement-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.achievement-icon {
  transition: all 0.3s ease;
}
</style>
