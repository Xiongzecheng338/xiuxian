// 境界数据
export const realmData = {
  'chu kui': { name:'初窥门径', icon:'窥', color:'bronze', desc:'初入修行之门，感知天地灵气', lifespan:'凡人寿数', stages:['初期-气感初生','中期-灵气感知','后期-引气入体'], abilities:['感知灵气','引气入体','基础吐纳','强身健体'], next:'登堂入室' },
  'deng tang': { name:'登堂入室', icon:'堂', color:'jade', desc:'掌握修行基础，开辟丹田气海', lifespan:'百五十载', stages:['初期-丹田初开','中期-气海成形','后期-气旋初成'], abilities:['开辟丹田','气海成形','轻身术','基础御物'], next:'融会贯通' },
  'rong hui': { name:'融会贯通', icon:'融', color:'azure', desc:'功法与修为融会贯通，道基初现', lifespan:'二百载', stages:['初期-功法入门','中期-招式纯熟','后期-道基初现'], abilities:['御器飞行','神识初显','辟谷不食','五行感知'], next:'炉火纯青' },
  'lu huo': { name:'炉火纯青', icon:'炉', color:'vermilion', desc:'修为精进，如炉火纯青', lifespan:'三百载', stages:['初期-道基稳固','中期-法力大增','后期-神通初显'], abilities:['御剑飞行','神通初显','瞬息千里','寿元大增'], next:'登峰造极' },
  'deng feng': { name:'登峰造极', icon:'峰', color:'gold', desc:'修为达到顶峰，金丹成形', lifespan:'五百载', stages:['初期-金丹初凝','中期-金丹稳固','后期-金丹圆满'], abilities:['金丹大成','御剑飞行','神通广大','移山填海'], next:'出神入化' },
  'chu shen': { name:'出神入化', icon:'神', color:'spirit', desc:'神念通达，元婴出窍', lifespan:'千载', stages:['初期-元婴初生','中期-元婴成长','后期-元婴大成'], abilities:['元婴出窍','瞬移千里','分神化身','夺舍重生'], next:'返璞归真' },
  'fan pu': { name:'返璞归真', icon:'璞', color:'paper', desc:'脱去铅华，返璞归真', lifespan:'三千载', stages:['初期-返璞初现','中期-真意通达','后期-大道可期'], abilities:['虚室生白','真意通达','法则初悟','创造空间'], next:'天人合一' },
  'tian ren': { name:'天人合一', icon:'天', color:'darkgold', desc:'与天地合一，掌控法则', lifespan:'万载', stages:['初期-天人感应','中期-法则掌控','后期-道韵天成'], abilities:['天人感应','法则掌控','不死不灭','创造生灵'], next:'传说境界' },
  'chuan shuo': { name:'传说境界', icon:'传', color:'crimson', desc:'超越天地，成为传说', lifespan:'与天同寿', stages:['初期-传说初成','中期-传说稳固','后期-传说圆满'], abilities:['言出法随','创造世界','超脱轮回','与天同寿'], next:'飞升仙界' }
};

// 器官对应数据
export const organData = {
  lung: { name:'肺', element:'金', color:'bronze', realm:'初窥门径', desc:'肺主气，司呼吸', practice:'每日清晨面向东方深呼吸' },
  kidney: { name:'肾', element:'水', color:'jade', realm:'登堂入室', desc:'肾主水，藏精', practice:'节制房事，按摩肾俞穴' },
  heart: { name:'心', element:'火', color:'vermilion', realm:'炉火纯青', desc:'心主火，藏神', practice:'静心养神，意守心窍' },
  liver: { name:'肝', element:'木', color:'spirit', realm:'出神入化', desc:'肝主木，藏魂', practice:'保持情绪舒畅，丑时熟睡' },
  spleen: { name:'脾', element:'土', color:'gold', realm:'登峰造极', desc:'脾主土，藏意', practice:'饮食有节，辰时进食' }
};

// 猪蹄文化数据
export const pigData = {
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

// 功法数据
export const techniqueData = {
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

// 丹药数据
export const alchemyData = {
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

// 养生数据
export const healthData = [
  { title:'子时养阴', icon:'fa-moon', color:'azure', desc:'23:00-1:00入睡滋养肾阴', xuanxue:'子时一阳生，阴极阳生', science:'肝脏排毒关键时期', tips:['睡前热水泡脚','保持卧室安静'] },
  { title:'卯时采气', icon:'fa-sun', color:'jade', desc:'5:00-7:00采天地阳气', xuanxue:'卯时阳气始生', science:'清晨空气含氧量高', tips:['起床后饮温水','配合吐纳之术'] },
  { title:'饮食调和', icon:'fa-utensils', color:'gold', desc:'五味入五脏，五色补五行', xuanxue:'五味调和，五脏得养', science:'均衡饮食助营养吸收', tips:['早餐宜温热','晚餐宜清淡'] },
  { title:'运动炼体', icon:'fa-running', color:'vermilion', desc:'动则生阳，静则生阴', xuanxue:'阳气升发驱除寒湿', science:'增强心肺功能', tips:['运动量循序渐进','持之以恒'] }
];

// 神仙列传数据
export const legendData = [
  { name:'彭祖', icon:'彭', color:'gold', title:'寿八百载', desc:'善养生之术，创导引行气之法', quote:'道不在烦，心无烦，形无极，此可长生' },
  { name:'张三丰', icon:'丰', color:'spirit', title:'太极宗师', desc:'武当派创始人', quote:'太极者，无极而生，动静之机' },
  { name:'吕洞宾', icon:'吕', color:'jade', title:'纯阳祖师', desc:'八仙之一', quote:'一粒金丹吞入腹，始知我命不由天' },
  { name:'老子', icon:'老', color:'azure', title:'道家始祖', desc:'著《道德经》五千言', quote:'道可道，非常道' },
  { name:'葛洪', icon:'葛', color:'vermilion', title:'抱朴子', desc:'东晋道教学者', quote:'求长生，诀在于志' },
  { name:'陈抟', icon:'陈', color:'paper', title:'睡仙', desc:'以睡功闻名', quote:'至人之睡，先睡心，后睡眼' }
];

// 悟性问答数据
export const wisdomQuestions = [
  { q:'「道生一，一生二，二生三，三生万物」何解？', opts:['道生万物','数学为本','一气化阴阳生万物'], ans:3 },
  { q:'「上善若水」何意？', opts:['水最善良','滋养万物而不争','要像水软弱'], ans:2 },
  { q:'「无为而无不为」何解？', opts:['什么都不做','顺应自然而为','消极等待'], ans:2 },
  { q:'「道法自然」何为自然？', opts:['山川河流','自然而然','随意而为'], ans:2 },
  { q:'「金丹大道」何为金丹？', opts:['黄金做的丹','内丹修炼所结','仙丹妙药'], ans:2 },
  { q:'「炼精化气」此为何功？', opts:['外丹术','内丹术','符箓术'], ans:2 }
];

// 门派数据
export const sectData = {
  qingyun: { name: '青云门', desc: '以猪蹄烹饪技艺闻名，注重基础修炼', bonus: '修炼速度+10%' },
  tianyin: { name: '天音阁', desc: '擅长猪蹄食疗，注重养生之道', bonus: '寿元+20%' },
  huashan: { name: '华山派', desc: '以猪蹄烤制技艺著称，注重实战能力', bonus: '攻击力+15%' },
  wudang: { name: '武当派', desc: '融合猪蹄文化与道家修炼，注重内力修为', bonus: '内力+25%' }
};

// 奇遇数据
export const adventureData = [
  { id: 1, name: '猪蹄奇遇', desc: '在山林中发现一只奇特的猪蹄，食用后修为大增', reward: '修为+100' },
  { id: 2, name: '丹炉现世', desc: '发现一个古老的丹炉，可用来炼制猪蹄丹药', reward: '获得法宝：丹炉' },
  { id: 3, name: '高人指点', desc: '遇到一位烹饪高人，传授猪蹄制作技艺', reward: '技艺+5' },
  { id: 4, name: '秘境探索', desc: '进入一处秘境，发现大量猪蹄资源', reward: '资源+500' }
];

// 修真语录数据
export const quotesData = [
  { text: '道可道，非常道；名可名，非常名。', source: '《道德经》' },
  { text: '夫求长生，修至道，诀在于志，不在于富贵名利。', source: '抱朴子' },
  { text: '太极者，无极而生，动静之机。', source: '张三丰' },
  { text: '一粒金丹吞入腹，始知我命不由天。', source: '吕洞宾' },
  { text: '道不在烦，心无烦，形无极，此可长生。', source: '彭祖' },
  { text: '至人之睡，先睡心，后睡眼。', source: '陈抟' },
  { text: '上善若水，水善利万物而不争。', source: '《道德经》' },
  { text: '无为而无不为。', source: '《道德经》' },
  { text: '道法自然。', source: '《道德经》' },
  { text: '道生一，一生二，二生三，三生万物。', source: '《道德经》' }
];

// 特色系统数据
export const featureSystems = {
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
  secretLands: {
    'cang jing ge': { name: '藏经阁', desc: '存放古老的猪蹄文化典籍', requirement: '境界达到登堂入室', rewards: ['修炼心法', '丹药配方'] },
    'yao cai yuan': { name: '药菜园', desc: '种植各种天材地宝', requirement: '境界达到融会贯通', rewards: ['稀有药材', '灵气果实'] },
    'zhuan sheng dong': { name: '转生洞', desc: '可重塑体质', requirement: '境界达到炉火纯青', rewards: ['灵根提升', '天赋增强'] },
    'tian di yi': { name: '天地异', desc: '蕴含天地异象', requirement: '境界达到传说境界', rewards: ['传说法宝', '无上心法'] }
  },
  
  // 传承系统
  heritage: []
};

// 语言数据
export const langData = {
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