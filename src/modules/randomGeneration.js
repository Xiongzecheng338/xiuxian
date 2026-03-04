// 随机生成模块

// NPC名称前缀和后缀
const npcNamePrefixes = ['张', '王', '李', '赵', '钱', '孙', '周', '吴', '郑', '王', '陈', '林', '黄', '杨', '刘', '马', '朱', '胡', '郭', '何'];
const npcNameSuffixes = ['风', '云', '雨', '雷', '电', '山', '海', '天', '地', '玄', '黄', '宇', '宙', '洪', '荒', '龙', '凤', '虎', '豹', '狼'];
const npcTitles = ['道长', '真人', '仙子', '居士', '散人', '大师', '长老', '掌门', '教主', '仙人'];

// NPC职业
const npcProfessions = [
  { name: '剑修', desc: '擅长御剑飞行，攻击力强大', skills: ['御剑诀', '剑气纵横', '剑心通明'] },
  { name: '符修', desc: '擅长画符制咒，法术多样', skills: ['符箓术', '驱鬼咒', '安神符'] },
  { name: '丹修', desc: '擅长炼丹制药，辅助能力强', skills: ['炼丹术', '医道', '补气丹'] },
  { name: '阵修', desc: '擅长布阵困敌，防御能力强', skills: ['困仙阵', '聚灵阵', '迷魂阵'] },
  { name: '体修', desc: '擅长肉身修炼，防御力强大', skills: ['金刚不坏', '力拔山河', '铜皮铁骨'] }
];

// 秘境类型
const secretLandTypes = [
  { name: '山洞', desc: '隐藏在深山之中的神秘洞穴', features: ['幽暗潮湿', '怪石嶙峋', '机关重重'] },
  { name: '古刹', desc: '废弃的古老寺庙，蕴含神秘力量', features: ['香火缭绕', '佛像庄严', '藏经阁'] },
  { name: '古墓', desc: '古代修仙者的墓葬，藏有宝藏', features: ['机关陷阱', '陪葬品', '尸气弥漫'] },
  { name: '仙境', desc: '悬浮在空中的神秘岛屿', features: ['云雾缭绕', '灵草遍地', '仙兽栖息'] },
  { name: '魔域', desc: '充满魔气的危险区域', features: ['魔气滔天', '妖魔鬼怪', '危险重重'] }
];

// 秘境等级
const secretLandLevels = [
  { level: '初级', reqRealm: '初窥门径', rewards: ['聚气丹', '基础功法', '下品灵石'] },
  { level: '中级', reqRealm: '登堂入室', rewards: ['筑基丹', '中级功法', '中品灵石'] },
  { level: '高级', reqRealm: '炉火纯青', rewards: ['金丹丹', '高级功法', '上品灵石'] },
  { level: '顶级', reqRealm: '登峰造极', rewards: ['元婴丹', '顶级功法', '极品灵石'] },
  { level: '传说', reqRealm: '传说境界', rewards: ['仙丹', '传说功法', '先天灵宝'] }
];

// 生成随机NPC
export function generateNPC() {
  // 随机生成姓名
  const prefix = npcNamePrefixes[Math.floor(Math.random() * npcNamePrefixes.length)];
  const suffix = npcNameSuffixes[Math.floor(Math.random() * npcNameSuffixes.length)];
  const title = npcTitles[Math.floor(Math.random() * npcTitles.length)];
  const name = prefix + suffix + title;
  
  // 随机生成职业
  const profession = npcProfessions[Math.floor(Math.random() * npcProfessions.length)];
  
  // 随机生成境界
  const realms = ['初窥门径', '登堂入室', '融会贯通', '炉火纯青', '登峰造极', '出神入化', '返璞归真', '天人合一', '传说境界'];
  const realm = realms[Math.floor(Math.random() * realms.length)];
  
  // 随机生成年龄
  const age = Math.floor(Math.random() * 500) + 50;
  
  // 随机生成性格
  const personalities = ['和蔼可亲', '严肃认真', '神秘莫测', '脾气暴躁', '古道热肠', '阴险狡诈', '光明磊落', '淡泊名利'];
  const personality = personalities[Math.floor(Math.random() * personalities.length)];
  
  // 随机生成描述
  const descriptions = [
    '仙风道骨，气质出尘',
    '目光如炬，气势不凡',
    '慈眉善目，和蔼可亲',
    '面无表情，高深莫测',
    '英气逼人，威风凛凛',
    '仙姿佚貌，倾国倾城',
    '鹤发童颜，精神矍铄',
    '器宇轩昂，风度翩翩'
  ];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: name,
    profession: profession.name,
    professionDesc: profession.desc,
    skills: profession.skills,
    realm: realm,
    age: age,
    personality: personality,
    description: description,
    dialogues: generateNPCDialogues(personality, profession.name)
  };
}

// 生成NPC对话
export function generateNPCDialogues(personality, profession) {
  const dialogues = {
    greeting: '',
    question: '',
    farewell: ''
  };
  
  // 根据性格生成对话
  switch (personality) {
    case '和蔼可亲':
      dialogues.greeting = `小友，${profession}不易，需持之以恒啊！`;
      dialogues.question = `小友可有什么疑惑？老夫虽不才，或许能为你解答一二。`;
      dialogues.farewell = `有缘再见，小友好自为之。`;
      break;
    case '严肃认真':
      dialogues.greeting = `修行如逆水行舟，不进则退，不可懈怠！`;
      dialogues.question = `有话直说，莫要拐弯抹角。`;
      dialogues.farewell = `勤加修炼，勿负光阴。`;
      break;
    case '神秘莫测':
      dialogues.greeting = `呵呵，有趣，真是有趣...`;
      dialogues.question = `天机不可泄露，你只需做好当下即可。`;
      dialogues.farewell = `有缘自会再见，无缘强求不得。`;
      break;
    case '脾气暴躁':
      dialogues.greeting = `小子，看什么看！没见过${profession}吗？`;
      dialogues.question = `有话快说，有屁快放！`;
      dialogues.farewell = `滚远点，别打扰老子修炼！`;
      break;
    case '古道热肠':
      dialogues.greeting = `哈哈，小兄弟，来得正好！`;
      dialogues.question = `有什么需要帮忙的尽管说，老夫义不容辞！`;
      dialogues.farewell = `路上小心，有事尽管来找我！`;
      break;
    case '阴险狡诈':
      dialogues.greeting = `哟，这不是小友吗？真是稀客啊！`;
      dialogues.question = `小友想知道什么？可是要付出代价的哦...`;
      dialogues.farewell = `慢走啊，小友，期待我们下次见面...`;
      break;
    case '光明磊落':
      dialogues.greeting = `见过小友，幸会幸会！`;
      dialogues.question = `有什么问题但说无妨，我必知无不言。`;
      dialogues.farewell = `后会有期，小友保重！`;
      break;
    case '淡泊名利':
      dialogues.greeting = `来了？坐吧。`;
      dialogues.question = `名利如过眼云烟，修行在个人。`;
      dialogues.farewell = `去吧，随心而行。`;
      break;
    default:
      dialogues.greeting = `你好。`;
      dialogues.question = `有什么事吗？`;
      dialogues.farewell = `再见。`;
  }
  
  return dialogues;
}

// 生成随机秘境
export function generateSecretLand() {
  // 随机生成类型
  const type = secretLandTypes[Math.floor(Math.random() * secretLandTypes.length)];
  
  // 随机生成等级
  const level = secretLandLevels[Math.floor(Math.random() * secretLandLevels.length)];
  
  // 随机生成名称
  const prefixes = ['青云', '紫霞', '玄虚', '飘渺', '空灵', '幻彩', '幽冥', '赤炎', '寒冰', '雷霆'];
  const suffixes = ['洞', '谷', '山', '岭', '峰', '岛', '湖', '海', '渊', '境'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const name = prefix + type.name + suffix;
  
  // 随机生成描述
  const descriptions = [
    `此秘境${type.desc}，传闻其中藏有上古遗迹。`,
    `${type.desc}，是修炼的绝佳场所。`,
    `危险与机遇并存的${type.name}，只有有缘人才能进入。`,
    `${type.desc}，据说里面有仙人留下的宝藏。`,
    `神秘的${type.name}，没有人知道它的真正来历。`
  ];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  // 随机生成危险等级
  const dangerLevels = ['低', '中', '高', '极高'];
  const dangerLevel = dangerLevels[Math.floor(Math.random() * dangerLevels.length)];
  
  // 随机生成特色
  const features = type.features.sort(() => 0.5 - Math.random()).slice(0, 2);
  
  // 随机生成守关BOSS
  const boss = generateNPC();
  
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: name,
    type: type.name,
    level: level.level,
    reqRealm: level.reqRealm,
    description: description,
    dangerLevel: dangerLevel,
    features: features,
    rewards: level.rewards,
    boss: boss,
    entranceCondition: generateEntranceCondition(level.level)
  };
}

// 生成秘境进入条件
export function generateEntranceCondition(level) {
  const conditions = {
    '初级': [
      '需要携带聚气丹×1',
      '需要修为达到100点',
      '需要通过简单的考验',
      '需要缴纳100灵石'
    ],
    '中级': [
      '需要携带筑基丹×1',
      '需要修为达到1000点',
      '需要通过中等难度的考验',
      '需要缴纳500灵石',
      '需要掌握基础御物术'
    ],
    '高级': [
      '需要携带金丹丹×1',
      '需要修为达到5000点',
      '需要通过高难度的考验',
      '需要缴纳1000灵石',
      '需要掌握御剑飞行'
    ],
    '顶级': [
      '需要携带元婴丹×1',
      '需要修为达到10000点',
      '需要通过极高难度的考验',
      '需要缴纳5000灵石',
      '需要掌握瞬移之术'
    ],
    '传说': [
      '需要携带仙丹×1',
      '需要修为达到50000点',
      '需要通过传说级别的考验',
      '需要缴纳10000灵石',
      '需要得到仙人的认可'
    ]
  };
  
  const levelConditions = conditions[level];
  const selectedConditions = [];
  
  // 随机选择2-3个条件
  const conditionCount = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < conditionCount; i++) {
    const randomIndex = Math.floor(Math.random() * levelConditions.length);
    if (!selectedConditions.includes(levelConditions[randomIndex])) {
      selectedConditions.push(levelConditions[randomIndex]);
    }
  }
  
  return selectedConditions;
}

// 批量生成NPC
export function generateNPCs(count = 5) {
  const npcs = [];
  for (let i = 0; i < count; i++) {
    npcs.push(generateNPC());
  }
  return npcs;
}

// 批量生成秘境
export function generateSecretLands(count = 3) {
  const secretLands = [];
  for (let i = 0; i < count; i++) {
    secretLands.push(generateSecretLand());
  }
  return secretLands;
}