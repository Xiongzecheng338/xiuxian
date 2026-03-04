// 用户数据管理模块

// 初始化用户数据
export let userData = {
  realm: 'chu kui', // 当前境界
  cultivation: 0, // 修为值
  practiceHours: 0, // 修炼时长
  breakthroughs: 0, // 突破次数
  sect: null, // 门派
  artifacts: [], // 法宝
  adventures: [], // 奇遇记录
  chaptersRead: 0 // 已阅读章节数
};

// 从本地存储加载用户数据
export function initUserData() {
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
        adventures: [],
        chaptersRead: 0
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
      adventures: [],
      chaptersRead: 0
    };
  }
}

// 保存用户数据到本地存储
export function saveUserData() {
  try {
    localStorage.setItem('xiuxianUserData', JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
}

// 增加修为值
export function addCultivation(amount) {
  userData.cultivation += amount;
  saveUserData();
}

// 增加已阅读章节数
export function addChapterRead() {
  userData.chaptersRead++;
  saveUserData();
}

// 选择门派
export function chooseSect(sectId, sectData) {
  userData.sect = sectId;
  saveUserData();
  return sectData[sectId];
}

// 增加修炼时长
export function addPracticeHours(hours) {
  userData.practiceHours += hours;
  saveUserData();
}

// 增加突破次数
export function addBreakthrough() {
  userData.breakthroughs++;
  saveUserData();
}

// 添加奇遇记录
export function addAdventure(adventure) {
  userData.adventures.push(adventure);
  saveUserData();
}

// 添加法宝
export function addArtifact(artifactId) {
  if (!userData.artifacts.includes(artifactId)) {
    userData.artifacts.push(artifactId);
    saveUserData();
  }
}

// 获取用户数据
export function getUserData() {
  return userData;
}

// 更新用户数据
export function updateUserData(data) {
  userData = { ...userData, ...data };
  saveUserData();
}