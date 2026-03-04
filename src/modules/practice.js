// 修炼功能模块

import { userData, saveUserData, addCultivation, addPracticeHours, addBreakthrough, addAdventure, addArtifact } from './userData.js';
import { realmData, adventureData, featureSystems } from '../data/realmData.js';

// 全局状态变量
let isMeditating = false;
let meditationSeconds = 0;
let meditationTimer = null;

// 开始修炼
export function startMeditation(elements) {
  if (isMeditating) return;
  isMeditating = true;
  meditationSeconds = 0;
  
  // 批量更新DOM
  elements.meditationStatus.textContent = '冥想中...';
  elements.meditationStatus.className = 'text-gold text-xs';
  elements.startMeditation.disabled = true;
  elements.stopMeditation.disabled = false;
  elements.stopMeditation.classList.remove('opacity-50');
  
  // 使用requestAnimationFrame优化动画
  let lastTime = Date.now();
  function updateTimer() {
    const now = Date.now();
    if (now - lastTime >= 1000) {
      meditationSeconds++;
      const h = Math.floor(meditationSeconds/3600), m = Math.floor((meditationSeconds%3600)/60), s = meditationSeconds%60;
      elements.meditationTimer.textContent = 
        String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
      lastTime = now;
    }
    if (isMeditating) {
      requestAnimationFrame(updateTimer);
    }
  }
  
  updateTimer();
}

// 停止修炼
export function stopMeditation(elements) {
  if (!isMeditating) return;
  isMeditating = false;
  elements.meditationStatus.textContent = '待机中';
  elements.meditationStatus.className = 'text-jade text-xs';
  elements.startMeditation.disabled = false;
  elements.stopMeditation.disabled = true;
  elements.stopMeditation.classList.add('opacity-50');

  const mins = Math.floor(meditationSeconds/60);
  userData.practiceHours += Math.floor(mins / 60);
  const cultivationGain = mins * 10;
  userData.cultivation += cultivationGain;
  
  // 检查是否突破境界
  const breakthrough = checkBreakthrough();
  
  saveUserData();
  
  // 显示修炼结果
  if (breakthrough) {
    return {
      type: 'breakthrough',
      message: `突破成功！恭喜你突破到${realmData[userData.realm].name}！`,
      cultivation: cultivationGain
    };
  } else if (mins > 0) {
    return {
      type: 'practice',
      message: `你打坐了${mins}分钟`,
      cultivation: cultivationGain
    };
  }
  return null;
}

// 检查境界突破
export function checkBreakthrough() {
  const currentRealm = realmData[userData.realm];
  const maxCultivation = 1000; // 每个境界需要1000修为
  
  if (userData.cultivation >= maxCultivation) {
    // 寻找下一个境界
    const realmKeys = Object.keys(realmData);
    const currentIndex = realmKeys.indexOf(userData.realm);
    
    if (currentIndex < realmKeys.length - 1) {
      userData.realm = realmKeys[currentIndex + 1];
      userData.cultivation -= maxCultivation;
      userData.breakthroughs++;
      // 随机触发奇遇
      if (Math.random() > 0.5) {
        setTimeout(triggerAdventure, 2000);
      }
      return true;
    }
  }
  return false;
}

// 显示突破效果
export function showBreakthroughEffect() {
  const effect = document.createElement('div');
  effect.style.position = 'fixed';
  effect.style.inset = '0';
  effect.style.background = 'radial-gradient(circle, rgba(212, 168, 83, 0.8), rgba(220, 20, 60, 0.6), transparent)';
  effect.style.zIndex = '9999';
  effect.style.display = 'flex';
  effect.style.alignItems = 'center';
  effect.style.justifyContent = 'center';
  effect.style.fontFamily = 'Ma Shan Zheng, cursive';
  effect.style.fontSize = '2rem';
  effect.style.color = '#d4a853';
  effect.style.textShadow = '0 0 20px rgba(212, 168, 83, 0.8)';
  effect.textContent = '境界突破！';
  effect.style.animation = 'glow 1s ease-in-out infinite';
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    effect.style.opacity = '0';
    effect.style.transition = 'opacity 1s ease';
    setTimeout(() => {
      document.body.removeChild(effect);
    }, 1000);
  }, 3000);
}

// 触发奇遇
export function triggerAdventure() {
  const randomAdventure = adventureData[Math.floor(Math.random() * adventureData.length)];
  userData.adventures.push(randomAdventure);
  saveUserData();
  
  // 增加修为值
  if (randomAdventure.reward.includes('修为+')) {
    const amount = parseInt(randomAdventure.reward.replace('修为+', ''));
    addCultivation(amount);
  }
  
  // 增加法宝
  if (randomAdventure.reward.includes('获得法宝：')) {
    const artifactName = randomAdventure.reward.replace('获得法宝：', '').toLowerCase().replace(/\s+/g, '-');
    addArtifact(artifactName);
  }
  
  return randomAdventure;
}

// 检查境界瓶颈
export function checkBottleneck() {
  const currentRealm = userData.realm;
  const bottleneck = featureSystems.bottleneck[currentRealm];
  
  if (bottleneck) {
    const requirementMet = userData.practiceHours >= parseInt(bottleneck.requirement.match(/\d+/)[0]);
    return {
      bottleneck: bottleneck,
      requirementMet: requirementMet,
      currentHours: userData.practiceHours
    };
  }
  return null;
}

// 探索秘境
export function exploreSecretLand(secretLandId) {
  const secretLand = featureSystems.secretLands[secretLandId];
  const realmRequirement = secretLand.requirement;
  
  // 检查境界是否满足要求
  const currentRealmIndex = Object.keys(realmData).indexOf(userData.realm);
  const requiredRealmIndex = Object.keys(realmData).findIndex(key => realmData[key].name === realmRequirement);
  
  if (currentRealmIndex >= requiredRealmIndex) {
    // 探索成功
    return {
      success: true,
      secretLand: secretLand
    };
  } else {
    // 境界不足
    return {
      success: false,
      requiredRealm: realmRequirement,
      currentRealm: realmData[userData.realm].name
    };
  }
}

// 创建传承
export function createHeritage(name, desc) {
  const heritage = {
    id: Date.now(),
    name: name,
    desc: desc,
    creator: 'Player',
    creationTime: new Date().toLocaleString()
  };
  
  featureSystems.heritage.push(heritage);
  saveUserData();
  return heritage;
}

// 使用法宝
export function useArtifact(artifactId) {
  const artifact = featureSystems.artifacts[artifactId];
  if (!userData.artifacts.includes(artifactId)) {
    return {
      success: false,
      message: '你还没有获得此法宝'
    };
  }
  
  return {
    success: true,
    artifact: artifact
  };
}

// 灵根测试
export function startRootTest() {
  return {
    elements: [
      { color: 'jade', name: '木灵根', desc: '木主生发，修行木系功法事半功倍' },
      { color: 'vermilion', name: '火灵根', desc: '火主炽热，修行火系功法事半功倍' },
      { color: 'paper', name: '金灵根', desc: '金主锋锐，修行金系功法事半功倍' },
      { color: 'spirit', name: '水灵根', desc: '水主柔韧，修行水系功法事半功倍' },
      { color: 'gold', name: '土灵根', desc: '土主厚重，修行土系功法事半功倍' },
      { color: 'azure', name: '五行灵根', desc: '五行均衡，修行任何功法皆可' }
    ]
  };
}