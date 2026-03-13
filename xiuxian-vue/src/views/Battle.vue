<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { calculateDamage, calculateElementBonus } from '../utils/gameMath'

const userStore = useUserStore()

const battleLog = ref([])
const isBattling = ref(false)
const currentEnemy = ref(null)
const playerHP = ref(100)
const enemyHP = ref(100)
const battleRound = ref(0)

const enemyTemplates = [
  { name: '山贼', level: 1, attack: 10, defense: 5, hp: 50, element: '土', reward: 20 },
  { name: '野狼', level: 2, attack: 15, defense: 8, hp: 70, element: '火', reward: 30 },
  { name: '筑基修士', level: 3, attack: 25, defense: 15, hp: 100, element: '金', reward: 50 },
  { name: '金丹修士', level: 5, attack: 50, defense: 30, hp: 200, element: '火', reward: 100 },
  { name: '元婴老怪', level: 8, attack: 100, defense: 60, hp: 400, element: '木', reward: 200 },
  { name: '化神期魔头', level: 10, attack: 200, defense: 100, hp: 800, element: '暗', reward: 500 }
]

const enemies = computed(() => {
  const playerRealm = userStore.realmIndex
  return enemyTemplates.filter(e => e.level <= playerRealm + 2).slice(0, 4)
})

const selectEnemy = (enemy) => {
  currentEnemy.value = { ...enemy, maxHP: enemy.hp }
  playerHP.value = 100
  enemyHP.value = enemy.hp
  battleRound.value = 0
  battleLog.value = []
}

const attack = () => {
  if (isBattling.value || !currentEnemy.value) return
  
  isBattling.value = true
  battleRound.value++
  
  const playerAttack = 20 + userStore.realmIndex * 10 + userStore.userData.cultivation / 50
  const enemyDefense = currentEnemy.value.defense
  
  let playerDamage = calculateDamage(playerAttack, enemyDefense)
  
  const elementBonus = calculateElementBonus(
    userStore.userData.rootType,
    currentEnemy.value.element
  )
  
  if (elementBonus > 1) {
    playerDamage = Math.floor(playerDamage * elementBonus)
    battleLog.value.push({
      round: battleRound.value,
      type: 'crit',
      text: `🎯 属性克制！伤害提升至 ${playerDamage}`
    })
  }
  
  enemyHP.value -= playerDamage
  
  battleLog.value.push({
    round: battleRound.value,
    type: 'player',
    text: `你对${currentEnemy.value.name}造成了 ${playerDamage} 点伤害`
  })
  
  if (enemyHP.value <= 0) {
    endBattle(true)
    return
  }
  
  setTimeout(() => {
    enemyAttack()
  }, 500)
}

const enemyAttack = () => {
  const enemyAttack = currentEnemy.value.attack
  const playerDefense = 10 + userStore.realmIndex * 5
  
  let enemyDamage = calculateDamage(enemyAttack, playerDefense)
  
  playerHP.value -= enemyDamage
  
  battleLog.value.push({
    round: battleRound.value,
    type: 'enemy',
    text: `${currentEnemy.value.name}对你造成了 ${enemyDamage} 点伤害`
  })
  
  if (playerHP.value <= 0) {
    endBattle(false)
    return
  }
  
  isBattling.value = false
}

const endBattle = (win) => {
  isBattling.value = false
  
  if (win) {
    const reward = currentEnemy.value.reward
    userStore.addLingqi(reward)
    userStore.recordBattle(true, 0)
    
    battleLog.value.push({
      round: battleRound.value,
      type: 'win',
      text: `🎉 战斗胜利！获得 ${reward} 灵石`
    })
  } else {
    userStore.recordBattle(false, 0)
    
    battleLog.value.push({
      round: battleRound.value,
      type: 'lose',
      text: `💀 战斗失败...再接再厉`
    })
  }
}

const restartBattle = () => {
  if (currentEnemy.value) {
    playerHP.value = 100
    enemyHP.value = currentEnemy.value.hp
    battleRound.value = 0
    battleLog.value = []
  }
}

const getEnemyColor = (level) => {
  if (level <= 2) return 'bronze'
  if (level <= 5) return 'jade'
  if (level <= 8) return 'azure'
  return 'vermilion'
}
</script>

<template>
  <div class="battle-page max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-2">试炼场</h1>
    <p class="text-center text-paper/60 mb-8">战胜强敌，获得丰厚奖励</p>

    <!-- 战斗统计 -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div class="glass-card rounded-xl p-3 text-center">
        <div class="text-xl font-bold text-gold">{{ userStore.userData.battleStats.wins }}</div>
        <div class="text-xs text-paper/50">胜利</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div class="text-xl font-bold text-vermilion">{{ userStore.userData.battleStats.losses }}</div>
        <div class="text-xs text-paper/50">失败</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div class="text-xl font-bold text-azure">{{ userStore.userData.battleStats.maxDamage }}</div>
        <div class="text-xs text-paper/50">最高伤害</div>
      </div>
      <div class="glass-card rounded-xl p-3 text-center">
        <div class="text-xl font-bold text-jade">
          {{ userStore.userData.battleStats.wins + userStore.userData.battleStats.losses > 0 
            ? Math.round(userStore.userData.battleStats.wins / (userStore.userData.battleStats.wins + userStore.userData.battleStats.losses) * 100) 
            : 0 }}%
        </div>
        <div class="text-xs text-paper/50">胜率</div>
      </div>
    </div>

    <!-- 选择敌人 -->
    <div v-if="!currentEnemy" class="grid md:grid-cols-2 gap-4">
      <div
        v-for="enemy in enemies"
        :key="enemy.name"
        @click="selectEnemy(enemy)"
        class="enemy-card glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      >
        <div class="flex items-center gap-4">
          <div :class="['w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center text-2xl', 'bg-' + getEnemyColor(enemy.level) + '/20']">
            👹
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-paper">{{ enemy.name }}</h3>
            <p class="text-sm text-paper/60">等级 {{ enemy.level }}</p>
            <div class="flex gap-2 mt-1">
              <span class="text-xs px-2 py-0.5 bg-white/5 rounded">攻击 {{ enemy.attack }}</span>
              <span class="text-xs px-2 py-0.5 bg-white/5 rounded">防御 {{ enemy.defense }}</span>
            </div>
          </div>
          <div class="text-gold font-bold">+{{ enemy.reward }}💎</div>
        </div>
      </div>
    </div>

    <!-- 战斗界面 -->
    <div v-else class="space-y-6">
      <!-- 战斗信息 -->
      <div class="glass-card rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-paper">{{ currentEnemy.name }}</h3>
          <button @click="currentEnemy = null" class="text-paper/50 hover:text-paper">
            ✕ 退出
          </button>
        </div>
        
        <!-- 敌人血条 -->
        <div class="mb-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-paper/70">敌人HP</span>
            <span class="text-vermilion">{{ Math.max(0, enemyHP) }} / {{ currentEnemy.hp }}</span>
          </div>
          <div class="h-4 bg-mystic rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-vermilion to-red-600 transition-all duration-300"
              :style="{ width: (Math.max(0, enemyHP) / currentEnemy.hp * 100) + '%' }"
            ></div>
          </div>
        </div>
        
        <!-- 玩家血条 -->
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-paper/70">你的HP</span>
            <span class="text-azure">{{ Math.max(0, playerHP) }} / 100</span>
          </div>
          <div class="h-4 bg-mystic rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-azure to-blue-600 transition-all duration-300"
              :style="{ width: (Math.max(0, playerHP) / 100 * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- 战斗按钮 -->
      <div class="flex justify-center gap-4">
        <button
          @click="attack"
          :disabled="isBattling"
          class="attack-btn px-10 py-4 rounded-xl text-xl font-bold disabled:opacity-50"
        >
          ⚔️ 攻击
        </button>
        <button
          @click="restartBattle"
          class="px-6 py-4 rounded-xl text-lg bg-white/10 text-paper hover:bg-white/20 transition-colors"
        >
          🔄 重来
        </button>
      </div>

      <!-- 战斗日志 -->
      <div class="glass-card rounded-xl p-4 max-h-64 overflow-y-auto">
        <h4 class="text-gold font-bold mb-2">战斗记录</h4>
        <div class="space-y-2 text-sm">
          <div
            v-for="(log, index) in battleLog"
            :key="index"
            :class="[
              'p-2 rounded',
              log.type === 'player' ? 'bg-azure/10 text-azure' :
              log.type === 'enemy' ? 'bg-vermilion/10 text-vermilion' :
              log.type === 'win' ? 'bg-gold/20 text-gold' :
              log.type === 'lose' ? 'bg-gray/20 text-gray' :
              'bg-vermilion/10 text-vermilion'
            ]"
          >
            {{ log.text }}
          </div>
          <div v-if="battleLog.length === 0" class="text-paper/50 text-center py-4">
            点击攻击开始战斗
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.enemy-card:hover {
  border-color: rgba(212, 168, 83, 0.4);
}

.attack-btn {
  background: linear-gradient(135deg, #c53d43, #8b282c);
  color: #f5f0e6;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.attack-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(197, 61, 67, 0.4);
}
</style>
