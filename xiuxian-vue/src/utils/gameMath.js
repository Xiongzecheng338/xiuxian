// 游戏数值平衡系统 - 使用数学模型控制游戏平衡

// ============================================
// 1. 修炼效率公式
// ============================================

// 基础修炼效率 (每分钟获得修为)
export const BASE_CULTIVATION_PER_MINUTE = 10

// 灵根对修炼效率的加成系数
// 公式: efficiency = base * (1 + root_bonus + technique_bonus + artifact_bonus)
export const ROOT_EFFICIENCY = {
  '金属性': { bonus: 0.15, desc: '金系功法修炼效率+15%' },
  '木属性': { bonus: 0.12, desc: '恢复能力+12%' },
  '水属性': { bonus: 0.10, desc: '悟性+10%' },
  '火属性': { bonus: 0.18, desc: '攻击修炼效率+18%' },
  '土属性': { bonus: 0.08, desc: '防御修炼效率+8%' },
  '无灵根': { bonus: 0, desc: '无加成' }
}

// 功法等级对修炼效率的加成 (指数增长)
// 公式: technique_bonus = 0.1 * (level^1.5)
export const calculateTechniqueBonus = (level) => {
  return 0.1 * Math.pow(level, 1.5)
}

// 法宝对修炼效率的加成 (对数增长)
// 公式: artifact_bonus = base * log(1 + total_power/100)
export const calculateArtifactBonus = (totalPower) => {
  const base = 0.05
  return base * Math.log(1 + totalPower / 100)
}

// ============================================
// 2. 境界突破概率公式
// ============================================

// 突破成功率 (基于修为溢出)
// 公式: success_rate = base_rate + overflow_bonus - difficulty_penalty
// overflow_ratio = current_cultivation / max_cultivation_for_realm
export const BREAKTHROUGH_BASE_RATE = 0.3 // 基础30%成功率
export const BREAKTHROUGH_OVERFLOW_BONUS = 0.15 // 溢出加成系数
export const BREAKTHROUGH_DIFFICULTY_PENALTY = 0.05 // 境界越高越难

export const calculateBreakthroughRate = (realmIndex, cultivation, maxCultivation = 1000) => {
  const overflowRatio = cultivation / maxCultivation
  const difficultyFactor = realmIndex * BREAKTHROUGH_DIFFICULTY_PENALTY
  
  let rate = BREAKTHROUGH_BASE_RATE 
    + (overflowRatio * BREAKTHROUGH_OVERFLOW_BONUS) 
    - difficultyFactor
  
  // 灵根加成
  const rootBonus = userStore?.userData?.rootType ? 
    ROOT_EFFICIENCY[userStore.userData.rootType]?.bonus * 0.5 : 0
  
  rate += rootBonus
  
  // 限制在10%-90%之间
  return Math.max(0.1, Math.min(0.9, rate))
}

// 突破失败惩罚 (损失修为)
// 公式: penalty = max_cultivation * (0.3 + 0.1 * realm_index)
export const calculateBreakthroughPenalty = (realmIndex, maxCultivation = 1000) => {
  return Math.floor(maxCultivation * (0.3 + 0.1 * realmIndex))
}

// ============================================
// 3. 抽卡概率系统
// ============================================

// 卡池概率 (保底机制)
// 公式: P(n) = base_rate * (1 + n * guarantee_bonus) until guarantee
export const GACHA_POOLS = {
  // 灵根抽卡
  root: {
    SSR: 0.02,  // 2%
    SR: 0.08,    // 8%
    R: 0.90,     // 90%
    guaranteeCount: 50, // 50抽保底
    prices: [100, 200, 500] // 单抽/十连/保底
  },
  // 法宝抽卡
  artifact: {
    SSR: 0.015,
    SR: 0.085,
    R: 0.90,
    guaranteeCount: 80,
    prices: [200, 1800]
  }
}

// 计算实际抽卡概率 (考虑保底)
export const calculateGachaRate = (pool, pityCount) => {
  const guaranteeBonus = Math.floor(pityCount / pool.guaranteeCount) * 0.2
  
  return {
    SSR: Math.min(pool.SSR + guaranteeBonus, 0.5),
    SR: pool.SR,
    R: Math.max(pool.R - guaranteeBonus, 0.5)
  }
}

// 伪随机算法 (基于种子)
// 使用线性同余生成器
export class PseudoRandom {
  constructor(seed) {
    this.seed = seed
    this.a = 1103515245
    this.c = 12345
    this.m = 2^31
  }
  
  next() {
    this.seed = (this.a * this.seed + this.c) % this.m
    return this.seed / this.m
  }
  
  // 从卡池抽取
  draw(pool) {
    const rates = calculateGachaRate(pool, this.seed % pool.guaranteeCount)
    const roll = this.next()
    
    let cumulative = 0
    if (roll < (cumulative += rates.SSR)) return 'SSR'
    if (roll < (cumulative += rates.SR)) return 'SR'
    return 'R'
  }
}

// ============================================
// 4. 战斗伤害公式 (物理模型)
// ============================================

// 基础伤害公式 (类似ARPG)
// damage = (attack * skill_multiplier * element_bonus) / (defense * resistance)
// 使用对数衰减防止极端值
export const calculateDamage = (attack, defense, skillMultiplier = 1, elementBonus = 1) => {
  const baseDamage = attack * skillMultiplier * elementBonus
  
  // 防御减伤 (使用对数函数)
  const defenseReduction = Math.log(1 + defense / 100) / Math.log(2) * 0.5
  
  // 最终伤害 (最小为1)
  return Math.max(1, Math.floor(baseDamage * (1 - defenseReduction)))
}

// 暴击伤害 (基于正态分布模拟)
// mean = 1.5, std = 0.3
export const calculateCriticalDamage = (baseDamage, critRate, critDamage = 1.5) => {
  const isCrit = Math.random() < critRate
  return isCrit ? Math.floor(baseDamage * critDamage) : baseDamage
}

// 元素克制矩阵
export const ELEMENT_SYSTEM = {
  '金属性': { weakTo: '火属性', strongTo: '木属性' },
  '木属性': { weakTo: '金属性', strongTo: '土属性' },
  '水属性': { weakTo: '土属性', strongTo: '火属性' },
  '火属性': { weakTo: '水属性', strongTo: '金属性' },
  '土属性': { weakTo: '木属性', strongTo: '水属性' }
}

export const calculateElementBonus = (attackElement, defenseElement) => {
  if (!attackElement || !defenseElement) return 1.0
  
  const system = ELEMENT_SYSTEM[attackElement]
  if (!system) return 1.0
  
  if (system.weakTo === defenseElement) return 0.7  // 被克制
  if (system.strongTo === defenseElement) return 1.5 // 克制
  
  return 1.0
}

// ============================================
// 5. 经验与等级系统
// ============================================

// 升级所需经验 (指数增长)
// 公式: exp_needed = base * (level^exponent)
export const LEVEL_EXP_BASE = 100
export const LEVEL_EXP_EXPONENT = 1.8

export const calculateLevelExp = (level) => {
  return Math.floor(LEVEL_EXP_BASE * Math.pow(level, LEVEL_EXP_EXPONENT))
}

// 总经验转等级
export const calculateLevel = (totalExp) => {
  let level = 1
  let expNeeded = LEVEL_EXP_BASE
  
  while (totalExp >= expNeeded) {
    level++
    expNeeded += calculateLevelExp(level)
  }
  
  return { level, nextExp: expNeeded - totalExp }
}

// ============================================
// 6. 灵石产出公式
// ============================================

// 每日签到奖励 (线性增长到阶梯)
// 公式: reward = base + login_days * linear_bonus (max at 30 days)
export const DAILY_LOGIN_BASE = 10
export const DAILY_LOGIN_BONUS = 5
export const DAILY_LOGIN_MAX = 30

export const calculateDailyLoginReward = (loginDays) => {
  const effectiveDays = Math.min(loginDays, DAILY_LOGIN_MAX)
  return DAILY_LOGIN_BASE + effectiveDays * DAILY_LOGIN_BONUS
}

// 任务奖励 (基于等级)
export const calculateTaskReward = (taskLevel, baseReward) => {
  // 公式: reward = base * (1 + level * 0.1)
  return Math.floor(baseReward * (1 + taskLevel * 0.1))
}

// 战斗胜利奖励 (基于等级差)
// 公式: reward = base * (1 + (enemy_level - player_level) * 0.1)
export const calculateBattleReward = (baseReward, playerLevel, enemyLevel) => {
  const levelDiff = enemyLevel - playerLevel
  const bonus = Math.max(-0.5, Math.min(1.0, levelDiff * 0.1))
  return Math.floor(baseReward * (1 + bonus))
}

// ============================================
// 7. 法宝强化系统
// ============================================

// 强化成功率 (指数衰减)
// 公式: success_rate = base_rate * (decay ^ current_level)
export const ENHANCE_BASE_RATE = 0.9
export const ENHANCE_DECAY = 0.85
export const ENHANCE_MAX_LEVEL = 10

export const calculateEnhanceRate = (currentLevel) => {
  return ENHANCE_BASE_RATE * Math.pow(ENHANCE_DECAY, currentLevel)
}

// 强化失败保护 (降级而非销毁)
export const calculateEnhancePenalty = (currentLevel, isProtected) => {
  if (isProtected) return -1 // 降一级
  return -Math.floor(currentLevel * 0.5) // 降半级
}

// ============================================
// 8. 秘境探索系统
// ============================================

// 秘境难度系数 (基于玩家境界)
// 公式: difficulty = base * (realm_index + 1)^exponent
export const SECRET_LAND_BASE_DIFFICULTY = 1.0
export const SECRET_LAND_EXPONENT = 1.5

export const calculateSecretLandDifficulty = (realmIndex) => {
  return SECRET_LAND_BASE_DIFFICULTY * Math.pow(realmIndex + 1, SECRET_LAND_EXPONENT)
}

// 秘境收益 (基于难度)
// 公式: reward = base_reward * difficulty * (1 + bonus_rate)
export const calculateSecretLandReward = (baseReward, difficulty, completionRate) => {
  return Math.floor(baseReward * difficulty * completionRate)
}

// 秘境持续时间 (分钟) - 对数函数
export const calculateSecretLandDuration = (difficulty) => {
  return Math.floor(5 + Math.log(difficulty + 1) * 10)
}

// ============================================
// 9. 成就系统
// ============================================

// 成就点数 (使用几何级数)
// 公式: points = base * (multiplier ^ tier)
export const ACHIEVEMENT_BASE_POINTS = 100
export const ACHIEVEMENT_MULTIPLIER = 2.5

export const calculateAchievementPoints = (tier) => {
  return Math.floor(ACHIEVEMENT_BASE_POINTS * Math.pow(ACHIEVEMENT_MULTIPLIER, tier - 1))
}

// 成就里程碑
export const ACHIEVEMENT_MILESTONES = {
  cultivation: [1000, 10000, 100000, 1000000], // 修为里程碑
  breakthrough: [1, 10, 50, 100], // 突破次数
  login: [7, 30, 100, 365], // 签到天数
  battle: [10, 100, 1000, 10000], // 战斗次数
  artifact: [1, 10, 50, 100] // 法宝数量
}

// ============================================
// 10. 物理/数学常数
// ============================================

export const GAME_CONSTANTS = {
  // 时间换算 (现实秒 = 游戏分钟)
  TIME_CONVERSION: 60, // 1秒 = 1分钟游戏时间
  
  // 最大值限制
  MAX_CULTIVATION: 999999,
  MAX_LINGQI: 999999999,
  MAX_LEVEL: 999,
  
  // 境界指数
  REALM_COUNT: 9,
  
  // 战斗回合限制
  MAX_BATTLE_ROUNDS: 50,
  
  // 灵根数量限制
  MAX_ROOT_SLOTS: 1,
  
  // 法宝数量限制
  MAX_ARTIFACT_SLOTS: 4
}

export default {
  ROOT_EFFICIENCY,
  ELEMENT_SYSTEM,
  GACHA_POOLS,
  ACHIEVEMENT_MILESTONES,
  GAME_CONSTANTS,
  calculateBreakthroughRate,
  calculateDamage,
  calculateElementBonus,
  calculateEnhanceRate,
  calculateSecretLandDifficulty,
  calculateAchievementPoints,
  calculateDailyLoginReward,
  calculateLevelExp,
  calculateLevel
}
