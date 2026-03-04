// 英语学习模块

import { vocabularyCategories, grammarCategories, conversationScenarios, englishGames, englishResources, studyPlans, learningTips, cultivationContent, cultivationContentEnglish } from '../data/englishData.js';
import { createFragment, appendElements, batchUpdate } from '../utils/performance.js';

// DOM元素缓存
let elements = {};
// 当前语言状态
let currentLanguage = 'zh'; // zh 或 en

// 初始化英语学习模块
export function initEnglishModule() {
  // 缓存DOM元素
  elements.englishContent = document.getElementById('englishContent');
  elements.englishTabs = document.getElementById('englishTabs');
}

// 显示英语学习页面
export function showEnglishPage() {
  if (!elements.englishContent) {
    initEnglishModule();
  }
  
  // 生成英语学习页面内容
  const html = `
    <div class="text-center mb-6">
      <h2 class="font-brush text-2xl md:text-3xl text-paper mb-2">${currentLanguage === 'zh' ? '英语学习中心' : 'English Learning Center'}</h2>
      <p class="text-paper/60 text-sm">${currentLanguage === 'zh' ? '提升英语能力，开启语言之旅' : 'Enhance your English skills, start your language journey'}</p>
    </div>
    
    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <button class="px-4 py-2 rounded-lg border border-gold/30 text-gold bg-gold/10" onclick="showEnglishTab('vocabulary')">${currentLanguage === 'zh' ? '词汇学习' : 'Vocabulary'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('grammar')">${currentLanguage === 'zh' ? '语法学习' : 'Grammar'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('conversation')">${currentLanguage === 'zh' ? '对话练习' : 'Conversation'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('games')">${currentLanguage === 'zh' ? '英语游戏' : 'Games'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('resources')">${currentLanguage === 'zh' ? '学习资源' : 'Resources'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('study-plan')">${currentLanguage === 'zh' ? '学习计划' : 'Study Plan'}</button>
      <button class="px-4 py-2 rounded-lg border border-paper/20 text-paper/60 hover:border-gold/30" onclick="showEnglishTab('tips')">${currentLanguage === 'zh' ? '学习技巧' : 'Tips'}</button>
    </div>
    
    <div class="flex justify-center mb-6">
      <button id="languageToggle" class="btn-gold" onclick="toggleLanguage()">
        <i class="fas fa-exchange-alt mr-2"></i>${currentLanguage === 'zh' ? '切换到修仙主题 (中文)' : 'Switch to English Learning'}
      </button>
    </div>
    
    <div id="englishContent" class="space-y-6"></div>
  `;
  
  // 更新页面内容
  const page = document.getElementById('page-english');
  if (page) {
    page.innerHTML = html;
    // 重新初始化元素缓存
    initEnglishModule();
    // 默认显示词汇学习
    showEnglishTab('vocabulary');
  }
}

// 切换语言
export function toggleLanguage() {
  currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
  showEnglishPage();
}

// 显示英语学习标签页
export function showEnglishTab(tab) {
  // 更新标签样式
  document.querySelectorAll('#page-english button:not(#languageToggle)').forEach(btn => {
    btn.classList.remove('bg-gold/10', 'border-gold/30', 'text-gold');
    btn.classList.add('border-paper/20', 'text-paper/60');
  });
  
  if (event.target.id !== 'languageToggle') {
    event.target.classList.add('bg-gold/10', 'border-gold/30', 'text-gold');
    event.target.classList.remove('border-paper/20', 'text-paper/60');
  }
  
  // 根据标签显示对应内容
  switch(tab) {
    case 'vocabulary':
      showVocabulary();
      break;
    case 'grammar':
      showGrammar();
      break;
    case 'conversation':
      showConversation();
      break;
    case 'games':
      showGames();
      break;
    case 'resources':
      showResources();
      break;
    case 'study-plan':
      showStudyPlan();
      break;
    case 'tips':
      showLearningTips();
      break;
  }
}

// 显示词汇学习
export function showVocabulary() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    vocabularyCategories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${category.color}/20 flex items-center justify-center">
            <i class="fas ${category.icon} text-${category.color} text-xl"></i>
          </div>
          <h3 class="font-brush text-lg text-paper">${category.name}</h3>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          ${category.words.map(word => `
            <div class="p-3 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
              <div class="flex justify-between items-center mb-1">
                <span class="font-brush text-${category.color}">${word.word}</span>
                <span class="text-paper/40 text-xs">${word.pronunciation}</span>
              </div>
              <div class="text-paper/60 text-sm mb-1">${word.meaning}</div>
              <div class="text-paper/40 text-xs italic">${word.example}</div>
            </div>
          `).join('')}
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-jade/20 flex items-center justify-center">
          <i class="fas fa-om text-jade text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivation Basics</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">The Path to Immortality</h4>
          <p class="text-paper/70 text-sm">Cultivation is the practice of refining one's spiritual energy to achieve immortality. It involves meditation, energy cultivation, and spiritual refinement.</p>
          <p class="text-paper/60 text-sm mt-2">The journey begins with Qi Refining, where cultivators learn to absorb and control spiritual energy from the environment.</p>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Spiritual Realms</h4>
          <p class="text-paper/70 text-sm">There are nine major cultivation realms, each representing a significant breakthrough in power and understanding.</p>
          <ul class="text-paper/60 text-sm mt-2 space-y-1">
            <li>• Qi Refining</li>
            <li>• Foundation Establishment</li>
            <li>• Golden Core</li>
            <li>• Nascent Soul</li>
            <li>• Soul Transformation</li>
            <li>• Heavenly Immortal</li>
            <li>• True Immortal</li>
            <li>• Immortal Emperor</li>
            <li>• Dao Integration</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Cultivation Techniques</h4>
          <p class="text-paper/70 text-sm">Different sects and clans have their own unique cultivation techniques, each with its own strengths and focuses.</p>
          <p class="text-paper/60 text-sm mt-2">Techniques can focus on different aspects such as martial arts, alchemy, formations, or spiritual healing.</p>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示语法学习
export function showGrammar() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    grammarCategories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${category.color}/20 flex items-center justify-center">
            <i class="fas ${category.icon} text-${category.color} text-xl"></i>
          </div>
          <h3 class="font-brush text-lg text-paper">${category.name}</h3>
        </div>
        <div class="space-y-4">
          ${category.topics.map(topic => `
            <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
              <h4 class="font-brush text-${category.color} mb-2">${topic.title}</h4>
              <p class="text-paper/60 text-sm mb-3">${topic.explanation}</p>
              <div class="mb-2">
                <h5 class="text-paper/50 text-xs mb-1">规则：</h5>
                <p class="text-paper/70 text-sm">${topic.rules}</p>
              </div>
              <div>
                <h5 class="text-paper/50 text-xs mb-1">例句：</h5>
                <ul class="text-paper/70 text-sm space-y-1">
                  ${topic.examples.map(example => `<li>• ${example}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-clock text-gold text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">The Language of Cultivation</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Speaking Like a Cultivator</h4>
          <p class="text-paper/70 text-sm">In the cultivation world, precise language is essential for communicating complex spiritual concepts.</p>
          <p class="text-paper/60 text-sm mt-2">Cultivators use specific terminology to describe techniques, realms, and spiritual phenomena.</p>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">Spiritual Communication</h4>
          <p class="text-paper/70 text-sm">Advanced cultivators can communicate telepathically, but verbal language remains important for teaching and social interaction.</p>
          <p class="text-paper/60 text-sm mt-2">The ability to articulate spiritual experiences is crucial for passing on knowledge to future generations.</p>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Ancient Texts</h4>
          <p class="text-paper/70 text-sm">Many cultivation techniques are recorded in ancient texts that require careful interpretation.</p>
          <p class="text-paper/60 text-sm mt-2">Mastery of the language of these texts is essential for accessing their full wisdom.</p>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示对话练习
export function showConversation() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    conversationScenarios.forEach(scenario => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${scenario.color}/20 flex items-center justify-center">
            <i class="fas ${scenario.icon} text-${scenario.color} text-xl"></i>
          </div>
          <h3 class="font-brush text-lg text-paper">${scenario.name}</h3>
        </div>
        <div class="space-y-3">
          ${scenario.dialogues.map((dialogue, index) => `
            <div class="p-3 rounded-lg ${index % 2 === 0 ? 'bg-ink/30' : 'bg-ink/40'} transition-all duration-300">
              <div class="flex justify-between items-center mb-1">
                <span class="text-${scenario.color} font-brush">${dialogue.role}</span>
              </div>
              <div class="text-paper mb-1">${dialogue.text}</div>
              <div class="text-paper/60 text-sm">${dialogue.translation}</div>
            </div>
          `).join('')}
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-handshake text-gold text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivator Conversations</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Greeting a Fellow Cultivator</h4>
          <div class="space-y-3">
            <div class="p-3 rounded-lg bg-ink/40">
              <div class="text-gold font-brush mb-1">Cultivator A:</div>
              <div class="text-paper">Greetings, fellow cultivator! How is your cultivation progressing?</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/30">
              <div class="text-jade font-brush mb-1">Cultivator B:</div>
              <div class="text-paper">I'm making steady progress. I've just reached the late stage of Qi Refining. And you?</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/40">
              <div class="text-gold font-brush mb-1">Cultivator A:</div>
              <div class="text-paper">I'm preparing to breakthrough to Foundation Establishment. Would you like to meditate together?</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/30">
              <div class="text-jade font-brush mb-1">Cultivator B:</div>
              <div class="text-paper">That would be wonderful! Let's find a quiet place with abundant spiritual energy.</div>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Discussing Techniques</h4>
          <div class="space-y-3">
            <div class="p-3 rounded-lg bg-ink/40">
              <div class="text-azure font-brush mb-1">Master:</div>
              <div class="text-paper">What technique have you been practicing lately?</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/30">
              <div class="text-vermilion font-brush mb-1">Disciple:</div>
              <div class="text-paper">I've been studying the Five Elements Palm technique, Master.</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/40">
              <div class="text-azure font-brush mb-1">Master:</div>
              <div class="text-paper">That's a good choice. Remember to focus on the flow of energy through your meridians.</div>
            </div>
            <div class="p-3 rounded-lg bg-ink/30">
              <div class="text-vermilion font-brush mb-1">Disciple:</div>
              <div class="text-paper">Yes, Master. I've been meditating daily to improve my energy control.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示英语游戏
export function showGames() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    const card = document.createElement('div');
    card.className = 'glass-card p-5 animate-fade';
    card.innerHTML = `
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${englishGames.map(game => `
          <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300 cursor-pointer">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-${game.color}/20 flex items-center justify-center">
                <i class="fas ${game.icon} text-${game.color} text-lg"></i>
              </div>
              <h3 class="font-brush text-paper">${game.name}</h3>
            </div>
            <p class="text-paper/60 text-sm mb-2">${game.description}</p>
            <div class="text-paper/40 text-xs">难度：${game.difficulty}</div>
          </div>
        `).join('')}
      </div>
    `;
    fragment.appendChild(card);
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-jade/20 flex items-center justify-center">
          <i class="fas fa-gamepad text-jade text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivation Games</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">Spiritual Energy Training</h4>
          <p class="text-paper/60 text-sm">Test your ability to control spiritual energy with this interactive game.</p>
          <div class="mt-3 text-sm text-paper/40">Difficulty: Intermediate</div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Realm Recognition</h4>
          <p class="text-paper/60 text-sm">Identify cultivation realms based on descriptions and characteristics.</p>
          <div class="mt-3 text-sm text-paper/40">Difficulty: Advanced</div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Pill Refinement Simulator</h4>
          <p class="text-paper/60 text-sm">Try your hand at refining pills with different ingredients and techniques.</p>
          <div class="mt-3 text-sm text-paper/40">Difficulty: Expert</div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-vermilion mb-2">Martial Arts Challenge</h4>
          <p class="text-paper/60 text-sm">Test your knowledge of cultivation martial arts techniques.</p>
          <div class="mt-3 text-sm text-paper/40">Difficulty: Intermediate</div>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示学习资源
export function showResources() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    englishResources.forEach(resource => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${resource.color}/20 flex items-center justify-center">
            <i class="fas ${resource.icon} text-${resource.color} text-xl"></i>
          </div>
          <h3 class="font-brush text-lg text-paper">${resource.name}</h3>
        </div>
        <div class="space-y-3">
          ${resource.resources.map(item => `
            <div class="p-3 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
              <div class="font-brush text-${resource.color} mb-1">${item.name}</div>
              ${item.author ? `<div class="text-paper/60 text-xs mb-1">作者：${item.author}</div>` : ''}
              <div class="text-paper/60 text-sm">${item.description}</div>
              ${item.url ? `<div class="mt-2"><a href="${item.url}" target="_blank" class="text-${resource.color} text-sm hover:underline">访问链接</a></div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-globe text-gold text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivation Resources</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Ancient Texts</h4>
          <p class="text-paper/60 text-sm">Ancient cultivation texts contain profound wisdom and techniques passed down through generations.</p>
          <ul class="text-paper/60 text-sm mt-2 space-y-1">
            <li>• Dao De Jing</li>
            <li>• Zhuangzi</li>
            <li>• Yellow Emperor's Inner Canon</li>
            <li>• I Ching</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">Spiritual Places</h4>
          <p class="text-paper/60 text-sm">Certain locations are known for their abundant spiritual energy and are ideal for cultivation.</p>
          <ul class="text-paper/60 text-sm mt-2 space-y-1">
            <li>• Sacred Mountains</li>
            <li>• Spiritual Caves</li>
            <li>• Immortal Springs</li>
            <li>• Heavenly Peaks</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Cultivation Tools</h4>
          <p class="text-paper/60 text-sm">Various tools and artifacts can aid in the cultivation process.</p>
          <ul class="text-paper/60 text-sm mt-2 space-y-1">
            <li>• Meditation Mats</li>
            <li>• Spiritual Stones</li>
            <li>• Alchemy Cauldrons</li>
            <li>• Flying Swords</li>
          </ul>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示学习计划
export function showStudyPlan() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    studyPlans.forEach(plan => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${plan.color}/20 flex items-center justify-center">
            <i class="fas ${plan.icon} text-${plan.color} text-xl"></i>
          </div>
          <div>
            <h3 class="font-brush text-lg text-paper">${plan.name}</h3>
            <div class="text-paper/60 text-xs">${plan.duration}</div>
          </div>
        </div>
        <div class="mb-4">
          <h4 class="text-paper/70 text-sm mb-2">学习目标：</h4>
          <ul class="text-paper/60 text-sm space-y-1">
            ${plan.goals.map(goal => `<li>• ${goal}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-paper/70 text-sm mb-2">学习计划：</h4>
          <div class="grid md:grid-cols-2 gap-2">
            ${plan.schedule.map(item => `
              <div class="p-2 rounded-lg bg-ink/30">
                <div class="text-${plan.color} text-sm font-brush">${item.day}</div>
                <div class="text-paper/60 text-xs">${item.activity}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-user-graduate text-gold text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivation Journey</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Beginner's Path</h4>
          <p class="text-paper/70 text-sm">The first steps in cultivation focus on building a strong foundation.</p>
          <div class="mt-3">
            <h5 class="text-paper/50 text-xs mb-2">3-Month Plan:</h5>
            <ul class="text-paper/60 text-sm space-y-1">
              <li>• Master basic meditation techniques</li>
              <li>• Learn to sense and absorb spiritual energy</li>
              <li>• Practice basic energy circulation</li>
              <li>• Study foundational cultivation theory</li>
            </ul>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">Intermediate cultivation</h4>
          <p class="text-paper/70 text-sm">As you progress, you'll begin to develop more advanced abilities.</p>
          <div class="mt-3">
            <h5 class="text-paper/50 text-xs mb-2">6-Month Plan:</h5>
            <ul class="text-paper/60 text-sm space-y-1">
              <li>• Refine your energy control</li>
              <li>• Learn basic cultivation techniques</li>
              <li>• Begin practicing martial arts</li>
              <li>• Study alchemy fundamentals</li>
            </ul>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-vermilion mb-2">Advanced cultivation</h4>
          <p class="text-paper/70 text-sm">Advanced cultivators focus on spiritual refinement and enlightenment.</p>
          <div class="mt-3">
            <h5 class="text-paper/50 text-xs mb-2">12-Month Plan:</h5>
            <ul class="text-paper/60 text-sm space-y-1">
              <li>• Master advanced cultivation techniques</li>
              <li>• Develop your spiritual awareness</li>
              <li>• Explore specialized fields (alchemy, formations, etc.)</li>
              <li>• Seek spiritual enlightenment</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 显示学习技巧
export function showLearningTips() {
  const fragment = createFragment();
  
  if (currentLanguage === 'zh') {
    // 显示英语学习内容
    learningTips.forEach(tip => {
      const card = document.createElement('div');
      card.className = 'glass-card p-5 mb-4 animate-fade';
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full bg-${tip.color}/20 flex items-center justify-center">
            <i class="fas ${tip.icon} text-${tip.color} text-xl"></i>
          </div>
          <h3 class="font-brush text-lg text-paper">${tip.name}</h3>
        </div>
        <div class="space-y-2">
          ${tip.tips.map((item, index) => `
            <div class="flex items-start gap-2 p-2 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
              <span class="text-${tip.color} font-brush mt-0.5">${index + 1}.</span>
              <span class="text-paper/60">${item}</span>
            </div>
          `).join('')}
        </div>
      `;
      fragment.appendChild(card);
    });
  } else {
    // 显示修仙主题内容（全英文）
    const card = document.createElement('div');
    card.className = 'glass-card p-5 mb-4 animate-fade';
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
          <i class="fas fa-lightbulb text-gold text-xl"></i>
        </div>
        <h3 class="font-brush text-lg text-paper">Cultivation Wisdom</h3>
      </div>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-gold mb-2">Meditation Tips</h4>
          <ul class="text-paper/60 text-sm space-y-2">
            <li>• Find a quiet, spiritually charged location</li>
            <li>• Maintain proper posture to allow energy flow</li>
            <li>• Focus on your breathing to calm the mind</li>
            <li>• Practice daily, even if only for a short time</li>
            <li>• Be patient - progress takes time</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-jade mb-2">Energy Cultivation</h4>
          <ul class="text-paper/60 text-sm space-y-2">
            <li>• Learn to sense spiritual energy in your surroundings</li>
            <li>• Practice circulating energy through your meridians</li>
            <li>• Balance yin and yang energies within yourself</li>
            <li>• Avoid forcing energy - let it flow naturally</li>
            <li>• Regularly cleanse your energy channels</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-ink/30 hover:bg-ink/40 transition-all duration-300">
          <h4 class="font-brush text-azure mb-2">Spiritual Growth</h4>
          <ul class="text-paper/60 text-sm space-y-2">
            <li>• Cultivate a peaceful and compassionate mindset</li>
            <li>• Learn from experienced cultivators</li>
            <li>• Study ancient texts for wisdom</li>
            <li>• Embrace challenges as opportunities for growth</li>
            <li>• Stay true to your path and avoid shortcuts</li>
          </ul>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  }
  
  batchUpdate(() => {
    elements.englishContent.innerHTML = '';
    elements.englishContent.appendChild(fragment);
  });
}

// 全局函数
export function loadLanguageContent(lang) {
  currentLanguage = lang;
  showEnglishPage();
}
