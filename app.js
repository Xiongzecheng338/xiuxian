// Data definitions
const realmData = {
  chu kui: { name:'初窥门径', icon:'窥', color:'bronze', desc:'初入修行之门，感知天地灵气', lifespan:'凡人寿数', stages:['初期-气感初生','中期-灵气感知','后期-引气入体'], abilities:['感知灵气','引气入体','基础吐纳','强身健体'], next:'登堂入室' },
  deng tang: { name:'登堂入室', icon:'堂', color:'jade', desc:'掌握修行基础，开辟丹田气海', lifespan:'百五十载', stages:['初期-丹田初开','中期-气海成形','后期-气旋初成'], abilities:['开辟丹田','气海成形','轻身术','基础御物'], next:'融会贯通' },
  rong hui: { name:'融会贯通', icon:'融', color:'azure', desc:'功法与修为融会贯通，道基初现', lifespan:'二百载', stages:['初期-功法入门','中期-招式纯熟','后期-道基初现'], abilities:['御器飞行','神识初显','辟谷不食','五行感知'], next:'炉火纯青' },
  lu huo: { name:'炉火纯青', icon:'炉', color:'vermilion', desc:'修为精进，如炉火纯青', lifespan:'三百载', stages:['初期-道基稳固','中期-法力大增','后期-神通初显'], abilities:['御剑飞行','神通初显','瞬息千里','寿元大增'], next:'登峰造极' },
  deng feng: { name:'登峰造极', icon:'峰', color:'gold', desc:'修为达到顶峰，金丹成形', lifespan:'五百载', stages:['初期-金丹初凝','中期-金丹稳固','后期-金丹圆满'], abilities:['金丹大成','御剑飞行','神通广大','移山填海'], next:'出神入化' },
  chu shen: { name:'出神入化', icon:'神', color:'spirit', desc:'神念通达，元婴出窍', lifespan:'千载', stages:['初期-元婴初生','中期-元婴成长','后期-元婴大成'], abilities:['元婴出窍','瞬移千里','分神化身','夺舍重生'], next:'返璞归真' },
  fan pu: { name:'返璞归真', icon:'璞', color:'paper', desc:'脱去铅华，返璞归真', lifespan:'三千载', stages:['初期-返璞初现','中期-真意通达','后期-大道可期'], abilities:['虚室生白','真意通达','法则初悟','创造空间'], next:'天人合一' },
  tian ren: { name:'天人合一', icon:'天', color:'darkgold', desc:'与天地合一，掌控法则', lifespan:'万载', stages:['初期-天人感应','中期-法则掌控','后期-道韵天成'], abilities:['天人感应','法则掌控','不死不灭','创造生灵'], next:'传说境界' },
  chuan shuo: { name:'传说境界', icon:'传', color:'crimson', desc:'超越天地，成为传说', lifespan:'与天同寿', stages:['初期-传说初成','中期-传说稳固','后期-传说圆满'], abilities:['言出法随','创造世界','超脱轮回','与天同寿'], next:'飞升仙界' }
};

const organData = {
  lung: { name:'肺', element:'金', color:'bronze', realm:'初窥门径', desc:'肺主气，司呼吸', practice:'每日清晨面向东方深呼吸' },
  kidney: { name:'肾', element:'水', color:'jade', realm:'登堂入室', desc:'肾主水，藏精', practice:'节制房事，按摩肾俞穴' },
  heart: { name:'心', element:'火', color:'vermilion', realm:'炉火纯青', desc:'心主火，藏神', practice:'静心养神，意守心窍' },
  liver: { name:'肝', element:'木', color:'spirit', realm:'出神入化', desc:'肝主木，藏魂', practice:'保持情绪舒畅，丑时熟睡' },
  spleen: { name:'脾', element:'土', color:'gold', realm:'登峰造极', desc:'脾主土，藏意', practice:'饮食有节，辰时进食' }
};

// 猪蹄文化数据
const pigData = {
  history: [
    { dynasty: '远古时期', event: '先民发现猪蹄的食用价值', significance: '开启猪蹄文化的先河' },
    { dynasty: '夏商周', event: '猪蹄成为贵族祭祀用品', significance: '猪蹄开始与礼仪文化结合' },
    { dynasty: '秦汉', event: '猪蹄食疗价值被发现', significance: '猪蹄成为养生佳品' },
    { dynasty: '唐宋', event: '猪蹄烹饪技艺达到顶峰', significance: '形成多种经典做法' },
    { dynasty: '明清', event: '猪蹄文化广泛传播', significance: '成为民间重要的饮食文化' }
  ],
  craft: [
    { name: '卤猪蹄', technique: '老汤慢炖', characteristics: '色泽红亮，肉质酥烂', origin: '北方流派' },
    { name: '酱猪蹄', technique: '酱卤工艺', characteristics: '酱香浓郁，口感Q弹', origin: '南方流派' },
    { name: '烤猪蹄', technique: '炭火烤制', characteristics: '外焦里嫩，香气四溢', origin: '西域流派' },
    { name: '炖猪蹄', technique: '砂锅慢炖', characteristics: '汤清味鲜，营养丰富', origin: '中原流派' }
  ],
  culture: [
    { region: '中原地区', meaning: '团圆美满', custom: '除夕必吃猪蹄' },
    { region: '南方地区', meaning: '招财进宝', custom: '开业庆典必备' },
    { region: '东北地区', meaning: '红红火火', custom: '过年必备美食' },
    { region: '西南地区', meaning: '吉祥如意', custom: '婚庆宴请必上' }
  ],
  products: [
    { name: '基础猪蹄', level: '初窥门径', desc: '入门级猪蹄，口感鲜嫩', price: '100灵石' },
    { name: '精品猪蹄', level: '登堂入室', desc: '经过精心制作的猪蹄', price: '500灵石' },
    { name: '珍品猪蹄', level: '炉火纯青', desc: '采用传统工艺制作', price: '1000灵石' },
    { name: '极品猪蹄', level: '登峰造极', desc: '名师亲自制作', price: '5000灵石' },
    { name: '传说猪蹄', level: '传说境界', desc: '蕴含天地灵气的猪蹄', price: '10000灵石' }
  ],
  knowledge: [
    { concept: '猪蹄养生', related: ['胶原蛋白', '补肾壮阳', '美容养颜'], source: '《本草纲目》' },
    { concept: '猪蹄文化', related: ['祭祀礼仪', '民间习俗', '饮食文化'], source: '《齐民要术》' },
    { concept: '猪蹄工艺', related: ['卤制', '酱制', '烤制', '炖制'], source: '《随园食单》' }
  ]
};

const techniqueData = {
  basic: [
    { name:'吐纳术', icon:'fa-wind', color:'jade', desc:'采天地之灵气，纳日月之精华', mantra:'吸气观想灵气从百会穴入，呼气浊气从涌泉穴出' },
    { name:'静心诀', icon:'fa-brain', color:'azure', desc:'心者君主之官，静心者方能入定', mantra:'心如止水，意如明镜' },
    { name:'引气诀', icon:'fa-water', color:'spirit', desc:'引导灵气入体，开辟经脉', mantra:'意引灵气，循经而行' },
    { name:'五行功', icon:'fa-yin-yang', color:'gold', desc:'调和五脏，强健体魄', mantra:'金木水火土，五行相生相克' }
  ],
  advanced: [
    { name:'筑基功', icon:'fa-mountain', color:'azure', desc:'气旋化液，筑建道基', mantra:'气旋化液，筑建道基' },
    { name:'结丹诀', icon:'fa-circle', color:'gold', desc:'道基化丹，金丹大成', mantra:'阴阳相济，坎离交媾' },
    { name:'婴成诀', icon:'fa-baby', color:'spirit', desc:'碎丹成婴，元婴出窍', mantra:'碎丹成婴，如婴儿新生' }
  ],
  special: [
    { name:'剑修法门', icon:'fa-bolt', color:'paper', desc:'以剑为媒，炼剑成意', mantra:'以剑为媒，人剑合一' },
    { name:'符修法门', icon:'fa-scroll', color:'jade', desc:'以灵画符，符成法随', mantra:'一笔一划，皆含道韵' },
    { name:'阵修法门', icon:'fa-th', color:'azure', desc:'布阵困敌，聚灵养气', mantra:'天地为盘，万物为子' }
  ]
};

const alchemyData = {
  dans: [
    { name:'聚气丹', color:'jade', desc:'加速灵气吸收三成', grade:'下品', price:'100灵石' },
    { name:'筑基丹', color:'azure', desc:'增加筑基成功率两成', grade:'中品', price:'1000灵石' },
    { name:'金丹丹', color:'gold', desc:'稳固金丹，防止碎裂', grade:'上品', price:'10000灵石' },
    { name:'元婴丹', color:'spirit', desc:'护持元婴初生', grade:'极品', price:'10万灵石' },
    { name:'回气丹', color:'jade', desc:'快速恢复灵气', grade:'下品', price:'50灵石' },
    { name:'疗伤丹', color:'vermilion', desc:'治愈内外伤势', grade:'下品', price:'80灵石' }
  ],
  herbs: [
    { name:'千年人参', color:'spirit', desc:'蕴含庞大生命精华', age:'千年以上' },
    { name:'灵石', color:'gold', desc:'修真界通用货币', grade:'下中上极品' },
    { name:'朱果', color:'vermilion', desc:'服之可增加十年修为', age:'三百年成熟' },
    { name:'玄铁', color:'paper', desc:'炼制法宝上佳材料', grade:'中品灵材' }
  ],
  formulas: [
    { name:'聚气丹方', color:'jade', materials:'灵草×3，聚灵花×1', method:'文火炼制三个时辰' },
    { name:'筑基丹方', color:'azure', materials:'天灵果×1，筑基草×5', method:'武火炼制七日七夜' }
  ]
};

const healthData = [
  { title:'子时养阴', icon:'fa-moon', color:'azure', desc:'23:00-1:00入睡滋养肾阴', xuanxue:'子时一阳生，阴极阳生', science:'肝脏排毒关键时期', tips:['睡前热水泡脚','保持卧室安静'] },
  { title:'卯时采气', icon:'fa-sun', color:'jade', desc:'5:00-7:00采天地阳气', xuanxue:'卯时阳气始生', science:'清晨空气含氧量高', tips:['起床后饮温水','配合吐纳之术'] },
  { title:'饮食调和', icon:'fa-utensils', color:'gold', desc:'五味入五脏，五色补五行', xuanxue:'五味调和，五脏得养', science:'均衡饮食助营养吸收', tips:['早餐宜温热','晚餐宜清淡'] },
  { title:'运动炼体', icon:'fa-running', color:'vermilion', desc:'动则生阳，静则生阴', xuanxue:'阳气升发驱除寒湿', science:'增强心肺功能', tips:['运动量循序渐进','持之以恒'] }
];

const legendData = [
  { name:'彭祖', icon:'彭', color:'gold', title:'寿八百载', desc:'善养生之术，创导引行气之法', quote:'道不在烦，心无烦，形无极，此可长生' },
  { name:'张三丰', icon:'丰', color:'spirit', title:'太极宗师', desc:'武当派创始人', quote:'太极者，无极而生，动静之机' },
  { name:'吕洞宾', icon:'吕', color:'jade', title:'纯阳祖师', desc:'八仙之一', quote:'一粒金丹吞入腹，始知我命不由天' },
  { name:'老子', icon:'老', color:'azure', title:'道家始祖', desc:'著《道德经》五千言', quote:'道可道，非常道' },
  { name:'葛洪', icon:'葛', color:'vermilion', title:'抱朴子', desc:'东晋道教学者', quote:'求长生，诀在于志' },
  { name:'陈抟', icon:'陈', color:'paper', title:'睡仙', desc:'以睡功闻名', quote:'至人之睡，先睡心，后睡眼' }
];

const wisdomQuestions = [
  { q:'「道生一，一生二，二生三，三生万物」何解？', opts:['道生万物','数学为本','一气化阴阳生万物'], ans:3 },
  { q:'「上善若水」何意？', opts:['水最善良','滋养万物而不争','要像水软弱'], ans:2 },
  { q:'「无为而无不为」何解？', opts:['什么都不做','顺应自然而为','消极等待'], ans:2 },
  { q:'「道法自然」何为自然？', opts:['山川河流','自然而然','随意而为'], ans:2 },
  { q:'「金丹大道」何为金丹？', opts:['黄金做的丹','内丹修炼所结','仙丹妙药'], ans:2 },
  { q:'「炼精化气」此为何功？', opts:['外丹术','内丹术','符箓术'], ans:2 }
];

// State variables
let currentPage = 'home';
let meditationTimer = null, meditationSeconds = 0, isMeditating = false;
let reactionTimer = null, reactionTimes = [];
let focusTimer = null, focusBest = 0;
let memorySeq = [], memoryPlayer = [], memoryLevel = 1, memoryBest = 0;
let wisdomIdx = 0, wisdomCorrect = 0, wisdomTotal = 0;

// DOM elements cache
const elements = {
  modal: document.getElementById('modal'),
  modalContent: document.getElementById('modalContent'),
  mobileNav: document.getElementById('mobileNav'),
  realmList: document.getElementById('realmList'),
  techniqueContent: document.getElementById('techniqueContent'),
  alchemyContent: document.getElementById('alchemyContent'),
  healthContent: document.getElementById('healthContent'),
  legendList: document.getElementById('legendList'),
  dailyTasks: document.getElementById('dailyTasks'),
  practiceLog: document.getElementById('practiceLog'),
  reactionGame: document.getElementById('reactionGame'),
  reactionTarget: document.getElementById('reactionTarget'),
  reactionStatus: document.getElementById('reactionStatus'),
  reactionCount: document.getElementById('reactionCount'),
  avgReaction: document.getElementById('avgReaction'),
  reactionRank: document.getElementById('reactionRank'),
  focusGame: document.getElementById('focusGame'),
  focusTarget: document.getElementById('focusTarget'),
  focusDistractions: document.getElementById('focusDistractions'),
  focusTime: document.getElementById('focusTime'),
  focusBest: document.getElementById('focusBest'),
  focusRank: document.getElementById('focusRank'),
  memoryGame: document.getElementById('memoryGame'),
  memoryLevel: document.getElementById('memoryLevel'),
  memoryBest: document.getElementById('memoryBest'),
  memoryRank: document.getElementById('memoryRank'),
  wisdomQuestion: document.getElementById('wisdomQuestion'),
  wisdomOptions: document.getElementById('wisdomOptions'),
  wisdomCount: document.getElementById('wisdomCount'),
  wisdomCorrect: document.getElementById('wisdomCorrect'),
  wisdomRank: document.getElementById('wisdomRank'),
  meditationStatus: document.getElementById('meditationStatus'),
  meditationTimer: document.getElementById('meditationTimer'),
  startMeditation: document.getElementById('startMeditation'),
  stopMeditation: document.getElementById('stopMeditation'),
  progressText: document.getElementById('progressText'),
  progressBar: document.getElementById('progressBar'),
  breakthroughs: document.getElementById('breakthroughs'),
  pigContent: document.getElementById('pigContent')
};

// 缓存页面元素，避免重复查询DOM
const pageElements = {};
const navLinkElements = [];

// 初始化缓存
function initElementCache() {
  // 缓存页面元素
  document.querySelectorAll('.page').forEach(page => {
    pageElements[page.id] = page;
  });
  
  // 缓存导航链接
  document.querySelectorAll('.nav-link').forEach(link => {
    navLinkElements.push(link);
  });
}

// Page switching
function showPage(pageId) {
  // 移除所有页面的活动状态
  Object.values(pageElements).forEach(p => {
    p.classList.remove('active');
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
  });
  
  // 移除所有导航链接的活动状态
  navLinkElements.forEach(n => n.classList.remove('active'));
  
  // 激活当前页面
  const page = pageElements['page-' + pageId];
  if (page) {
    // 添加墨痕扩散效果
    createInkEffect();
    
    // 延迟显示页面，让墨痕效果先播放
    setTimeout(() => {
      page.style.opacity = '1';
      page.style.transform = 'translateY(0)';
      page.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      page.classList.add('active');
      
      // 为页面内元素添加滚动动画
      setTimeout(() => {
        const elements = page.querySelectorAll('.glass-card, h2, p, button');
        // 批量添加动画，减少重排
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate-fade');
          }, index * 50); // 减少延迟，提高性能
        });
      }, 50); // 减少延迟，提高性能
    }, 200); // 减少延迟，提高性能
  }
  
  // 激活当前导航链接
  const pageName = getPageName(pageId);
  navLinkElements.forEach(n => {
    if (n.textContent.includes(pageName)) n.classList.add('active');
  });
  
  currentPage = pageId;
  window.scrollTo(0, 0);

  // Lazy load page content
  if (page && !page.dataset.loaded) {
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
      case 'pig':
        showPigTab('history');
        break;
    }
    page.dataset.loaded = 'true';
  }
}

// 创建墨痕扩散效果
function createInkEffect() {
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

function getPageName(id) {
  const names = {home:'首页',realm:'境界体系',technique:'功法秘籍',alchemy:'丹药宝典',health:'养生之道',legend:'神仙列传',practice:'修行中心',trial:'试炼场',pig:'猪蹄文化'};
  return names[id] || '';
}

// 猪蹄文化标签切换
function showPigTab(tab) {
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

function toggleMobileMenu() {
  elements.mobileNav.classList.toggle('hidden');
}

// Modal functions
function showModal(title, content) {
  elements.modalContent.innerHTML = `<h3 class="font-brush text-xl text-paper mb-4">${title}</h3>${content}<button class="btn-jade w-full mt-4" onclick="closeModal()">关闭</button>`;
  elements.modal.classList.add('show');
}

function closeModal() {
  elements.modal.classList.remove('show');
}

// Realm list
function generateRealmList() {
  let html = '';
  for (const [k, d] of Object.entries(realmData)) {
    html += `
      <div class="glass-card p-4 cursor-pointer" onclick="showRealmDetail('${k}')">
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
      </div>
    `;
  }
  elements.realmList.innerHTML = html;
}

function showRealmDetail(k) {
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

function showOrganModal(k) {
  const d = organData[k];
  showModal(d.name + '·' + d.element + '行', `
    <div class="space-y-3">
      <p class="text-paper/70">${d.desc}</p>
      <p class="text-sm"><span class="text-jade">对应境界：</span>${d.realm}</p>
      <p class="text-sm"><span class="text-gold">修炼之法：</span>${d.practice}</p>
    </div>
  `);
}

function showRealmInfo() {
  showRealmDetail('lianqi');
}

// Techniques
function showTechniqueTab(tab) {
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

function showTechniqueDetail(name, icon, color, desc, mantra) {
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

// Alchemy
function showAlchemyTab(tab) {
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

// Health
function generateHealth() {
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

// Legends
function generateLegend() {
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

// Practice
function generateTasks() {
  const tasks = [{n:'晨间吐纳',d:true},{n:'午时炼气',d:false},{n:'子时冥想',d:false}];
  elements.dailyTasks.innerHTML = tasks.map(t => `
    <div class="flex justify-between p-2 rounded bg-ink/30 text-xs">
      <span><i class="fas ${t.d?'fa-check-circle text-jade':'fa-circle text-paper/20'} mr-1"></i>${t.n}</span>
      <span class="${t.d?'text-jade':'text-paper/40'}">${t.d?'完成':'待完成'}</span>
    </div>
  `).join('');
}

function generateLog() {
  const logs = [{t:'今日',c:'完成吐纳'},{t:'昨日',c:'修炼引气诀'}];
  elements.practiceLog.innerHTML = logs.map(l => `
    <div class="text-xs p-2 rounded bg-ink/20">
      <div class="text-paper/70">${l.c}</div>
      <div class="text-paper/30">${l.t}</div>
    </div>
  `).join('');
}

// Meditation
function startMeditation() {
  if (isMeditating) return;
  isMeditating = true;
  meditationSeconds = 0;
  elements.meditationStatus.textContent = '冥想中...';
  elements.meditationStatus.className = 'text-gold text-xs';
  elements.startMeditation.disabled = true;
  elements.stopMeditation.disabled = false;
  elements.stopMeditation.classList.remove('opacity-50');
  
  meditationTimer = setInterval(() => {
    meditationSeconds++;
    const h = Math.floor(meditationSeconds/3600), m = Math.floor((meditationSeconds%3600)/60), s = meditationSeconds%60;
    elements.meditationTimer.textContent = 
      String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  }, 1000);
}

function stopMeditation() {
  if (!isMeditating) return;
  isMeditating = false;
  clearInterval(meditationTimer);
  elements.meditationStatus.textContent = '待机中';
  elements.meditationStatus.className = 'text-jade text-xs';
  elements.startMeditation.disabled = false;
  elements.stopMeditation.disabled = true;
  elements.stopMeditation.classList.add('opacity-50');

  const mins = Math.floor(meditationSeconds/60);
  const cur = parseInt(elements.progressText.textContent);
  const nxt = Math.min(cur + mins, 100);
  elements.progressText.textContent = nxt + '%';
  elements.progressBar.style.width = nxt + '%';
  if (nxt >= 100) {
    elements.breakthroughs.textContent = parseInt(elements.breakthroughs.textContent) + 1;
    elements.progressText.textContent = '0%';
    elements.progressBar.style.width = '0%';
  }
}

// Root test
function startRootTest() {
  showModal('灵根测试', `
    <div class="space-y-4">
      <p class="text-paper/60 text-sm">选择与你最契合的元素</p>
      <div class="grid grid-cols-2 gap-3">
        <button onclick="showRootResult('jade','木灵根','木主生发，修行木系功法事半功倍')" class="p-4 rounded-xl border border-jade/30 hover:bg-jade/10"><i class="fas fa-leaf text-jade text-xl"></i><div class="text-paper">木</div></button>
        <button onclick="showRootResult('vermilion','火灵根','火主炽热，修行火系功法事半功倍')" class="p-4 rounded-xl border border-vermilion/30 hover:bg-vermilion/10"><i class="fas fa-fire text-vermilion text-xl"></i><div class="text-paper">火</div></button>
        <button onclick="showRootResult('paper','金灵根','金主锋锐，修行金系功法事半功倍')" class="p-4 rounded-xl border border-paper/30 hover:bg-paper/10"><i class="fas fa-gem text-paper/80 text-xl"></i><div class="text-paper">金</div></button>
        <button onclick="showRootResult('spirit','水灵根','水主柔韧，修行水系功法事半功倍')" class="p-4 rounded-xl border border-spirit/30 hover:bg-spirit/10"><i class="fas fa-water text-spirit text-xl"></i><div class="text-paper">水</div></button>
        <button onclick="showRootResult('gold','土灵根','土主厚重，修行土系功法事半功倍')" class="p-4 rounded-xl border border-gold/30 hover:bg-gold/10"><i class="fas fa-mountain text-gold text-xl"></i><div class="text-paper">土</div></button>
        <button onclick="showRootResult('azure','五行灵根','五行均衡，修行任何功法皆可')" class="p-4 rounded-xl border border-azure/30 hover:bg-azure/10"><i class="fas fa-yin-yang text-azure text-xl"></i><div class="text-paper">五行</div></button>
      </div>
    </div>
  `);
}

function showRootResult(color, name, desc) {
  showModal('测试结果', `
    <div class="text-center">
      <div class="w-16 h-16 mx-auto rounded-full bg-${color}/20 flex items-center justify-center mb-4">
        <i class="fas fa-yin-yang text-${color} text-2xl"></i>
      </div>
      <h3 class="font-brush text-xl text-paper mb-2">${name}</h3>
      <p class="text-paper/60">${desc}</p>
    </div>
  `);
}

// Reaction game
function startReactionGame() {
  reactionTimes = [];
  elements.reactionStatus.textContent = '等待灵光出现...';
  elements.startReaction.disabled = true;
  elements.stopReaction.disabled = false;
  elements.stopReaction.classList.remove('opacity-50');

  const delay = 2000 + Math.random() * 3000;
  reactionTimer = setTimeout(() => {
    elements.reactionStatus.textContent = '点击灵光！';
    const t = elements.reactionTarget;
    t.style.display = 'block';
    t.style.left = (Math.random() * 180 + 20) + 'px';
    t.style.top = (Math.random() * 120 + 20) + 'px';
    t.onclick = hitReaction;
  }, delay);
}

function hitReaction() {
  reactionTimes.push(Date.now());
  const t = elements.reactionTarget;
  t.style.display = 'none';
  elements.reactionCount.textContent = reactionTimes.length;
  const avg = reactionTimes.length > 1 ? Math.round(reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length) : reactionTimes[0];
  elements.avgReaction.textContent = avg + 'ms';

  if (reactionTimes.length < 5) {
    elements.reactionStatus.textContent = '继续等待...';
    setTimeout(() => {
      elements.reactionStatus.textContent = '点击灵光！';
      const t = elements.reactionTarget;
      t.style.display = 'block';
      t.style.left = (Math.random() * 180 + 20) + 'px';
      t.style.top = (Math.random() * 120 + 20) + 'px';
      t.onclick = hitReaction;
    }, 1500 + Math.random() * 2000);
  } else {
    elements.reactionStatus.textContent = '测试完成！';
    elements.reactionRank.textContent = avg < 300 ? '天神' : avg < 500 ? '金丹' : '凡人';
    endReaction();
  }
}

function stopReactionGame() {
  clearTimeout(reactionTimer);
  endReaction();
}

function endReaction() {
  elements.startReaction.disabled = false;
  elements.stopReaction.disabled = true;
  elements.stopReaction.classList.add('opacity-50');
  elements.reactionTarget.style.display = 'none';
}

// Focus game
function startFocusGame() {
  let sec = 0;
  elements.startFocus.disabled = true;
  elements.stopFocus.disabled = false;
  elements.stopFocus.classList.remove('opacity-50');
  elements.focusDistractions.innerHTML = '';

  focusTimer = setInterval(() => {
    sec++;
    elements.focusTime.textContent = sec + '秒';
    if (sec > focusBest) {
      focusBest = sec;
      elements.focusBest.textContent = sec + '秒';
    }
    elements.focusRank.textContent = sec >= 60 ? '天神' : sec >= 30 ? '金丹' : '凡人';

    if (sec % 2 === 0) {
      const d = document.createElement('div');
      d.className = 'absolute text-paper/20 text-xs';
      d.textContent = ['心魔','杂念'][Math.floor(Math.random()*2)];
      d.style.left = Math.random()*100+'%';
      d.style.top = Math.random()*100+'%';
      elements.focusDistractions.appendChild(d);
      setTimeout(() => d.remove(), 1500);
    }
  }, 1000);

  elements.focusGame.onclick = () => stopFocusGame();
}

function stopFocusGame() {
  clearInterval(focusTimer);
  elements.startFocus.disabled = false;
  elements.stopFocus.disabled = true;
  elements.stopFocus.classList.add('opacity-50');
  elements.focusDistractions.innerHTML = '';
}

// Memory game
function generateMemory() {
  let html = '';
  for (let i = 0; i < 16; i++) {
    html += `<div class="memory-cell w-12 h-12 rounded-lg bg-ink/30 border border-jade/20 flex items-center justify-center cursor-pointer hover:bg-jade/10" data-index="${i}"></div>`;
  }
  elements.memoryGame.innerHTML = html;
  document.querySelectorAll('.memory-cell').forEach(cell => {
    cell.onclick = () => memoryClick(cell);
  });
}

function startMemoryGame() {
  memorySeq = [];
  memoryPlayer = [];
  memoryLevel = 1;
  elements.memoryLevel.textContent = memoryLevel;
  elements.startMemory.disabled = true;
  elements.stopMemory.disabled = false;
  elements.stopMemory.classList.remove('opacity-50');
  showMemorySequence();
}

function showMemorySequence() {
  memorySeq.push(Math.floor(Math.random() * 16));
  let i = 0;
  const interval = setInterval(() => {
    const cell = document.querySelector(`.memory-cell[data-index="${memorySeq[i]}"]`);
    cell.style.background = 'linear-gradient(135deg, rgba(212, 168, 83, 0.3), rgba(90, 126, 122, 0.3))';
    setTimeout(() => {
      cell.style.background = 'rgba(26, 26, 26, 0.3)';
    }, 500);
    i++;
    if (i >= memorySeq.length) {
      clearInterval(interval);
    }
  }, 800);
}

function memoryClick(cell) {
  const index = parseInt(cell.dataset.index);
  memoryPlayer.push(index);
  cell.style.background = 'linear-gradient(135deg, rgba(212, 168, 83, 0.3), rgba(90, 126, 122, 0.3))';
  setTimeout(() => {
    cell.style.background = 'rgba(26, 26, 26, 0.3)';
  }, 300);

  if (memoryPlayer.length === memorySeq.length) {
    if (memoryPlayer.every((val, idx) => val === memorySeq[idx])) {
      memoryLevel++;
      elements.memoryLevel.textContent = memoryLevel;
      if (memoryLevel > memoryBest) {
        memoryBest = memoryLevel;
        elements.memoryBest.textContent = memoryBest;
      }
      elements.memoryRank.textContent = memoryLevel >= 10 ? '天神' : memoryLevel >= 7 ? '金丹' : '凡人';
      memoryPlayer = [];
      setTimeout(showMemorySequence, 1000);
    } else {
      elements.memoryRank.textContent = memoryLevel >= 7 ? '金丹' : '凡人';
      endMemoryGame();
    }
  }
}

function stopMemoryGame() {
  endMemoryGame();
}

function endMemoryGame() {
  elements.startMemory.disabled = false;
  elements.stopMemory.disabled = true;
  elements.stopMemory.classList.add('opacity-50');
}

// Wisdom game
function loadWisdom() {
  const q = wisdomQuestions[wisdomIdx];
  elements.wisdomQuestion.textContent = q.q;
  elements.wisdomOptions.innerHTML = q.opts.map((opt, i) => `
    <button class="w-full text-left p-3 rounded-lg border border-paper/20 hover:border-gold/30" onclick="answerWisdom(${i+1})">
      ${i+1}. ${opt}
    </button>
  `).join('');
}

function answerWisdom(ans) {
  const q = wisdomQuestions[wisdomIdx];
  wisdomTotal++;
  if (ans === q.ans) {
    wisdomCorrect++;
  }
  elements.wisdomCount.textContent = wisdomTotal;
  elements.wisdomCorrect.textContent = Math.round((wisdomCorrect/wisdomTotal)*100) + '%';
  elements.wisdomRank.textContent = wisdomTotal >= 5 ? (wisdomCorrect/wisdomTotal >= 0.8 ? '天神' : wisdomCorrect/wisdomTotal >= 0.5 ? '金丹' : '凡人') : '未测试';
  wisdomIdx = (wisdomIdx + 1) % wisdomQuestions.length;
  loadWisdom();
}

// Performance monitoring
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

// Initialize the application
function initApp() {
  // 初始化元素缓存
  initElementCache();
  
  // Initialize performance monitoring
  initPerformanceMonitoring();
  
  // Set up event listeners for navigation
  navLinkElements.forEach(link => {
    link.addEventListener('click', function() {
      const pageId = this.textContent.trim();
      const pageMap = {'首页':'home','境界体系':'realm','功法秘籍':'technique','丹药宝典':'alchemy','养生之道':'health','神仙列传':'legend','修行中心':'practice','试炼场':'trial','猪蹄文化':'pig'};
      if (pageMap[pageId]) {
        performance.mark('pageTransitionStart');
        showPage(pageMap[pageId]);
        setTimeout(() => {
          performance.mark('pageTransitionEnd');
          performance.measure('pageTransition', 'pageTransitionStart', 'pageTransitionEnd');
          const measure = performance.getEntriesByName('pageTransition')[0];
          console.log('Page transition time for', pageId, ':', measure.duration, 'ms');
        }, 100);
      }
    });
  });

  // 语言数据
  const langData = {
    zh: {
      title: '太虚仙门 · 问道长生',
      nav: {
        home: '首页',
        realm: '境界体系',
        technique: '功法秘籍',
        alchemy: '丹药宝典',
        health: '养生之道',
        legend: '神仙列传',
        practice: '修行中心',
        trial: '试炼场',
        pig: '猪蹄文化'
      },
      home: {
        subtitle: '问道长生 · 修真入门',
        mainTitle: '天地有大美<br/><span class="text-gold">修真可长生</span>',
        quote: '「抱朴子曰：」',
        quoteText: '夫求长生，修至道，诀在于志，不在于富贵名利。',
        startPractice: '开始修行',
        learnRealm: '了解境界',
        featureTitles: ['境界体系', '功法秘籍', '丹药宝典', '修行中心'],
        featureDescs: ['由凡入仙，历经九大境界', '修炼之法，择一而修', '灵丹妙药，助益修行', '打坐冥想，突破境界'],
        dailyFortune: '今日修真运势',
        fortuneItems: [
          { icon: 'fa-sun', title: '宜修炼', content: '吐纳打坐', color: 'jade' },
          { icon: 'fa-mortar-pestle', title: '宜炼丹', content: '聚气丹', color: 'gold' },
          { icon: 'fa-bolt', title: '忌', content: '动武争斗', color: 'vermilion' },
          { icon: 'fa-star', title: '机缘', content: '遇贵人', color: 'azure' }
        ],
        famousQuote: '「道可道，非常道；名可名，非常名。」',
        quoteSource: '——《道德经》'
      },
      realm: {
        title: '修真境界体系',
        subtitle: '由凡入仙，历经九大境界',
        organTitle: '五脏对应境界',
        organItems: [
          { icon: 'fa-lungs', name: '肺·金', realm: '初窥门径', color: 'bronze' },
          { icon: 'fa-kidneys', name: '肾·水', realm: '登堂入室', color: 'jade' },
          { icon: 'fa-heart', name: '心·火', realm: '炉火纯青', color: 'vermilion' },
          { icon: 'fa-liver', name: '肝·木', realm: '出神入化', color: 'spirit' },
          { icon: 'fa-stomach', name: '脾·土', realm: '登峰造极', color: 'gold' }
        ]
      },
      practice: {
        title: '修行中心',
        subtitle: '每日勤修，必有精进',
        currentRealm: '当前境界',
        details: '详情',
        cultivationProgress: '修炼进度',
        spiritPower: '灵力',
        practiceHours: '修炼时辰',
        breakthroughs: '突破次数',
        meditation: '打坐冥想',
        meditationStatus: '待机中',
        meditationTimer: '00:00:00',
        startMeditation: '开始冥想',
        stopMeditation: '结束冥想',
        meditationTip: '盘膝而坐，双手结印，闭目调息。吸气观想天地灵气从百会穴入体，呼气观想浊气从涌泉穴排出。',
        rootTest: '灵根测试',
        startRootTest: '开始测试',
        dailyTasks: '每日修行',
        practiceLog: '修行记录'
      },
      pig: {
        title: '猪蹄文化宇宙',
        subtitle: '探索猪蹄文化的深厚底蕴',
        tabs: {
          history: '历史渊源',
          craft: '制作工艺',
          culture: '文化价值',
          products: '产品展示',
          knowledge: '知识图谱'
        }
      }
    },
    en: {
      title: 'Tai Xu Xian Men · Seeking Immortality',
      nav: {
        home: 'Home',
        realm: 'Realm System',
        technique: 'Techniques',
        alchemy: 'Alchemy',
        health: 'Health',
        legend: 'Legends',
        practice: 'Practice',
        trial: 'Trial',
        pig: 'Pig Trotter Culture'
      },
      home: {
        subtitle: 'Seeking Immortality ·修真入门',
        mainTitle: 'The world has great beauty<br/><span class="text-gold">Cultivation leads to immortality</span>',
        quote: '「Baopuzi said:」',
        quoteText: 'To seek immortality and cultivate the Tao, the key lies in will, not in wealth and fame.',
        startPractice: 'Start Cultivation',
        learnRealm: 'Learn Realms',
        featureTitles: ['Realm System', 'Techniques', 'Alchemy', 'Practice Center'],
        featureDescs: ['From mortal to immortal, through nine realms', 'Cultivation methods, choose one to practice', 'Elixirs to aid cultivation', 'Meditation to break through realms'],
        dailyFortune: 'Today\'s Cultivation Fortune',
        fortuneItems: [
          { icon: 'fa-sun', title: 'Good for cultivation', content: 'Breathing exercise', color: 'jade' },
          { icon: 'fa-mortar-pestle', title: 'Good for alchemy', content: 'Qi Gathering Pill', color: 'gold' },
          { icon: 'fa-bolt', title: 'Avoid', content: 'Fighting', color: 'vermilion' },
          { icon: 'fa-star', title: 'Opportunity', content: 'Meet noble people', color: 'azure' }
        ],
        famousQuote: '「The Tao that can be told is not the eternal Tao; the name that can be named is not the eternal name.」',
        quoteSource: '——Tao Te Ching'
      },
      realm: {
        title: 'Cultivation Realm System',
        subtitle: 'From mortal to immortal, through nine realms',
        organTitle: 'Five Organs Corresponding to Realms',
        organItems: [
          { icon: 'fa-lungs', name: 'Lung·Metal', realm: 'Initial Understanding', color: 'bronze' },
          { icon: 'fa-kidneys', name: 'Kidney·Water', realm: 'Entering the Hall', color: 'jade' },
          { icon: 'fa-heart', name: 'Heart·Fire', realm: 'Mastery', color: 'vermilion' },
          { icon: 'fa-liver', name: 'Liver·Wood', realm: 'Supernatural', color: 'spirit' },
          { icon: 'fa-stomach', name: 'Spleen·Earth', realm: 'Peak', color: 'gold' }
        ]
      },
      practice: {
        title: 'Practice Center',
        subtitle: 'Daily cultivation leads to progress',
        currentRealm: 'Current Realm',
        details: 'Details',
        cultivationProgress: 'Cultivation Progress',
        spiritPower: 'Spirit Power',
        practiceHours: 'Practice Hours',
        breakthroughs: 'Breakthroughs',
        meditation: 'Meditation',
        meditationStatus: 'Standing by',
        meditationTimer: '00:00:00',
        startMeditation: 'Start Meditation',
        stopMeditation: 'Stop Meditation',
        meditationTip: 'Sit cross-legged, form hand seals, close eyes and regulate breath. Inhale and visualize celestial qi entering through the top of the head, exhale and visualize impure qi exiting through the soles of the feet.',
        rootTest: 'Spirit Root Test',
        startRootTest: 'Start Test',
        dailyTasks: 'Daily Tasks',
        practiceLog: 'Practice Log'
      },
      pig: {
        title: 'Pig Trotter Culture Universe',
        subtitle: 'Explore the profound heritage of pig trotter culture',
        tabs: {
          history: 'History',
          craft: 'Craftsmanship',
          culture: 'Cultural Value',
          products: 'Products',
          knowledge: 'Knowledge Graph'
        }
      }
    }
  };

  // 加载语言内容
  function loadLanguageContent(lang) {
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
    if (currentPage === 'home') {
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
    }
    
    // 更新境界体系页内容
    if (currentPage === 'realm') {
      const realmPage = pageElements['page-realm'];
      if (realmPage) {
        const h2 = realmPage.querySelector('h2');
        const p = realmPage.querySelector('p');
        const h3 = realmPage.querySelector('h3');
        
        if (h2) h2.textContent = langData[lang].realm.title;
        if (p) p.textContent = langData[lang].realm.subtitle;
        if (h3) h3.textContent = langData[lang].realm.organTitle;
      }
    }
    
    // 更新修行中心页内容
    if (currentPage === 'practice') {
      const practicePage = pageElements['page-practice'];
      if (practicePage) {
        const h2 = practicePage.querySelector('h2');
        const p = practicePage.querySelector('p');
        
        if (h2) h2.textContent = langData[lang].practice.title;
        if (p) p.textContent = langData[lang].practice.subtitle;
      }
    }
    
    // 更新猪蹄文化页内容
    if (currentPage === 'pig') {
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
    }
    
    console.log('切换到语言:', lang);
  }
  
  // 全局暴露函数
  window.loadLanguageContent = loadLanguageContent;
  
  // 初始化用户数据
  initUserData();
  
  // Show home page by default
  showPage('home');
}

// 用户数据
let userData = {
  realm: 'chu kui', // 当前境界
  cultivation: 0, // 修为值
  practiceHours: 0, // 修炼时长
  breakthroughs: 0, // 突破次数
  sect: null, // 门派
  artifacts: [], // 法宝
  adventures: [] // 奇遇记录
};

// 门派数据
const sectData = {
  qingyun: { name: '青云门', desc: '以猪蹄烹饪技艺闻名，注重基础修炼', bonus: '修炼速度+10%' },
  tianyin: { name: '天音阁', desc: '擅长猪蹄食疗，注重养生之道', bonus: '寿元+20%' },
  huashan: { name: '华山派', desc: '以猪蹄烤制技艺著称，注重实战能力', bonus: '攻击力+15%' },
  wudang: { name: '武当派', desc: '融合猪蹄文化与道家修炼，注重内力修为', bonus: '内力+25%' }
};

// 奇遇数据
const adventureData = [
  { id: 1, name: '猪蹄奇遇', desc: '在山林中发现一只奇特的猪蹄，食用后修为大增', reward: '修为+100' },
  { id: 2, name: '丹炉现世', desc: '发现一个古老的丹炉，可用来炼制猪蹄丹药', reward: '获得法宝：丹炉' },
  { id: 3, name: '高人指点', desc: '遇到一位烹饪高人，传授猪蹄制作技艺', reward: '技艺+5' },
  { id: 4, name: '秘境探索', desc: '进入一处秘境，发现大量猪蹄资源', reward: '资源+500' }
];

// 初始化用户数据
function initUserData() {
  // 从本地存储加载用户数据
  try {
    const savedData = localStorage.getItem('xiuxianUserData');
    if (savedData) {
      userData = JSON.parse(savedData);
    } else {
      // 初始化新用户数据
      userData = {
        realm: 'chu kui',
        cultivation: 0,
        practiceHours: 0,
        breakthroughs: 0,
        sect: null,
        artifacts: [],
        adventures: []
      };
      saveUserData();
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
    // 初始化默认数据
    userData = {
      realm: 'chu kui',
      cultivation: 0,
      practiceHours: 0,
      breakthroughs: 0,
      sect: null,
      artifacts: [],
      adventures: []
    };
  }
  
  // 更新UI显示
  updateUserUI();
}

// 保存用户数据
function saveUserData() {
  try {
    // 节流保存，避免频繁写入
    if (!saveUserData.throttle) {
      saveUserData.throttle = true;
      setTimeout(() => {
        localStorage.setItem('xiuxianUserData', JSON.stringify(userData));
        saveUserData.throttle = false;
      }, 500);
    }
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

// 更新用户UI
function updateUserUI() {
  // 只在页面加载时更新，避免频繁DOM操作
  if (document.getElementById('realmIcon')) {
    // 更新境界信息
    const realm = realmData[userData.realm];
    if (realm) {
      document.getElementById('realmIcon').textContent = realm.icon;
      document.querySelector('#page-practice h4').innerHTML = `${realm.name} <span class="text-jade text-xs px-2 py-1 rounded-full bg-jade/10">初期</span>`;
      document.querySelector('#page-practice h4 + p').textContent = realm.desc;
    }
    
    // 更新修炼进度
    const progress = Math.min(100, Math.floor((userData.cultivation / 1000) * 100));
    document.getElementById('progressText').textContent = progress + '%';
    document.getElementById('progressBar').style.width = progress + '%';
    
    // 更新修炼时长
    document.getElementById('practiceHours').textContent = userData.practiceHours;
    
    // 更新突破次数
    document.getElementById('breakthroughs').textContent = userData.breakthroughs;
  }
}

// 选择门派
function chooseSect(sectId) {
  userData.sect = sectId;
  saveUserData();
  showModal('门派选择', `
    <div class="text-center">
      <h3 class="font-brush text-xl text-gold mb-2">${sectData[sectId].name}</h3>
      <p class="text-paper/60 mb-3">${sectData[sectId].desc}</p>
      <p class="text-gold">${sectData[sectId].bonus}</p>
    </div>
  `);
}

// 触发奇遇
function triggerAdventure() {
  const randomAdventure = adventureData[Math.floor(Math.random() * adventureData.length)];
  userData.adventures.push(randomAdventure);
  saveUserData();
  showModal('奇遇', `
    <div class="text-center">
      <h3 class="font-brush text-xl text-gold mb-2">${randomAdventure.name}</h3>
      <p class="text-paper/60 mb-3">${randomAdventure.desc}</p>
      <p class="text-gold">奖励：${randomAdventure.reward}</p>
    </div>
  `);
}

// 开始修炼
function startMeditation() {
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
function stopMeditation() {
  if (!isMeditating) return;
  isMeditating = false;
  clearInterval(meditationTimer);
  elements.meditationStatus.textContent = '待机中';
  elements.meditationStatus.className = 'text-jade text-xs';
  elements.startMeditation.disabled = false;
  elements.stopMeditation.disabled = true;
  elements.stopMeditation.classList.add('opacity-50');

  const mins = Math.floor(meditationSeconds/60);
  userData.practiceHours += Math.floor(mins / 60);
  userData.cultivation += mins * 10;
  
  // 检查是否突破境界
  checkBreakthrough();
  
  saveUserData();
  updateUserUI();
}

// 检查突破境界
function checkBreakthrough() {
  const realmKeys = Object.keys(realmData);
  const currentIndex = realmKeys.indexOf(userData.realm);
  
  if (currentIndex < realmKeys.length - 1 && userData.cultivation >= 1000) {
    const nextRealm = realmKeys[currentIndex + 1];
    userData.realm = nextRealm;
    userData.cultivation = 0;
    userData.breakthroughs++;
    
    // 显示突破特效
    showBreakthroughEffect();
    
    // 随机触发奇遇
    if (Math.random() > 0.5) {
      setTimeout(triggerAdventure, 2000);
    }
  }
}

// 显示突破特效
function showBreakthroughEffect() {
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

// 特色系统数据
const featureSystems = {
  // 境界瓶颈系统
  bottleneck: {
    'chu kui': { task: '完成基础吐纳修炼', requirement: '修炼时长达到10小时' },
    'deng tang': { task: '掌握基础御物术', requirement: '修炼时长达到50小时' },
    'rong hui': { task: '领悟五行感知', requirement: '修炼时长达到100小时' },
    'lu huo': { task: '学会御剑飞行', requirement: '修炼时长达到200小时' },
    'deng feng': { task: '凝聚金丹', requirement: '修炼时长达到300小时' },
    'chu shen': { task: '元婴出窍', requirement: '修炼时长达到500小时' },
    'fan pu': { task: '返璞归真', requirement: '修炼时长达到800小时' },
    'tian ren': { task: '天人合一', requirement: '修炼时长达到1000小时' },
    'chuan shuo': { task: '成为传说', requirement: '修炼时长达到2000小时' }
  },
  
  // 法宝系统
  artifacts: {
    'dan lu': { name: '炼丹炉', desc: '可用于炼制猪蹄丹药', effect: '炼丹成功率+20%', rarity: '稀有' },
    'zhu ti sword': { name: '猪蹄剑', desc: '以猪蹄骨炼制的宝剑', effect: '攻击力+30%', rarity: '史诗' },
    'ling qi bottle': { name: '灵气瓶', desc: '储存天地灵气', effect: '修炼速度+15%', rarity: '稀有' },
    'bao hu lu': { name: '宝葫芦', desc: '可收纳万物', effect: '储物空间+50%', rarity: '传说' }
  },
  
  // 秘境系统
 秘境: {
    'cang jing ge': { name: '藏经阁', desc: '存放古老的猪蹄文化典籍', requirement: '境界达到登堂入室', rewards: ['修炼心法', '丹药配方'] },
    'yao cai yuan': { name: '药菜园', desc: '种植各种天材地宝', requirement: '境界达到融会贯通', rewards: ['稀有药材', '灵气果实'] },
    'zhuan sheng dong': { name: '转生洞', desc: '可重塑体质', requirement: '境界达到炉火纯青', rewards: ['灵根提升', '天赋增强'] },
    'tian di yi': { name: '天地异', desc: '蕴含天地异象', requirement: '境界达到传说境界', rewards: ['传说法宝', '无上心法'] }
  },
  
  // 传承系统
  heritage: []
};

// 检查境界瓶颈
function checkBottleneck() {
  const currentRealm = userData.realm;
  const bottleneck = featureSystems.bottleneck[currentRealm];
  
  if (bottleneck) {
    const requirementMet = userData.practiceHours >= parseInt(bottleneck.requirement.match(/\d+/)[0]);
    if (!requirementMet) {
      showModal('境界瓶颈', `
        <div class="space-y-3">
          <p class="text-paper/70">你当前遇到了境界瓶颈，需要完成以下任务才能突破：</p>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">任务：</span>${bottleneck.task}</div>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-gold">要求：</span>${bottleneck.requirement}</div>
          <div class="p-3 rounded-lg bg-ink/30"><span class="text-jade">当前进度：</span>${userData.practiceHours}小时</div>
        </div>
      `);
    }
  }
}

// 探索秘境
function exploreSecretLand(secretLandId) {
  const secretLand = featureSystems.秘境[secretLandId];
  const realmRequirement = secretLand.requirement;
  
  // 检查境界是否满足要求
  const currentRealmIndex = Object.keys(realmData).indexOf(userData.realm);
  const requiredRealmIndex = Object.keys(realmData).findIndex(key => realmData[key].name === realmRequirement);
  
  if (currentRealmIndex >= requiredRealmIndex) {
    // 探索成功
    const rewards = secretLand.rewards.join('、');
    showModal('秘境探索', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">${secretLand.name}</h3>
        <p class="text-paper/60 mb-3">${secretLand.desc}</p>
        <p class="text-gold mb-3">探索成功！</p>
        <p class="text-paper">获得奖励：${rewards}</p>
      </div>
    `);
  } else {
    // 境界不足
    showModal('秘境探索', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">境界不足</h3>
        <p class="text-paper/60 mb-3">你需要达到${realmRequirement}境界才能进入此秘境</p>
        <p class="text-paper">当前境界：${realmData[userData.realm].name}</p>
      </div>
    `);
  }
}

// 创建传承
function createHeritage(name, desc) {
  const heritage = {
    id: Date.now(),
    name: name,
    desc: desc,
    creator: 'Player',
    creationTime: new Date().toLocaleString()
  };
  
  featureSystems.heritage.push(heritage);
  saveUserData();
  showModal('传承创建', `
    <div class="text-center">
      <h3 class="font-brush text-xl text-gold mb-2">传承创建成功</h3>
      <p class="text-paper/60 mb-3">你的传承已成功创建，将被其他修行者学习</p>
      <p class="text-paper">传承名称：${name}</p>
    </div>
  `);
}

// 使用法宝
function useArtifact(artifactId) {
  const artifact = featureSystems.artifacts[artifactId];
  if (!userData.artifacts.includes(artifactId)) {
    showModal('法宝使用', `
      <div class="text-center">
        <h3 class="font-brush text-xl text-gold mb-2">法宝未获得</h3>
        <p class="text-paper/60">你还没有获得此法宝</p>
      </div>
    `);
    return;
  }
  
  showModal('法宝使用', `
    <div class="text-center">
      <h3 class="font-brush text-xl text-gold mb-2">${artifact.name}</h3>
      <p class="text-paper/60 mb-3">${artifact.desc}</p>
      <p class="text-gold mb-3">效果：${artifact.effect}</p>
      <p class="text-paper/40">稀有度：${artifact.rarity}</p>
    </div>
  `);
}

// 显示秘境探索页面
function showSecretLands() {
  let html = '<div class="grid md:grid-cols-2 gap-4">';
  for (const [key, secretLand] of Object.entries(featureSystems.秘境)) {
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
function showArtifacts() {
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
function showHeritages() {
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
function showCreateHeritageForm() {
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

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
