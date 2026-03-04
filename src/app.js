// 主应用入口文件

import { initUserData, userData, saveUserData, chooseSect as chooseSectData, addCultivation, addChapterRead } from './modules/userData.js';
import { startMeditation, stopMeditation, checkBreakthrough, showBreakthroughEffect, triggerAdventure, checkBottleneck, exploreSecretLand, createHeritage, useArtifact, startRootTest } from './modules/practice.js';
import { initElementCache, showPage, showModal, closeModal, toggleMobileMenu, showRealmDetail, showOrganModal, showRealmInfo, showTechniqueTab, showTechniqueDetail, showAlchemyTab, generateHealth, generateLegend, generateTasks, generateLog, generateMemory, loadWisdom, showPigTab, showSecretLands, showArtifacts, showHeritages, showCreateHeritageForm, showWorldviewInfo, updateStatPanel, dailyQuote, getElements } from './modules/ui.js';
import { generateNPC, generateNPCs, generateSecretLand, generateSecretLands } from './modules/randomGeneration.js';
import { showEnglishPage, showEnglishTab, toggleLanguage as toggleEnglishLanguage, loadLanguageContent as loadEnglishLanguageContent } from './modules/english.js';
import { sectData, featureSystems } from './data/realmData.js';

// 初始化应用
function initApp() {
  // 初始化元素缓存
  initElementCache();
  
  // 初始化用户数据
  initUserData();
  
  // 更新修炼数据统计面板
  updateStatPanel();
  
  // 设置导航事件监听器
  setupNavListeners();
  
  // 显示首页
  showPage('home');
  
  // 初始化性能监控
  initPerformanceMonitoring();
}

// 设置导航事件监听器
function setupNavListeners() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const text = this.textContent.trim();
      const pageMap = {'首页':'home','境界体系':'realm','功法秘籍':'technique','丹药宝典':'alchemy','养生之道':'health','神仙列传':'legend','修行中心':'practice','试炼场':'trial','修仙资讯':'news','修仙社区':'community','修仙工具':'tools','猪蹄文化':'pig'};
      if (pageMap[text]) {
        showPage(pageMap[text]);
      }
    });
  });
}

// 性能监控
function initPerformanceMonitoring() {
  // Log initial load performance
  if (performance && performance.timing) {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('Initial page load time:', loadTime, 'ms');
  }

  // Add user timing marks for page transitions
  window.addEventListener('click', function(e) {
    if (e.target.closest('.nav-link')) {
      performance.mark('pageTransitionStart');
    }
  });

  // Add performance logging for page load completion
  document.addEventListener('DOMContentLoaded', function() {
    performance.mark('domContentLoaded');
    console.log('DOM Content Loaded:', performance.now(), 'ms');
  });
}

// 全局暴露函数
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.showModal = showModal;
window.closeModal = closeModal;
window.showRealmDetail = showRealmDetail;
window.showOrganModal = showOrganModal;
window.showRealmInfo = showRealmInfo;
window.showTechniqueTab = showTechniqueTab;
window.showTechniqueDetail = showTechniqueDetail;
window.showAlchemyTab = showAlchemyTab;
window.showPigTab = showPigTab;
window.showSecretLands = showSecretLands;
window.showArtifacts = showArtifacts;
window.showHeritages = showHeritages;
window.showCreateHeritageForm = showCreateHeritageForm;
window.showWorldviewInfo = showWorldviewInfo;
window.dailyQuote = dailyQuote;
window.loadLanguageContent = loadLanguageContent;

// 随机生成功能
window.generateNPC = function() {
  const npc = generateNPC();
  showModal('随机NPC', `
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-user text-gold text-2xl"></i>
        </div>
        <div>
          <h3 class="font-brush text-xl text-gold">${npc.name}</h3>
          <p class="text-paper/60">${npc.description}</p>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">职业：</span>${npc.profession}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">境界：</span>${npc.realm}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">年龄：</span>${npc.age}岁</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">性格：</span>${npc.personality}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">技能：</span>${npc.skills.join('、')}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">问候：</span>${npc.dialogues.greeting}</div>
    </div>
  `);
};

window.generateSecretLand = function() {
  const secretLand = generateSecretLand();
  showModal('随机秘境', `
    <div class="space-y-3">
      <h3 class="font-brush text-xl text-gold">${secretLand.name}</h3>
      <p class="text-paper/60">${secretLand.description}</p>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">类型：</span>${secretLand.type}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">等级：</span>${secretLand.level}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">需求境界：</span>${secretLand.reqRealm}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">危险等级：</span>${secretLand.dangerLevel}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">特色：</span>${secretLand.features.join('、')}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">奖励：</span>${secretLand.rewards.join('、')}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">进入条件：</span>${secretLand.entranceCondition.join('；')}</div>
      <div class="p-3 rounded-lg bg-ink/30">
        <span class="text-gold">守关BOSS：</span>
        <div class="mt-2">${secretLand.boss.name}（${secretLand.boss.profession}，${secretLand.boss.realm}）</div>
      </div>
    </div>
  `);
};

// 修炼相关函数
window.startMeditation = function() {
  const elements = getElements();
  startMeditation(elements);
};

window.stopMeditation = function() {
  const elements = getElements();
  const result = stopMeditation(elements);
  if (result) {
    if (result.type === 'breakthrough') {
      showModal('修炼突破', `
        <div class="text-center">
          <h3 class="font-brush text-xl text-gold mb-2">突破成功！</h3>
          <p class="text-paper/60 mb-3">${result.message}</p>
          <p class="text-jade">获得修为：+${result.cultivation}</p>
        </div>
      `);
      showBreakthroughEffect();
    } else if (result.type === 'practice') {
      showModal('修炼完成', `
        <div class="text-center">
          <h3 class="font-brush text-xl text-gold mb-2">修炼完成</h3>
          <p class="text-paper/60 mb-3">${result.message}</p>
          <p class="text-jade">获得修为：+${result.cultivation}</p>
        </div>
      `);
    }
    updateStatPanel();
  }
};

// 门派选择
window.chooseSect = function(sectId) {
  const sect = chooseSectData(sectId, sectData);
  updateStatPanel();
  showModal('门派选择', `
    <div class="text-center">
      <h4 class="font-brush text-lg text-gold mb-2">${sect.name}</h4>
      <p class="text-paper/60 mb-3">${sect.desc}</p>
      <p class="text-jade">${sect.bonus}</p>
    </div>
  `);
};

// 灵根测试
window.startRootTest = function() {
  const result = startRootTest();
  showModal('灵根测试', `
    <div class="space-y-4">
      <p class="text-paper/60 text-sm">选择与你最契合的元素</p>
      <div class="grid grid-cols-2 gap-3">
        ${result.elements.map(el => `
          <button onclick="showRootResult('${el.color}','${el.name}','${el.desc}')" class="p-4 rounded-xl border border-${el.color}/30 hover:bg-${el.color}/10">
            <i class="fas ${el.icon || 'fa-yin-yang'} text-${el.color} text-xl"></i>
            <div class="text-paper">${el.name.split('灵根')[0]}</div>
          </button>
        `).join('')}
      </div>
    </div>
  `);
};

window.showRootResult = function(color, name, desc) {
  showModal('测试结果', `
    <div class="text-center">
      <div class="w-16 h-16 mx-auto rounded-full bg-${color}/20 flex items-center justify-center mb-4">
        <i class="fas fa-yin-yang text-${color} text-2xl"></i>
      </div>
      <h3 class="font-brush text-xl text-paper mb-2">${name}</h3>
      <p class="text-paper/60">${desc}</p>
    </div>
  `);
};

// 检查境界瓶颈
window.checkBottleneck = function() {
  const result = checkBottleneck();
  if (result) {
    if (!result.requirementMet) {
      showModal('境界瓶颈', `
        <div class="space-y-3">
          <p class="text-paper/70">你当前遇到了境界瓶颈，需要完成以下任务才能突破：</p>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">任务：</span>${result.bottleneck.task}</div>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">要求：</span>${result.bottleneck.requirement}</div>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-jade">当前进度：</span>${result.currentHours}小时</div>
        </div>
      `);
    } else {
      showModal('境界瓶颈', `
        <div class="space-y-3">
          <p class="text-paper/70">恭喜你！你已完成瓶颈任务，可以突破到下一境界了！</p>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">任务：</span>${result.bottleneck.task}</div>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-jade">完成状态：</span>已完成</div>
          <p class="text-gold">继续修炼，积累修为即可突破境界！</p>
        </div>
      `);
    }
  }
};

// 探索秘境
window.exploreSecretLand = function(secretLandId) {
  const result = exploreSecretLand(secretLandId);
  if (result.success) {
    const rewards = result.secretLand.rewards.join('、');
    showModal('秘境探索', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">${result.secretLand.name}</h3>
        <p class="text-paper/60 mb-3">${result.secretLand.desc}</p>
        <p class="text-gold mb-3">探索成功！</p>
        <p class="text-paper">获得奖励：${rewards}</p>
      </div>
    `);
  } else {
    showModal('秘境探索', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">境界不足</h3>
        <p class="text-paper/60 mb-3">你需要达到${result.requiredRealm}境界才能进入此秘境</p>
        <p class="text-paper">当前境界：${result.currentRealm}</p>
      </div>
    `);
  }
};

// 创建传承
window.createHeritage = function(name, desc) {
  if (!name || !desc) {
    showModal('创建传承', `
      <div class="text-center">
        <p class="text-paper/60 mb-4">请填写传承名称和描述</p>
      </div>
    `);
    return;
  }
  const heritage = createHeritage(name, desc);
  showModal('传承创建', `
    <div class="text-center">
      <h3 class="font-brush text-xl text-gold mb-2">传承创建成功</h3>
      <p class="text-paper/60 mb-3">你的传承已成功创建，将被其他修行者学习</p>
      <p class="text-paper">传承名称：${heritage.name}</p>
    </div>
  `);
};

// 使用法宝
window.useArtifact = function(artifactId) {
  const result = useArtifact(artifactId);
  if (result.success) {
    showModal('法宝使用', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">${result.artifact.name}</h3>
        <p class="text-paper/60 mb-3">${result.artifact.desc}</p>
        <p class="text-gold mb-3">效果：${result.artifact.effect}</p>
        <p class="text-paper/40">稀有度：${result.artifact.rarity}</p>
      </div>
    `);
  } else {
    showModal('法宝使用', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">法宝未获得</h3>
        <p class="text-paper/60">${result.message}</p>
      </div>
    `);
  }
};

// 反应游戏
let reactionGameInterval = null;
let reactionCount = 0;
let reactionTimes = [];

window.startReactionGame = function() {
  const elements = getElements();
  elements.reactionStatus.textContent = '准备开始...';
  elements.reactionCount.textContent = '0';
  elements.avgReaction.textContent = '--';
  elements.reactionRank.textContent = '未测试';
  elements.startReaction.disabled = true;
  elements.stopReaction.disabled = false;
  elements.stopReaction.classList.remove('opacity-50');
  
  reactionCount = 0;
  reactionTimes = [];
  
  setTimeout(() => {
    elements.reactionStatus.textContent = '点击出现的目标！';
    startReactionTarget();
  }, 2000);
};

function startReactionTarget() {
  const elements = getElements();
  const gameArea = elements.reactionGame;
  const target = elements.reactionTarget;
  
  // 随机位置
  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  
  target.style.left = x + 'px';
  target.style.top = y + 'px';
  target.style.display = 'block';
  
  const startTime = Date.now();
  
  target.onclick = function() {
    const endTime = Date.now();
    const reactionTime = endTime - startTime;
    reactionTimes.push(reactionTime);
    reactionCount++;
    
    elements.reactionCount.textContent = reactionCount;
    
    // 计算平均反应时间
    if (reactionTimes.length > 0) {
      const avgTime = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
      elements.avgReaction.textContent = avgTime + 'ms';
      
      // 评级
      let rank;
      if (avgTime < 200) rank = '神识敏锐';
      else if (avgTime < 400) rank = '反应迅速';
      else if (avgTime < 600) rank = '反应正常';
      else rank = '反应迟缓';
      elements.reactionRank.textContent = rank;
    }
    
    target.style.display = 'none';
    
    // 随机延迟后显示下一个目标
    setTimeout(startReactionTarget, Math.random() * 1000 + 500);
  };
}

window.stopReactionGame = function() {
  const elements = getElements();
  elements.reactionStatus.textContent = '测试完成';
  elements.startReaction.disabled = false;
  elements.stopReaction.disabled = true;
  elements.stopReaction.classList.add('opacity-50');
  
  const target = elements.reactionTarget;
  target.style.display = 'none';
  target.onclick = null;
};

// 定力游戏
let focusGameInterval = null;
let focusTime = 0;
let focusBest = 0;

window.startFocusGame = function() {
  const elements = getElements();
  elements.focusTime.textContent = '0秒';
  elements.startFocus.disabled = true;
  elements.stopFocus.disabled = false;
  elements.stopFocus.classList.remove('opacity-50');
  
  focusTime = 0;
  
  // 开始计时
  focusGameInterval = setInterval(() => {
    focusTime++;
    elements.focusTime.textContent = focusTime + '秒';
  }, 1000);
  
  // 生成干扰元素
  generateDistractions();
};

function generateDistractions() {
  const elements = getElements();
  const distractions = elements.focusDistractions;
  
  setInterval(() => {
    const distraction = document.createElement('div');
    distraction.style.position = 'absolute';
    distraction.style.width = '30px';
    distraction.style.height = '30px';
    distraction.style.borderRadius = '50%';
    distraction.style.background = 'rgba(212, 168, 83, 0.5)';
    distraction.style.boxShadow = '0 0 10px rgba(212, 168, 83, 0.8)';
    distraction.style.left = Math.random() * 100 + '%';
    distraction.style.top = Math.random() * 100 + '%';
    distraction.style.animation = 'float 2s ease-in-out infinite';
    
    distractions.appendChild(distraction);
    
    // 2秒后移除
    setTimeout(() => {
      if (distraction.parentNode) {
        distraction.parentNode.removeChild(distraction);
      }
    }, 2000);
  }, 1000);
}

window.stopFocusGame = function() {
  const elements = getElements();
  elements.startFocus.disabled = false;
  elements.stopFocus.disabled = true;
  elements.stopFocus.classList.add('opacity-50');
  
  clearInterval(focusGameInterval);
  
  // 更新最高记录
  if (focusTime > focusBest) {
    focusBest = focusTime;
    elements.focusBest.textContent = focusBest + '秒';
  }
  
  // 评级
  let rank;
  if (focusTime > 60) rank = '定力如磐';
  else if (focusTime > 30) rank = '心无旁骛';
  else if (focusTime > 10) rank = '聚精会神';
  else rank = '心浮气躁';
  elements.focusRank.textContent = rank;
};

// 记忆游戏
let memoryGameSequence = [];
let memoryPlayerSequence = [];
let memoryLevel = 1;
let memoryBest = 0;
let memoryShowing = false;

window.startMemoryGame = function() {
  const elements = getElements();
  elements.memoryLevel.textContent = '1';
  elements.memoryBest.textContent = memoryBest;
  elements.memoryRank.textContent = '未测试';
  elements.startMemory.disabled = true;
  elements.stopMemory.disabled = false;
  elements.stopMemory.classList.remove('opacity-50');
  
  memoryLevel = 1;
  memoryGameSequence = [];
  memoryPlayerSequence = [];
  
  startMemoryLevel();
};

function startMemoryLevel() {
  const elements = getElements();
  elements.memoryLevel.textContent = memoryLevel;
  
  // 生成新的序列
  const randomCell = Math.floor(Math.random() * 16);
  memoryGameSequence.push(randomCell);
  
  // 显示序列
  showMemorySequence();
}

function showMemorySequence() {
  const elements = getElements();
  const cells = elements.memoryGame.querySelectorAll('.memory-cell');
  memoryShowing = true;
  
  memoryGameSequence.forEach((index, i) => {
    setTimeout(() => {
      const cell = cells[index];
      cell.style.background = 'rgba(212, 168, 83, 0.5)';
      cell.style.borderColor = 'rgba(212, 168, 83, 0.8)';
      
      setTimeout(() => {
        cell.style.background = 'rgba(10, 14, 20, 0.3)';
        cell.style.borderColor = 'rgba(90, 126, 122, 0.2)';
        
        // 最后一个单元格显示完毕后，开始玩家输入
        if (i === memoryGameSequence.length - 1) {
          setTimeout(() => {
            memoryShowing = false;
            memoryPlayerSequence = [];
          }, 500);
        }
      }, 500);
    }, i * 800);
  });
}

window.stopMemoryGame = function() {
  const elements = getElements();
  elements.startMemory.disabled = false;
  elements.stopMemory.disabled = true;
  elements.stopMemory.classList.add('opacity-50');
  
  // 评级
  let rank;
  if (memoryLevel > 10) rank = '过目不忘';
  else if (memoryLevel > 7) rank = '记忆超群';
  else if (memoryLevel > 4) rank = '记忆力佳';
  else rank = '记忆力一般';
  elements.memoryRank.textContent = rank;
  
  // 更新最高记录
  if (memoryLevel > memoryBest) {
    memoryBest = memoryLevel;
    elements.memoryBest.textContent = memoryBest;
  }
};

// 悟性问答
const wisdomQuestions = [
  {
    question: '道可道，非常道；名可名，非常名。出自哪部经典？',
    options: ['《论语》', '《道德经》', '《庄子》', '《易经》'],
    answer: 1
  },
  {
    question: '以下哪位是道教的创始人？',
    options: ['孔子', '老子', '庄子', '列子'],
    answer: 1
  },
  {
    question: '修仙的最高境界是什么？',
    options: ['金丹期', '元婴期', '化神期', '传说境界'],
    answer: 3
  },
  {
    question: '五行相生相克中，木克什么？',
    options: ['火', '土', '金', '水'],
    answer: 1
  },
  {
    question: '以下哪种不是修仙的基本要素？',
    options: ['灵根', '功法', '丹药', '金钱'],
    answer: 3
  }
];

let wisdomCurrentQuestion = 0;
let wisdomCorrectCount = 0;
let wisdomTotalCount = 0;

window.answerWisdom = function(ans) {
  const question = wisdomQuestions[wisdomCurrentQuestion];
  const elements = getElements();
  
  wisdomTotalCount++;
  if (ans === question.answer) {
    wisdomCorrectCount++;
  }
  
  // 更新统计
  elements.wisdomCount.textContent = wisdomTotalCount;
  const correctRate = Math.round((wisdomCorrectCount / wisdomTotalCount) * 100);
  elements.wisdomCorrect.textContent = correctRate + '%';
  
  // 评级
  let rank;
  if (correctRate === 100) rank = '悟性通神';
  else if (correctRate >= 80) rank = '悟性超凡';
  else if (correctRate >= 60) rank = '悟性良好';
  else rank = '悟性一般';
  elements.wisdomRank.textContent = rank;
  
  // 加载下一题
  wisdomCurrentQuestion++;
  if (wisdomCurrentQuestion >= wisdomQuestions.length) {
    wisdomCurrentQuestion = 0;
  }
  
  // 更新问题
  const nextQuestion = wisdomQuestions[wisdomCurrentQuestion];
  elements.wisdomQuestion.textContent = nextQuestion.question;
  
  let optionsHtml = '';
  nextQuestion.options.forEach((option, index) => {
    optionsHtml += `
      <button class="w-full p-3 rounded-lg bg-ink/30 border border-paper/20 text-left hover:border-gold/30" onclick="answerWisdom(${index})">
        ${option}
      </button>
    `;
  });
  
  elements.wisdomOptions.innerHTML = optionsHtml;
};

// 语言切换
window.toggleLanguage = function() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
  document.documentElement.lang = newLang;
  document.getElementById('langToggle').textContent = newLang === 'zh-CN' ? 'EN' : '中文';
  loadLanguageContent(newLang);
};

// 英语学习相关函数
window.showEnglishPage = showEnglishPage;
window.showEnglishTab = showEnglishTab;
window.toggleLanguage = toggleEnglishLanguage;
window.loadLanguageContent = loadEnglishLanguageContent;

// 初始化应用
initApp();