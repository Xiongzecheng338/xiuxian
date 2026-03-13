<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const taskTemplates = {
  daily: [
    { id: 'practice_10', name: '静心修炼', desc: '修炼10分钟', type: 'cultivation', target: 10, reward: 50 },
    { id: 'login', name: '每日签到', desc: '每日签到一次', type: 'login', target: 1, reward: 20 },
    { id: 'realm_view', name: '感悟境界', desc: '查看境界详情', type: 'view', target: 1, reward: 10 },
    { id: 'gacha_once', name: '尝试抽卡', desc: '进行1次抽卡', type: 'gacha', target: 1, reward: 30 },
    { id: 'battle_once', name: '初试身手', desc: '进行1次战斗', type: 'battle', target: 1, reward: 40 }
  ],
  weekly: [
    { id: 'practice_60', name: '勤奋修炼', desc: '本周修炼60分钟', type: 'cultivation', target: 60, reward: 200 },
    { id: 'breakthrough', name: '境界突破', desc: '本周突破1次境界', type: 'breakthrough', target: 1, reward: 500 },
    { id: 'login_7', name: '坚持不懈', desc: '本周签到7天', type: 'login', target: 7, reward: 150 },
    { id: 'battle_5', name: '战斗达人', desc: '本周战斗胜利5次', type: 'battle', target: 5, reward: 250 }
  ]
}

const dailyTasks = ref([])
const weeklyTasks = ref([])

const generateTasks = () => {
  const today = new Date().toDateString()
  
  if (userStore.userData.lastTaskRefresh !== today) {
    dailyTasks.value = taskTemplates.daily.map(t => ({
      ...t,
      progress: 0,
      completed: false
    }))
    
    const weekNum = Math.ceil(new Date().getDate() / 7)
    weeklyTasks.value = taskTemplates.weekly.map(t => ({
      ...t,
      progress: 0,
      completed: false,
      week: weekNum
    }))
    
    userStore.userData.lastTaskRefresh = today
    userStore.saveUserData()
  } else {
    dailyTasks.value = taskTemplates.daily.map(t => {
      const existing = userStore.userData.completedTasks?.find(ct => ct.id === t.id)
      return {
        ...t,
        progress: existing?.progress || 0,
        completed: existing?.completed || false
      }
    })
    
    weeklyTasks.value = taskTemplates.weekly.map(t => {
      const existing = userStore.userData.completedTasks?.find(ct => ct.id === t.id)
      return {
        ...t,
        progress: existing?.progress || 0,
        completed: existing?.completed || false,
        week: t.week
      }
    })
  }
}

const updateTaskProgress = (taskId, progress) => {
  const task = dailyTasks.value.find(t => t.id === taskId) || weeklyTasks.value.find(t => t.id === taskId)
  if (!task || task.completed) return
  
  task.progress = Math.min(progress, task.target)
  
  if (task.progress >= task.target && !task.completed) {
    task.completed = true
    userStore.addLingqi(task.reward)
    
    const existing = userStore.userData.completedTasks?.findIndex(ct => ct.id === taskId)
    if (existing >= 0) {
      userStore.userData.completedTasks[existing].progress = task.progress
      userStore.userData.completedTasks[existing].completed = true
    } else {
      userStore.userData.completedTasks = userStore.userData.completedTasks || []
      userStore.userData.completedTasks.push({ id: taskId, progress: task.progress, completed: true })
    }
    userStore.saveUserData()
  }
}

const dailyCompleted = computed(() => dailyTasks.value.filter(t => t.completed).length)
const weeklyCompleted = computed(() => weeklyTasks.value.filter(t => t.completed).length)

const dailyTotalReward = computed(() => dailyTasks.value.reduce((sum, t) => sum + t.reward, 0))
const weeklyTotalReward = computed(() => weeklyTasks.value.reduce((sum, t) => sum + t.reward, 0))

onMounted(() => {
  generateTasks()
})
</script>

<template>
  <div class="task-page max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">任务中心</h1>
    <p class="text-center text-paper/60 mb-8">完成每日任务，获得丰厚奖励</p>

    <!-- 每日任务 -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gold">每日任务</h2>
        <div class="text-paper/60">
          {{ dailyCompleted }} / {{ dailyTasks.length }}
        </div>
      </div>
      
      <div class="space-y-3">
        <div
          v-for="task in dailyTasks"
          :key="task.id"
          :class="[
            'task-card glass-card rounded-xl p-4 transition-all duration-300',
            task.completed ? 'opacity-60' : ''
          ]"
        >
          <div class="flex items-center gap-4">
            <div :class="['task-icon w-10 h-10 rounded-lg flex items-center justify-center', task.completed ? 'bg-gold/20' : 'bg-white/5']">
              {{ task.completed ? '✅' : '📋' }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-paper">{{ task.name }}</h3>
                <span v-if="task.completed" class="text-gold text-xs">已完成</span>
              </div>
              <p class="text-sm text-paper/60">{{ task.desc }}</p>
              
              <div class="flex items-center gap-2 mt-2">
                <div class="flex-1 h-2 bg-mystic rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-azure to-gold transition-all duration-500"
                    :style="{ width: (task.progress / task.target * 100) + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-paper/50">
                  {{ task.progress }} / {{ task.target }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-gold font-bold">+{{ task.reward }}</div>
              <div class="text-xs text-paper/50">灵石</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 p-3 bg-gold/10 rounded-xl text-center">
        <span class="text-paper/70">今日可获得: </span>
        <span class="text-gold font-bold">+{{ dailyTotalReward }}灵石</span>
      </div>
    </section>

    <!-- 每周任务 -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gold">每周任务</h2>
        <div class="text-paper/60">
          {{ weeklyCompleted }} / {{ weeklyTasks.length }}
        </div>
      </div>
      
      <div class="space-y-3">
        <div
          v-for="task in weeklyTasks"
          :key="task.id"
          :class="[
            'task-card glass-card rounded-xl p-4 transition-all duration-300',
            task.completed ? 'opacity-60' : ''
          ]"
        >
          <div class="flex items-center gap-4">
            <div :class="['task-icon w-10 h-10 rounded-lg flex items-center justify-center', task.completed ? 'bg-gold/20' : 'bg-white/5']">
              {{ task.completed ? '✅' : '📜' }}
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-paper">{{ task.name }}</h3>
                <span v-if="task.completed" class="text-gold text-xs">已完成</span>
              </div>
              <p class="text-sm text-paper/60">{{ task.desc }}</p>
              
              <div class="flex items-center gap-2 mt-2">
                <div class="flex-1 h-2 bg-mystic rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-vermilion to-gold transition-all duration-500"
                    :style="{ width: (task.progress / task.target * 100) + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-paper/50">
                  {{ task.progress }} / {{ task.target }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-gold font-bold">+{{ task.reward }}</div>
              <div class="text-xs text-paper/50">灵石</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-4 p-3 bg-vermilion/10 rounded-xl text-center">
        <span class="text-paper/70">本周可获得: </span>
        <span class="text-gold font-bold">+{{ weeklyTotalReward }}灵石</span>
      </div>
    </section>

    <!-- 任务提示 -->
    <div class="mt-8 text-center text-paper/40 text-sm">
      <p>💡 完成任务自动发放奖励到账户</p>
    </div>
  </div>
</template>

<style scoped>
.task-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.task-card {
  transition: all 0.3s ease;
}

.task-card:hover {
  border-color: rgba(212, 168, 83, 0.3);
}
</style>
