export const TECHNIQUE_CATEGORIES = {
  cultivation: { name: '修炼功法', icon: '📖', color: 'azure' },
  combat: { name: '战斗技法', icon: '⚔️', color: 'vermilion' },
  defense: { name: '防护秘术', icon: '🛡️', color: 'jade' },
 辅助: { name: '辅助秘法', icon: '✨', color: 'gold' },
  special: { name: '特殊功法', icon: '🔮', color: 'spirit' }
}

export const TECHNIQUES = {
  cultivation: [
    { id: 't01', name: '引气诀', grade: 'R', realm: 'chu kui', effect: { cultivation: 1.1 }, desc: '最基础的修炼法门', price: 0 },
    { id: 't02', name: '吐纳功', grade: 'R', realm: 'chu kui', effect: { cultivation: 1.15 }, desc: '吸收天地灵气', price: 0 },
    { id: 't03', name: '聚气术', grade: 'SR', realm: 'deng tang', effect: { cultivation: 1.25 }, desc: '聚集灵气加速修炼', price: 100 },
    { id: 't04', name: '炼气诀', grade: 'SR', realm: 'deng tang', effect: { cultivation: 1.3 }, desc: '提炼体内灵气', price: 150 },
    { id: 't05', name: '五行归元功', grade: 'SSR', realm: 'rong hui', effect: { cultivation: 1.5, element: 'all' }, desc: '融合五行之气', price: 500 },
    { id: 't06', name: '混沌天经', grade: 'SSR', realm: 'lu huo', effect: { cultivation: 1.8 }, desc: '混沌之力的修炼法门', price: 1000 }
  ],
  combat: [
    { id: 'c01', name: '基础剑诀', grade: 'R', realm: 'chu kui', effect: { attack: 1.1 }, desc: '剑修入门', price: 0 },
    { id: 'c02', name: '烈焰刀法', grade: 'SR', realm: 'deng tang', effect: { attack: 1.25, element: '火' }, desc: '火焰刀气', price: 120 },
    { id: 'c03', name: '寒冰掌', grade: 'SR', realm: 'rong hui', effect: { attack: 1.3, element: '水' }, desc: '寒气逼人', price: 180 },
    { id: 'c04', name: '天雷刀法', grade: 'SSR', realm: 'lu huo', effect: { attack: 1.5, element: '雷' }, desc: '引天雷之力', price: 800 },
    { id: 'c05', name: '太初剑意', grade: 'SSR', realm: 'deng feng', effect: { attack: 1.8 }, desc: '剑道至高境界', price: 1500 }
  ],
  defense: [
    { id: 'd01', name: '护体气功', grade: 'R', realm: 'chu kui', effect: { defense: 1.1 }, desc: '基础护体', price: 0 },
    { id: 'd02', name: '金钟罩', grade: 'SR', realm: 'deng tang', effect: { defense: 1.25 }, desc: '金刚不坏', price: 100 },
    { id: 'd03', name: '玄冰盾', grade: 'SR', realm: 'rong hui', effect: { defense: 1.3, element: '水' }, desc: '寒冰护盾', price: 150 },
    { id: 'd04', name: '戊土神光', grade: 'SSR', realm: 'chu shen', effect: { defense: 1.6, element: '土' }, desc: '厚土之力', price: 1200 }
  ],
  辅助: [
    { id: 'a01', name: '轻身术', grade: 'R', realm: 'chu kui', effect: { speed: 1.1 }, desc: '身轻如燕', price: 0 },
    { id: 'a02', name: '神识诀', grade: 'SR', realm: 'deng tang', effect: { spirit: 1.2 }, desc: '增强神识', price: 80 },
    { id: 'a03', name: '隐匿术', grade: 'SR', realm: 'rong hui', effect: { stealth: 1.3 }, desc: '隐藏气息', price: 120 },
    { id: 'a04', name: '天眼通', grade: 'SSR', realm: 'chu shen', effect: { insight: 1.5 }, desc: '看破虚妄', price: 1000 }
  ],
  special: [
    { id: 's01', name: '夺天造化功', grade: 'SSR', realm: 'fan pu', effect: { all: 1.5 }, desc: '夺取天地造化', price: 3000 },
    { id: 's02', name: '大道归一诀', grade: 'SSR', realm: 'tian ren', effect: { all: 2.0 }, desc: '万法归一', price: 5000 }
  ]
}

export const PILLS = {
  cultivation: [
    { id: 'p01', name: '聚气丹', grade: 'R', effect: { cultivation: 50 }, price: 10, desc: '增加修为' },
    { id: 'p02', name: '培元丹', grade: 'SR', effect: { cultivation: 200 }, price: 50, desc: '稳固根基' },
    { id: 'p03', name: '凝婴丹', grade: 'SSR', effect: { cultivation: 1000 }, price: 300, desc: '助结元婴' }
  ],
  breakthrough: [
    { id: 'b01', name: '破境丹', grade: 'R', effect: { breakthroughRate: 0.1 }, price: 100, desc: '提升突破概率' },
    { id: 'b02', name: '悟道丹', grade: 'SR', effect: { breakthroughRate: 0.25 }, price: 500, desc: '增加悟性' },
    { id: 'b03', name: '大道丹', grade: 'SSR', effect: { breakthroughRate: 0.5 }, price: 2000, desc: '大幅提升突破概率' }
  ],
  battle: [
    { id: 'bt01', name: '大力丸', grade: 'R', effect: { attack: 1.2 }, price: 30, desc: '临时提升攻击' },
    { id: 'bt02', name: '金刚丹', grade: 'SR', effect: { defense: 1.3 }, price: 80, desc: '临时提升防御' },
    { id: 'bt03', name: '九转还魂丹', grade: 'SSR', effect: { revive: true }, price: 500, desc: '战斗复活一次' }
  ],
  special: [
    { id: 'sp01', name: '洗髓丹', grade: 'SR', effect: { rootChange: true }, price: 1000, desc: '改变灵根属性' },
    { id: 'sp02', name: '寿元丹', grade: 'SSR', effect: { lifespan: 100 }, price: 3000, desc: '增加百年寿元' }
  ]
}

export const SECRET_LANDS = [
  {
    id: 'sl01',
    name: '灵气山谷',
    realm: 'chu kui',
    difficulty: 1,
    enemies: [
      { name: '野猪', attack: 8, defense: 3, hp: 30 },
      { name: '毒蛇', attack: 12, defense: 2, hp: 25 }
    ],
    rewards: [
      { type: 'lingqi', min: 20, max: 50 },
      { type: 'pill', pool: 'cultivation' }
    ],
    desc: '灵气浓郁的山谷，适合新手历练'
  },
  {
    id: 'sl02',
    name: '寒冰洞府',
    realm: 'deng tang',
    difficulty: 3,
    enemies: [
      { name: '冰魔', attack: 20, defense: 10, hp: 80 },
      { name: '雪怪', attack: 25, defense: 15, hp: 100 }
    ],
    rewards: [
      { type: 'lingqi', min: 100, max: 200 },
      { type: 'technique', pool: 'defense' }
    ],
    desc: '寒冷彻骨的洞府，内有冰系功法'
  },
  {
    id: 'sl03',
    name: '烈焰山谷',
    realm: 'rong hui',
    difficulty: 5,
    enemies: [
      { name: '火焰巨人', attack: 40, defense: 25, hp: 150 },
      { name: '炎魔', attack: 50, defense: 20, hp: 120 }
    ],
    rewards: [
      { type: 'lingqi', min: 300, max: 500 },
      { type: 'technique', pool: 'combat' },
      { type: 'artifact', rarity: 'SR' }
    ],
    desc: '火山深处的秘境，内有火系至宝'
  },
  {
    id: 'sl04',
    name: '上古遗迹',
    realm: 'lu huo',
    difficulty: 8,
    enemies: [
      { name: '守护傀儡', attack: 80, defense: 50, hp: 300 },
      { name: '古修残魂', attack: 100, defense: 40, hp: 250 }
    ],
    rewards: [
      { type: 'lingqi', min: 1000, max: 2000 },
      { type: 'technique', pool: 'special' },
      { type: 'artifact', rarity: 'SSR' }
    ],
    desc: '上古修士留下的遗迹，内藏大机缘'
  },
  {
    id: 'sl05',
    name: '混沌空间',
    realm: 'deng feng',
    difficulty: 12,
    enemies: [
      { name: '混沌巨兽', attack: 200, defense: 100, hp: 800 },
      { name: '天道意志', attack: 300, defense: 150, hp: 1000 }
    ],
    rewards: [
      { type: 'lingqi', min: 5000, max: 10000 },
      { type: 'technique', pool: 'special' },
      { type: 'artifact', rarity: 'SSR' },
      { type: 'pill', pool: 'special' }
    ],
    desc: '传说中的混沌空间，唯有化神可入'
  }
]

export const SECT_DATA = [
  {
    id: 'sect_1',
    name: '青云宗',
    element: '木',
    type: '正派',
    desc: '以木系功法为主，注重防御与治疗',
    bonus: { cultivation: 1.1, defense: 1.15 },
    techniques: ['青云诀', '青木神功', '万木逢春'],
    requirement: { realm: 'deng tang' }
  },
  {
    id: 'sect_2',
    name: '烈焰门',
    element: '火',
    type: '正派',
    desc: '以火系功法为主，攻击极为凌厉',
    bonus: { cultivation: 1.1, attack: 1.2 },
    techniques: ['烈焰心法', '焚天功', '三昧真火'],
    requirement: { realm: 'deng tang' }
  },
  {
    id: 'sect_3',
    name: '玄冰宫',
    element: '水',
    type: '正道',
    desc: '以水系功法为主，擅长控制与防御',
    bonus: { cultivation: 1.1, defense: 1.1, spirit: 1.15 },
    techniques: ['玄冰心法', '天河诀', '冰魄神光'],
    requirement: { realm: 'rong hui' }
  },
  {
    id: 'sect_4',
    name: '万剑宗',
    element: '金',
    type: '剑修',
    desc: '以剑道为主，攻击力冠绝天下',
    bonus: { attack: 1.25, cultivation: 1.05 },
    techniques: ['万剑诀', '太初剑意', '诛仙剑阵'],
    requirement: { realm: 'rong hui' }
  },
  {
    id: 'sect_5',
    name: '天魔宗',
    element: '暗',
    type: '魔道',
    desc: '以暗系功法为主，修炼速度极快',
    bonus: { cultivation: 1.2, attack: 1.1 },
    techniques: ['天魔功', '化身魔功', '万魔噬天'],
    requirement: { realm: 'lu huo' }
  }
]

export const SPIRIT_BEASTS = [
  {
    id: 'sb01',
    name: '青蛇',
    element: '木',
    grade: 'R',
    attack: 5,
    defense: 5,
    skill: '缠绕',
    desc: '普通灵兽，稍有灵智'
  },
  {
    id: 'sb02',
    name: '烈焰马',
    element: '火',
    grade: 'SR',
    attack: 15,
    defense: 10,
    skill: '烈焰冲击',
    desc: '火焰之灵，奔跑如飞'
  },
  {
    id: 'sb03',
    name: '寒冰凤凰',
    element: '水',
    grade: 'SSR',
    attack: 50,
    defense: 40,
    skill: '冰封千里',
    desc: '极北神兽，掌控冰雪'
  },
  {
    id: 'sb04',
    name: '金翅大鹏',
    element: '金',
    grade: 'SSR',
    attack: 60,
    defense: 30,
    skill: '撕裂苍穹',
    desc: '速度最快的神禽'
  },
  {
    id: 'sb05',
    name: '青龙',
    element: '木',
    grade: 'SSR',
    attack: 80,
    defense: 80,
    skill: '呼风唤雨',
    desc: '东方神兽，四圣之首'
  }
]
