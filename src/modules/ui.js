// UI管理模块

import { realmData, organData, pigData, techniqueData, alchemyData, healthData, legendData, sectData, featureSystems, langData, quotesData } from '../data/realmData.js';
import { userData } from './userData.js';
import { createFragment, appendElements, debounce, throttle, lazyLoad, batchUpdate, delegateEvent, measureTime } from '../utils/performance.js';

// DOM元素缓存
const elements = {};
const pageElements = {};
const navLinkElements = [];

// 初始化元素缓存
export function initElementCache() {
  // 缓存页面元素
  document.querySelectorAll('.page').forEach(page => {
    pageElements[page.id] = page;
  });
  
  // 缓存导航链接
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkElements.push(link);
  });
  
  // 缓存其他元素
  elements.modal = document.getElementById('modal');
  elements.modalContent = document.getElementById('modalContent');
  elements.mobileNav = document.getElementById('mobileNav');
  elements.realmList = document.getElementById('realmList');
  elements.techniqueContent = document.getElementById('techniqueContent');
  elements.alchemyContent = document.getElementById('alchemyContent');
  elements.healthContent = document.getElementById('healthContent');
  elements.legendList = document.getElementById('legendList');
  elements.dailyTasks = document.getElementById('dailyTasks');
  elements.practiceLog = document.getElementById('practiceLog');
  elements.reactionGame = document.getElementById('reactionGame');
  elements.reactionTarget = document.getElementById('reactionTarget');
  elements.reactionStatus = document.getElementById('reactionStatus');
  elements.reactionCount = document.getElementById('reactionCount');
  elements.avgReaction = document.getElementById('avgReaction');
  elements.reactionRank = document.getElementById('reactionRank');
  elements.focusGame = document.getElementById('focusGame');
  elements.focusTarget = document.getElementById('focusTarget');
  elements.focusDistractions = document.getElementById('focusDistractions');
  elements.focusTime = document.getElementById('focusTime');
  elements.focusBest = document.getElementById('focusBest');
  elements.focusRank = document.getElementById('focusRank');
  elements.memoryGame = document.getElementById('memoryGame');
  elements.memoryLevel = document.getElementById('memoryLevel');
  elements.memoryBest = document.getElementById('memoryBest');
  elements.memoryRank = document.getElementById('memoryRank');
  elements.wisdomQuestion = document.getElementById('wisdomQuestion');
  elements.wisdomOptions = document.getElementById('wisdomOptions');
  elements.wisdomCount = document.getElementById('wisdomCount');
  elements.wisdomCorrect = document.getElementById('wisdomCorrect');
  elements.wisdomRank = document.getElementById('wisdomRank');
  elements.meditationStatus = document.getElementById('meditationStatus');
  elements.meditationTimer = document.getElementById('meditationTimer');
  elements.startMeditation = document.getElementById('startMeditation');
  elements.stopMeditation = document.getElementById('stopMeditation');
  elements.progressText = document.getElementById('progressText');
  elements.progressBar = document.getElementById('progressBar');
  elements.breakthroughs = document.getElementById('breakthroughs');
  elements.pigContent = document.getElementById('pigContent');
  // 修炼数据统计面板元素
  elements.statRealm = document.getElementById('statRealm');
  elements.statRealmLevel = document.getElementById('statRealmLevel');
  elements.statCultivation = document.getElementById('statCultivation');
  elements.statCultivationBar = document.getElementById('statCultivationBar');
  elements.statChapters = document.getElementById('statChapters');
  elements.statSect = document.getElementById('statSect');
}

// 页面切换
export function showPage(pageId) {
  const page = pageElements['page-' + pageId];
  
  // 使用batchUpdate批量更新DOM，减少重排
  batchUpdate(() => {
    // 移除所有页面的活动状态
    Object.values(pageElements).forEach(p => {
      p.classList.remove('active');
      p.style.opacity = '0';
      p.style.transform = 'translateY(20px)';
    });
    
    // 移除所有导航链接的活动状态
    navLinkElements.forEach(n => n.classList.remove('active'));
    
    // 激活当前页面
    if (page) {
      // 添加墨痕扩散效果
      createInkEffect();
      
      // 延迟显示页面，让墨痕效果先播放
      setTimeout(() => {
        batchUpdate(() => {
          page.style.opacity = '1';
          page.style.transform = 'translateY(0)';
          page.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          page.classList.add('active');
          
          // 为页面内元素添加滚动动画
          setTimeout(() => {
            const pageElements = page.querySelectorAll('.glass-card, h2, p, button');
            // 批量添加动画，减少重排
            pageElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade');
              }, index * 30); // 减少延迟，提高性能
            });
          }, 30); // 减少延迟，提高性能
        });
      }, 150); // 减少延迟，提高性能
    }
    
    // 激活当前导航链接
    const pageName = getPageName(pageId);
    navLinkElements.forEach(n => {
      if (n.textContent.includes(pageName)) n.classList.add('active');
    });
  });
  
  window.scrollTo(0, 0);

  // Lazy load page content
  if (page && !page.dataset.loaded) {
    // 使用measureTime测量页面内容加载时间
    measureTime(() => {
      switch(pageId) {
        case 'realm':
          generateRealmList();
          break;
        case 'technique':
          showTechniqueTab('basic');
          break;
        case 'alchemy':
          showAlchemyTab('dans');
          break;
        case 'health':
          generateHealth();
          break;
        case 'legend':
          generateLegend();
          break;
        case 'practice':
          generateTasks();
          generateLog();
          break;
        case 'trial':
          generateMemory();
          loadWisdom();
          break;
        case 'news':
          generateNews();
          break;
        case 'community':
          generateCommunity();
          break;
        case 'tools':
          generateTools();
          break;
        case 'pig':
          showPigTab('history');
          break;
        case 'english':
          // 英语学习页面由专门的模块处理
          break;
      }
      page.dataset.loaded = 'true';
    }, `Loading ${pageId} page`);
  }
}

// 创建墨痕扩散效果
export function createInkEffect() {
  const ink = document.createElement('div');
  ink.style.position = 'fixed';
  ink.style.top = '50%';
  ink.style.left = '50%';
  ink.style.width = '0';
  ink.style.height = '0';
  ink.style.borderRadius = '50%';
  ink.style.background = 'radial-gradient(circle, rgba(212, 168, 83, 0.3), rgba(220, 20, 60, 0.1), transparent)';
  ink.style.transform = 'translate(-50%, -50%)';
  ink.style.zIndex = '9999';
  ink.style.pointerEvents = 'none';
  ink.style.animation = 'inkSpread 0.6s ease-out forwards';
  
  document.body.appendChild(ink);
  
  setTimeout(() => {
    document.body.removeChild(ink);
  }, 600);
}

// 获取页面名称
function getPageName(id) {
  const names = {home:'首页',realm:'境界体系',technique:'功法秘籍',alchemy:'丹药宝典',health:'养生之道',legend:'神仙列传',practice:'修行中心',trial:'试炼场',pig:'猪蹄文化'};
  return names[id] || '';
}

// 显示弹窗
export function showModal(title, content) {
  elements.modalContent.innerHTML = `<h3 class="font-brush text-xl text-paper mb-4">${title}</h3>${content}<button class="btn-jade w-full mt-4" onclick="closeModal()">关闭</button>`;
  elements.modal.classList.add('show');
}

// 关闭弹窗
export function closeModal() {
  elements.modal.classList.remove('show');
}

// 切换移动端菜单
export function toggleMobileMenu() {
  elements.mobileNav.classList.toggle('hidden');
}

// 生成境界列表
export function generateRealmList() {
  const fragment = createFragment();
  
  for (const [k, d] of Object.entries(realmData)) {
    const card = document.createElement('div');
    card.className = 'glass-card p-4 cursor-pointer';
    card.onclick = () => showRealmDetail(k);
    card.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-${d.color}/20 flex items-center justify-center border border-${d.color}/30">
          <span class="font-brush text-xl text-${d.color}">${d.icon}</span>
        </div>
        <div class="flex-grow">
          <h3 class="font-brush text-lg text-paper">${d.name}</h3>
          <p class="text-paper/60 text-sm">${d.desc}</p>
        </div>
        <div class="text-right">
          <div class="text-paper/50 text-xs">寿元</div>
          <div class="text-gold font-brush">${d.lifespan}</div>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  // 清空容器并添加片段
  elements.realmList.innerHTML = '';
  elements.realmList.appendChild(fragment);
}

// 显示境界详情
export function showRealmDetail(k) {
  const d = realmData[k];
  showModal(d.name, `
    <div class="space-y-3">
      <p class="text-paper/70">${d.desc}</p>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">寿元：</span>${d.lifespan}</div>
      <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">下一境界：</span>${d.next}</div>
      <div><span class="text-gold">境界阶段：</span><ul class="mt-2 space-y-1">${d.stages.map(s => `<li class="text-paper/60 text-sm">• ${s}</li>`).join('')}</ul></div>
      <div><span class="text-gold">能力：</span><div class="flex flex-wrap gap-2 mt-2">${d.abilities.map(a => `<span class="px-2 py-1 rounded-full bg-${d.color}/20 text-${d.color} text-xs">${a}</span>`).join('')}</div></div>
    </div>
  `);
}

// 显示器官弹窗
export function showOrganModal(k) {
  const d = organData[k];
  showModal(d.name + '·' + d.element + '行', `
    <div class="space-y-3">
      <p class="text-paper/70">${d.desc}</p>
      <p class="text-sm"><span class="text-jade">对应境界：</span>${d.realm}</p>
      <p class="text-sm"><span class="text-gold">修炼之法：</span>${d.practice}</p>
    </div>
  `);
}

// 显示境界信息
export function showRealmInfo() {
  showRealmDetail('chu kui');
}

// 显示功法标签
export function showTechniqueTab(tab) {
  document.querySelectorAll('#page-technique button').forEach(b => {
    b.classList.remove('bg-gold/10', 'border-gold/30', 'text-gold');
    b.classList.add('border-paper/20', 'text-paper/60');
  });
  
  if (event.target) {
    event.target.classList.add('bg-gold/10', 'border-gold/30', 'text-gold');
    event.target.classList.remove('border-paper/20', 'text-paper/60');
  }

  const data = techniqueData[tab];
  let html = '<div class="grid md:grid-cols-2 gap-4">' + data.map(t => `
    <div class="glass-card p-4 cursor-pointer" onclick="showTechniqueDetail('${t.name}','${t.icon}','${t.color}','${t.desc}','${t.mantra}')">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg bg-${t.color}/20 flex items-center justify-center">
          <i class="fas ${t.icon} text-${t.color}"></i>
        </div>
        <div>
          <h4 class="font-brush text-paper">${t.name}</h4>
        </div>
      </div>
      <p class="text-paper/60 text-sm">${t.desc}</p>
    </div>
  `).join('') + '</div>';
  elements.techniqueContent.innerHTML = html;
}

// 显示功法详情
export function showTechniqueDetail(name, icon, color, desc, mantra) {
  showModal(name, `
    <div class="space-y-3">
      <p class="text-paper/70">${desc}</p>
      <div class="p-3 rounded-lg bg-ink/30">
        <h4 class="text-gold text-sm mb-2">功法口诀</h4>
        <p class="text-paper/60">${mantra}</p>
      </div>
    </div>
  `);
}

// 显示丹药标签
export function showAlchemyTab(tab) {
  document.querySelectorAll('#page-alchemy button').forEach(b => {
    b.classList.remove('bg-gold/10', 'border-gold/30', 'text-gold');
    b.classList.add('border-paper/20', 'text-paper/60');
  });
  
  if (event.target) {
    event.target.classList.add('bg-gold/10', 'border-gold/30', 'text-gold');
    event.target.classList.remove('border-paper/20', 'text-paper/60');
  }

  let html = '';
  if (tab === 'dans') {
    html = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">' + alchemyData.dans.map(d => `
      <div class="glass-card p-4">
        <div class="flex items-center gap-2 mb-2">
          <i class="fas fa-circle text-${d.color}"></i>
          <h4 class="font-brush text-paper">${d.name}</h4>
        </div>
        <p class="text-paper/60 text-sm mb-2">${d.desc}</p>
        <div class="text-xs text-paper/40">${d.grade} | ${d.price}</div>
      </div>
    `).join('') + '</div>';
  } else if (tab === 'herbs') {
    html = '<div class="grid md:grid-cols-2 gap-4">' + alchemyData.herbs.map(h => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-${h.color}">${h.name}</h4>
        <p class="text-paper/60 text-sm">${h.desc}</p>
      </div>
    `).join('') + '</div>';
  } else {
    html = '<div class="space-y-3">' + alchemyData.formulas.map(f => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-${f.color} mb-2">${f.name}</h4>
        <p class="text-paper/50 text-xs mb-2">材料：${f.materials}</p>
        <p class="text-paper/60 text-sm">${f.method}</p>
      </div>
    `).join('') + '</div>';
  }
  elements.alchemyContent.innerHTML = html;
}

// 生成养生内容
export function generateHealth() {
  elements.healthContent.innerHTML = healthData.map(h => `
    <div class="glass-card p-5 mb-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-${h.color}/20 flex items-center justify-center flex-shrink-0">
          <i class="fas ${h.icon} text-${h.color}"></i>
        </div>
        <div>
          <h3 class="font-brush text-lg text-paper mb-2">${h.title}</h3>
          <p class="text-paper/60 text-sm mb-3">${h.desc}</p>
          <div class="grid md:grid-cols-2 gap-2 mb-3">
            <div class="p-2 rounded bg-ink/30"><span class="text-jade text-xs">玄学：</span><span class="text-paper/50 text-xs">${h.xuanxue}</span></div>
            <div class="p-2 rounded bg-ink/30"><span class="text-gold text-xs">科学：</span><span class="text-paper/50 text-xs">${h.science}</span></div>
          </div>
          <div class="text-xs text-paper/50">${h.tips.map(t => '•' + t).join(' ')}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// 生成神仙列传
export function generateLegend() {
  elements.legendList.innerHTML = legendData.map(l => `
    <div class="glass-card p-5">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-${l.color}/20 flex items-center justify-center">
          <span class="font-brush text-xl text-${l.color}">${l.icon}</span>
        </div>
        <div>
          <h3 class="font-brush text-lg text-paper">${l.name}</h3>
          <p class="text-${l.color} text-xs mb-2">${l.title}</p>
          <p class="text-paper/60 text-xs mb-2">${l.desc}</p>
          <div class="p-2 rounded bg-ink/30"><span class="text-paper/50 text-xs">「${l.quote}」</span></div>
        </div>
      </div>
    </div>
  `).join('');
}

// 生成每日任务
export function generateTasks() {
  const tasks = [{n:'晨间吐纳',d:true},{n:'午时炼气',d:false},{n:'子时冥想',d:false}];
  elements.dailyTasks.innerHTML = tasks.map(t => `
    <div class="flex justify-between p-2 rounded bg-ink/30 text-xs">
      <span><i class="fas ${t.d?'fa-check-circle text-jade':'fa-circle text-paper/20'} mr-1"></i>${t.n}</span>
      <span class="${t.d?'text-jade':'text-paper/40'}">${t.d?'完成':'待完成'}</span>
    </div>
  `).join('');
}

// 生成修行记录
export function generateLog() {
  const logs = [{t:'今日',c:'完成吐纳'},{t:'昨日',c:'修炼引气诀'}];
  elements.practiceLog.innerHTML = logs.map(l => `
    <div class="text-xs p-2 rounded bg-ink/20">
      <div class="text-paper/70">${l.c}</div>
      <div class="text-paper/30">${l.t}</div>
    </div>
  `).join('');
}

// 生成记忆游戏
export function generateMemory() {
  let html = '';
  for (let i = 0; i < 16; i++) {
    html += `<div class="memory-cell w-12 h-12 rounded-lg bg-ink/30 border border-jade/20 flex items-center justify-center cursor-pointer hover:bg-jade/10" data-index="${i}"></div>`;
  }
  elements.memoryGame.innerHTML = html;
  document.querySelectorAll('.memory-cell').forEach(cell => {
    cell.onclick = () => memoryClick(cell);
  });
}

// 记忆游戏点击
export function memoryClick(cell) {
  // 实现记忆游戏逻辑
}

// 加载悟性问答
export function loadWisdom() {
  // 实现悟性问答逻辑
}

// 生成新闻
export function generateNews() {
  // 实现新闻生成逻辑
}

// 生成社区内容
export function generateCommunity() {
  // 实现社区内容生成逻辑
}

// 生成工具列表
export function generateTools() {
  // 实现工具列表生成逻辑
}

// 显示猪蹄文化标签
export function showPigTab(tab) {
  document.querySelectorAll('#page-pig button').forEach(b => {
    b.classList.remove('bg-gold/10', 'border-gold/30', 'text-gold');
    b.classList.add('border-paper/20', 'text-paper/60');
  });
  
  if (event.target) {
    event.target.classList.add('bg-gold/10', 'border-gold/30', 'text-gold');
    event.target.classList.remove('border-paper/20', 'text-paper/60');
  }

  let html = '';
  if (tab === 'history') {
    html = '<div class="space-y-4">' + pigData.history.map(h => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-lg text-gold mb-2">${h.dynasty}</h4>
        <p class="text-paper mb-2">${h.event}</p>
        <p class="text-paper/60 text-sm">${h.significance}</p>
      </div>
    `).join('') + '</div>';
  } else if (tab === 'craft') {
    html = '<div class="grid md:grid-cols-2 gap-4">' + pigData.craft.map(c => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-lg text-gold mb-2">${c.name}</h4>
        <p class="text-paper/60 text-sm mb-2">制作工艺：${c.technique}</p>
        <p class="text-paper/60 text-sm mb-2">特点：${c.characteristics}</p>
        <p class="text-paper/60 text-sm">流派：${c.origin}</p>
      </div>
    `).join('') + '</div>';
  } else if (tab === 'culture') {
    html = '<div class="grid md:grid-cols-2 gap-4">' + pigData.culture.map(c => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-lg text-gold mb-2">${c.region}</h4>
        <p class="text-paper mb-2">文化意义：${c.meaning}</p>
        <p class="text-paper/60 text-sm">习俗：${c.custom}</p>
      </div>
    `).join('') + '</div>';
  } else if (tab === 'products') {
    html = '<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">' + pigData.products.map(p => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-lg text-gold mb-2">${p.name}</h4>
        <p class="text-paper/60 text-sm mb-2">境界等级：${p.level}</p>
        <p class="text-paper/60 text-sm mb-2">描述：${p.desc}</p>
        <p class="text-paper/60 text-sm">价格：${p.price}</p>
      </div>
    `).join('') + '</div>';
  } else if (tab === 'knowledge') {
    html = '<div class="space-y-4">' + pigData.knowledge.map(k => `
      <div class="glass-card p-4">
        <h4 class="font-brush text-lg text-gold mb-2">${k.concept}</h4>
        <p class="text-paper/60 text-sm mb-2">相关内容：${k.related.join('、')}</p>
        <p class="text-paper/60 text-sm">出处：${k.source}</p>
      </div>
    `).join('') + '</div>';
  }
  elements.pigContent.innerHTML = html;
}

// 显示秘境探索页面
export function showSecretLands() {
  let html = '<div class="grid md:grid-cols-2 gap-4">';
  for (const [key, secretLand] of Object.entries(featureSystems.secretLands)) {
    html += `
      <div class="glass-card p-4 cursor-pointer" onclick="exploreSecretLand('${key}')">
        <h4 class="font-brush text-lg text-gold mb-2">${secretLand.name}</h4>
        <p class="text-paper/60 text-sm mb-2">${secretLand.desc}</p>
        <p class="text-paper/40 text-xs">需求境界：${secretLand.requirement}</p>
      </div>
    `;
  }
  html += '</div>';
  
  showModal('秘境探索', html);
}

// 显示法宝页面
export function showArtifacts() {
  let html = '<div class="grid md:grid-cols-2 gap-4">';
  for (const [key, artifact] of Object.entries(featureSystems.artifacts)) {
    const hasArtifact = userData.artifacts.includes(key);
    html += `
      <div class="glass-card p-4 ${hasArtifact ? 'cursor-pointer' : ''}" ${hasArtifact ? `onclick="useArtifact('${key}')"` : ''}>
        <h4 class="font-brush text-lg ${hasArtifact ? 'text-gold' : 'text-paper/40'} mb-2">${artifact.name}</h4>
        <p class="text-paper/60 text-sm mb-2">${artifact.desc}</p>
        <p class="text-paper/40 text-xs">效果：${artifact.effect}</p>
        <p class="text-paper/40 text-xs">稀有度：${artifact.rarity}</p>
        <p class="text-${hasArtifact ? 'jade' : 'vermilion'} text-xs mt-2">${hasArtifact ? '已获得' : '未获得'}</p>
      </div>
    `;
  }
  html += '</div>';
  
  showModal('法宝系统', html);
}

// 显示传承页面
export function showHeritages() {
  let html = '<div class="space-y-4">';
  if (featureSystems.heritage.length === 0) {
    html += '<p class="text-paper/60 text-center">暂无传承，成为第一个创建传承的人吧！</p>';
  } else {
    featureSystems.heritage.forEach(heritage => {
      html += `
        <div class="glass-card p-4">
          <h4 class="font-brush text-lg text-gold mb-2">${heritage.name}</h4>
          <p class="text-paper/60 text-sm mb-2">${heritage.desc}</p>
          <p class="text-paper/40 text-xs">创建者：${heritage.creator}</p>
          <p class="text-paper/40 text-xs">创建时间：${heritage.creationTime}</p>
        </div>
      `;
    });
  }
  html += '</div>';
  
  showModal('传承系统', html);
}

// 显示创建传承表单
export function showCreateHeritageForm() {
  showModal('创建传承', `
    <div class="space-y-4">
      <div>
        <label class="block text-paper/70 text-sm mb-2">传承名称</label>
        <input type="text" id="heritageName" class="w-full p-2 rounded-lg bg-ink/30 border border-paper/20 text-paper" placeholder="输入传承名称">
      </div>
      <div>
        <label class="block text-paper/70 text-sm mb-2">传承描述</label>
        <textarea id="heritageDesc" class="w-full p-2 rounded-lg bg-ink/30 border border-paper/20 text-paper" rows="3" placeholder="输入传承描述"></textarea>
      </div>
      <button class="btn-gold w-full" onclick="createHeritage(document.getElementById('heritageName').value, document.getElementById('heritageDesc').value)">创建传承</button>
    </div>
  `);
}

// 显示世界观信息
export function showWorldviewInfo() {
  showModal('世界观简介', `
    <div class="space-y-4">
      <div class="p-4 rounded-lg bg-ink/30">
        <h4 class="font-brush text-gold mb-2">核心架构</h4>
        <p class="text-paper/70 text-sm">本修仙世界设定融合了经典仙侠与玄幻元素，构建了一个完整的世界观体系。从现代末法时代，到先秦炼器时代的鼎盛，再到未来灵气复苏，展现了修仙文明的兴衰与传承。</p>
      </div>
      <div class="p-4 rounded-lg bg-ink/30">
        <h4 class="font-brush text-gold mb-2">科学与修仙融合</h4>
        <p class="text-paper/70 text-sm">通过科学与修仙理论的融合，为修仙现象提供了合理的解释，包括视觉隐藏现象的阵法原理、长距离飞行能力的科学依据、空间压缩技术的实现方式等。</p>
      </div>
      <div class="p-4 rounded-lg bg-ink/30">
        <h4 class="font-brush text-gold mb-2">历史与现代融合</h4>
        <p class="text-paper/70 text-sm">将历史人物重新诠释为修仙者，将现代社会现象解释为修仙影响，构建了一个全新的认知框架，使修仙世界与现实世界紧密相连。</p>
      </div>
    </div>
  `);
}

// 更新修炼数据统计面板
export function updateStatPanel() {
  const realm = realmData[userData.realm];
  if (realm) {
    elements.statRealm.textContent = realm.name;
    elements.statRealmLevel.textContent = realm.stages[0];
  }
  
  // 计算修为进度
  const maxCultivation = 1000; // 假设每个境界需要1000修为
  const progress = Math.min((userData.cultivation / maxCultivation) * 100, 100);
  elements.statCultivation.textContent = `${userData.cultivation}/${maxCultivation}`;
  elements.statCultivationBar.style.width = `${progress}%`;
  
  elements.statChapters.textContent = userData.chaptersRead;
  
  if (userData.sect && sectData[userData.sect]) {
    elements.statSect.textContent = sectData[userData.sect].name;
  } else {
    elements.statSect.textContent = '未加入';
  }
}

// 每日签道功能
export function dailyQuote() {
  const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
  showModal('每日签道', `
    <div class="text-center">
      <p class="text-paper/80 mb-4 text-lg">"${randomQuote.text}"</p>
      <p class="text-gold">${randomQuote.source}</p>
    </div>
  `);
}

// 加载语言内容
export function loadLanguageContent(lang) {
  // 更新页面标题
  document.title = langData[lang].title;
  
  // 更新导航
  navLinkElements.forEach(link => {
    const text = link.textContent.trim();
    for (const [key, value] of Object.entries(langData['zh'].nav)) {
      if (text === value) {
        link.textContent = langData[lang].nav[key];
        break;
      }
    }
  });
  
  // 更新首页内容
  const homePage = pageElements['page-home'];
  if (homePage) {
    const h2 = homePage.querySelector('h2');
    const quote = homePage.querySelector('.quote p:first-child');
    const quoteText = homePage.querySelector('.quote p:last-child');
    const btnGold = homePage.querySelector('.btn-gold');
    const btnJade = homePage.querySelector('.btn-jade');
    
    if (h2) h2.innerHTML = langData[lang].home.mainTitle;
    if (quote) quote.textContent = langData[lang].home.quote;
    if (quoteText) quoteText.textContent = langData[lang].home.quoteText;
    if (btnGold) btnGold.textContent = langData[lang].home.startPractice;
    if (btnJade) btnJade.textContent = langData[lang].home.learnRealm;
  }
  
  // 更新境界体系页内容
  const realmPage = pageElements['page-realm'];
  if (realmPage) {
    const h2 = realmPage.querySelector('h2');
    const p = realmPage.querySelector('p');
    const h3 = realmPage.querySelector('h3');
    
    if (h2) h2.textContent = langData[lang].realm.title;
    if (p) p.textContent = langData[lang].realm.subtitle;
    if (h3) h3.textContent = langData[lang].realm.organTitle;
  }
  
  // 更新修行中心页内容
  const practicePage = pageElements['page-practice'];
  if (practicePage) {
    const h2 = practicePage.querySelector('h2');
    const p = practicePage.querySelector('p');
    
    if (h2) h2.textContent = langData[lang].practice.title;
    if (p) p.textContent = langData[lang].practice.subtitle;
  }
  
  // 更新猪蹄文化页内容
  const pigPage = pageElements['page-pig'];
  if (pigPage) {
    const h2 = pigPage.querySelector('h2');
    const p = pigPage.querySelector('p');
    const pigTabs = pigPage.querySelectorAll('button');
    
    if (h2) h2.textContent = langData[lang].pig.title;
    if (p) p.textContent = langData[lang].pig.subtitle;
    if (pigTabs.length > 0) {
      const tabs = Object.values(langData[lang].pig.tabs);
      pigTabs.forEach((tab, index) => {
        if (tabs[index]) {
          tab.textContent = tabs[index];
        }
      });
    }
  }
  
  console.log('切换到语言:', lang);
}

// 获取DOM元素
export function getElements() {
  return elements;
}