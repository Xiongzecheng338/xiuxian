import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  calculateBreakthroughRate,
  calculateDamage,
  calculateElementBonus,
  calculateDailyLoginReward,
  calculateAchievementPoints,
  calculateLevelExp,
  calculateLevel,
  ROOT_EFFICIENCY,
  ELEMENT_SYSTEM,
  GACHA_POOLS,
  ACHIEVEMENT_MILESTONES,
  GAME_CONSTANTS
} from '../utils/gameMath'

export const useUserStore = defineStore('user', () => {
  // 基础用户数据
  const userData = ref({
    realm: 'chu kui',
    cultivation: 0,
    practiceHours: 0,
    breakthroughs: 0,
    sect: null,
    artifacts: [],
    adventures: [],
    chaptersRead: 0,
    lingqi: 0,
    loginDays: 0,
    lastLoginDate: '',
    achievements: [],
    techniques: [],
    spiritBeast: null,
    rootType: null,
    rootPullPity: 0,
    artifactPullPity: 0,
    battleStats: {
      wins: 0,
      losses: 0,
      totalDamage: 0,
      maxDamage: 0
    },
    completedTasks: [],
    lastTaskRefresh: '',
    enhancedArtifacts: {},
    secretLandsCompleted: [],
    maxRealm: 'chu kui',
    totalPlayTime: 0
  })

  // 境界数据
  const realmData = {
    'chu kui': { name: '初窥门径', icon: '窥', color: 'bronze', desc: '初入修行之门，感知天地灵气', lifespan: '凡人寿数', stages: ['初期-气感初生', '中期-灵气感知', '后期-引气入体'], abilities: ['感知灵气', '引气入体', '基础吐纳', '强身健体'], next: '登堂入室', combatBonus: 1.0 },
    'deng tang': { name: '登堂入室', icon: '堂', color: 'jade', desc: '掌握修行基础，开辟丹田气海', lifespan: '百五十载', stages: ['初期-丹田初开', '中期-气海成形', '后期-气旋初成'], abilities: ['开辟丹田', '气海成形', '轻身术', '基础御物'], next: '融会贯通', combatBonus: 1.2 },
    'rong hui': { name: '融会贯通', icon: '融', color: 'azure', desc: '功法与修为融会贯通，道基初现', lifespan: '二百载', stages: ['初期-功法入门', '中期-招式纯熟', '后期-道基初现'], abilities: ['御器飞行', '神识初显', '辟谷不食', '五行感知'], next: '炉火纯青', combatBonus: 1.5 },
    'lu huo': { name: '炉火纯青', icon: '炉', color: 'vermilion', desc: '修为精进，如炉火纯青', lifespan: '三百载', stages: ['初期-道基稳固', '中期-法力大增', '后期-神通初显'], abilities: ['御剑飞行', '神通初显', '瞬息千里', '寿元大增'], next: '登峰造极', combatBonus: 2.0 },
    'deng feng': { name: '登峰造极', icon: '峰', color: 'gold', desc: '修为达到顶峰，金丹成形', lifespan: '五百载', stages: ['初期-金丹初凝', '中期-金丹稳固', '后期-金丹圆满'], abilities: ['金丹大成', '御剑飞行', '神通广大', '移山填海'], next: '出神入化', combatBonus: 2.5 },
    'chu shen': { name: '出神入化', icon: '神', color: 'spirit', desc: '神念通达，元婴出窍', lifespan: '千载', stages: ['初期-元婴初生', '中期-元婴成长', '后期-元婴大成'], abilities: ['元婴出窍', '瞬移千里', '分神化身', '夺舍重生'], next: '返璞归真', combatBonus: 3.0 },
    'fan pu': { name: '返璞归真', icon: '璞', color: 'paper', desc: '脱去铅华，返璞归真', lifespan: '三千载', stages: ['初期-返璞初现', '中期-真意通达', '后期-大道可期'], abilities: ['虚室生白', '真意通达', '法则初悟', '创造空间'], next: '天人合一', combatBonus: 4.0 },
    'tian ren': { name: '天人合一', icon: '天', color: 'darkgold', desc: '与天地合一，掌控法则', lifespan: '万载', stages: ['初期-天人感应', '中期-法则掌控', '后期-道韵天成'], abilities: ['天人感应', '法则掌控', '不死不灭', '创造生灵'], next: '传说境界', combatBonus: 5.0 },
    'chuan shuo': { name: '传说境界', icon: '传', color: 'crimson', desc: '超越天地，成为传说', lifespan: '与天同寿', stages: ['初期-传说初成', '中期-传说稳固', '后期-传说圆满'], abilities: ['言出法随', '创造世界', '超脱轮回', '与天同寿'], next: null, combatBonus: 10.0 }
  }

  const realmKeys = Object.keys(realmData)
  const currentRealm = computed(() => realmData[userData.value.realm])
  const realmIndex = computed(() => realmKeys.indexOf(userData.value.realm))
  const realmProgress = computed(() => Math.min((userData.value.cultivation / 1000) * 100, 100))
  
  // 灵根属性
  const rootEfficiency = computed(() => {
    if (!userData.value.rootType) return 0
    return ROOT_EFFICIENCY[userData.value.rootType]?.bonus || 0
  })

  // 计算修炼效率
  const cultivationEfficiency = computed(() => {
    const base = 10
    const rootBonus = rootEfficiency.value
    const realmBonus = (currentRealm.value?.combatBonus || 1) * 0.05
    return Math.floor(base * (1 + rootBonus + realmBonus))
  })

  // 计算突破概率
  const breakthroughRate = computed(() => {
    return calculateBreakthroughRate(
      realmIndex.value,
      userData.value.cultivation
    )
  })

  // 成就进度
  const achievementProgress = computed(() => {
    const progress = {}
    
    // 修为成就
    const cultMilestones = ACHIEVEMENT_MILESTONES.cultivation
    progress.cultivation = {
      current: userData.value.cultivation,
      next: cultMilestones.find(m => m > userData.value.cultivation) || null,
      completed: cultMilestones.filter(m => m <= userData.value.cultivation).length
    }
    
    // 突破成就
    const breakMilestones = ACHIEVEMENT_MILESTONES.breakthrough
    progress.breakthrough = {
      current: userData.value.breakthroughs,
      next: breakMilestones.find(m => m > userData.value.breakthroughs) || null,
      completed: breakMilestones.filter(m => m <= userData.value.breakthroughs).length
    }
    
    // 签到成就
    const loginMilestones = ACHIEVEMENT_MILESTONES.login
    progress.login = {
      current: userData.value.loginDays,
      next: loginMilestones.find(m => m > userData.value.loginDays) || null,
      completed: loginMilestones.filter(m => m <= userData.value.loginDays).length
    }
    
    return progress
  })

  // 初始化
  function initUserData() {
    try {
      const savedData = localStorage.getItem('xiuxianUserData')
      if (savedData) {
        userData.value = { ...userData.value, ...JSON.parse(savedData) }
      } else {
        saveUserData()
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
      saveUserData()
    }
  }

  function saveUserData() {
    try {
      localStorage.setItem('xiuxianUserData', JSON.stringify(userData.value))
    } catch (error) {
      console.error('Failed to save user data:', error)
    }
  }

  // 修炼
  function addCultivation(amount) {
    userData.value.cultivation = Math.min(
      userData.value.cultivation + amount,
      GAME_CONSTANTS.MAX_CULTIVATION
    )
    saveUserData()
  }

  function addLingqi(amount) {
    userData.value.lingqi = Math.min(
      userData.value.lingqi + amount,
      GAME_CONSTANTS.MAX_LINGQI
    )
    saveUserData()
  }

  function consumeLingqi(amount) {
    if (userData.value.lingqi >= amount) {
      userData.value.lingqi -= amount
      saveUserData()
      return true
    }
    return false
  }

  // 突破
  function checkBreakthrough() {
    const currentIndex = realmKeys.indexOf(userData.value.realm)
    const maxCultivation = 1000

    if (userData.value.cultivation >= maxCultivation && currentIndex < realmKeys.length - 1) {
      const rate = breakthroughRate.value
      const success = Math.random() < rate

      if (success) {
        userData.value.realm = realmKeys[currentIndex + 1]
        userData.value.cultivation -= maxCultivation
        userData.value.breakthroughs++
        
        if (realmData[userData.value.realm]) {
          userData.value.maxRealm = userData.value.realm
        }
        
        saveUserData()
        return { success: true, newRealm: userData.value.realm }
      } else {
        // 失败惩罚
        const penalty = Math.floor(maxCultivation * (0.3 + 0.1 * currentIndex))
        userData.value.cultivation = Math.max(0, userData.value.cultivation - penalty)
        saveUserData()
        return { success: false, penalty }
      }
    }
    return null
  }

  // 签到
  function checkDailyLogin() {
    const today = new Date().toDateString()
    const lastDate = userData.value.lastLoginDate

    if (lastDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      if (lastDate === yesterday.toDateString()) {
        userData.value.loginDays++
      } else {
        userData.value.loginDays = 1
      }

      userData.value.lastLoginDate = today

      const reward = calculateDailyLoginReward(userData.value.loginDays)
      addLingqi(reward)

      checkAchievements()

      saveUserData()
      return {
        consecutiveDays: userData.value.loginDays,
        reward: reward
      }
    }
    return null
  }

  // 设置灵根
  function setRootType(rootType) {
    userData.value.rootType = rootType
    saveUserData()
  }

  // 抽卡
  function pullGacha(poolType, count = 1) {
    const pool = GACHA_POOLS[poolType]
    if (!pool) return null

    const price = count === 10 ? pool.prices[1] : pool.prices[0]
    if (!consumeLingqi(price * count)) {
      return { success: false, reason: '灵石不足' }
    }

    const results = []
    const pityKey = poolType === 'root' ? 'rootPullPity' : 'artifactPullPity'

    for (let i = 0; i < count; i++) {
      userData.value[pityKey]++
      const roll = Math.random()
      
      let rarity
      const ssrRate = Math.min(pool.SSR + Math.floor(userData.value[pityKey] / pool.guaranteeCount) * 0.2, 0.5)
      
      if (roll < ssrRate) {
        rarity = 'SSR'
        userData.value[pityKey] = 0
      } else if (roll < ssrRate + pool.SR) {
        rarity = 'SR'
      } else {
        rarity = 'R'
      }

      results.push({ rarity, poolType })
    }

    saveUserData()
    return { success: true, results, totalCost: price * count }
  }

  // 成就检查
  function checkAchievements() {
    const newAchievements = []
    
    // 检查修为成就
    const cultCompleted = ACHIEVEMENT_MILESTONES.cultivation.filter(
      m => m <= userData.value.cultivation && !userData.value.achievements.includes(`cult_${m}`)
    )
    cultCompleted.forEach(m => {
      userData.value.achievements.push(`cult_${m}`)
      newAchievements.push({ id: `cult_${m}`, points: calculateAchievementPoints(cultCompleted.indexOf(m) + 1) })
      addLingqi(calculateAchievementPoints(cultCompleted.indexOf(m) + 1) * 10)
    })

    // 检查突破成就
    const breakCompleted = ACHIEVEMENT_MILESTONES.breakthrough.filter(
      m => m <= userData.value.breakthroughs && !userData.value.achievements.includes(`break_${m}`)
    )
    breakCompleted.forEach(m => {
      userData.value.achievements.push(`break_${m}`)
      newAchievements.push({ id: `break_${m}`, points: calculateAchievementPoints(breakCompleted.indexOf(m) + 1) })
    })

    // 检查签到成就
    const loginCompleted = ACHIEVEMENT_MILESTONES.login.filter(
      m => m <= userData.value.loginDays && !userData.value.achievements.includes(`login_${m}`)
    )
    loginCompleted.forEach(m => {
      userData.value.achievements.push(`login_${m}`)
      newAchievements.push({ id: `login_${m}`, points: calculateAchievementPoints(loginCompleted.indexOf(m) + 1) })
    })

    if (newAchievements.length > 0) {
      saveUserData()
    }

    return newAchievements
  }

  // 战斗
  function calculateBattleDamage(attack, enemyDefense = 0, element = '无') {
    const realmBonus = currentRealm.value?.combatBonus || 1
    const rootBonus = 1 + rootEfficiency.value
    
    const totalAttack = attack * realmBonus * rootBonus
    return calculateDamage(totalAttack, enemyDefense)
  }

  function recordBattle(win, damage) {
    if (win) {
      userData.value.battleStats.wins++
    } else {
      userData.value.battleStats.losses++
    }
    userData.value.battleStats.totalDamage += damage
    if (damage > userData.value.battleStats.maxDamage) {
      userData.value.battleStats.maxDamage = damage
    }
    saveUserData()
  }

  // 法宝强化
  function enhanceArtifact(artifactId) {
    const currentLevel = userData.value.enhancedArtifacts[artifactId] || 0
    
    if (currentLevel >= 10) {
      return { success: false, reason: '已达最大强化等级' }
    }

    const rate = Math.pow(0.85, currentLevel) * 0.9
    const success = Math.random() < rate

    if (success) {
      userData.value.enhancedArtifacts[artifactId] = currentLevel + 1
      saveUserData()
      return { success: true, newLevel: currentLevel + 1 }
    } else {
      userData.value.enhancedArtifacts[artifactId] = Math.max(0, currentLevel - 1)
      saveUserData()
      return { success: false, reason: '强化失败', newLevel: userData.value.enhancedArtifacts[artifactId] }
    }
  }

  return {
    userData,
    realmData,
    realmKeys,
    currentRealm,
    realmIndex,
    realmProgress,
    rootEfficiency,
    cultivationEfficiency,
    breakthroughRate,
    achievementProgress,
    initUserData,
    saveUserData,
    addCultivation,
    addLingqi,
    consumeLingqi,
    checkBreakthrough,
    checkDailyLogin,
    setRootType,
    pullGacha,
    checkAchievements,
    calculateBattleDamage,
    recordBattle,
    enhanceArtifact
  }
})
