<script setup>
import { ref } from 'vue'

const healthData = {
  organs: [
    { name: '肺', element: '金', color: 'bronze', realm: '初窥门径', desc: '肺主气，司呼吸', practice: '每日清晨面向东方深呼吸' },
    { name: '肾', element: '水', color: 'jade', realm: '登堂入室', desc: '肾主水，藏精', practice: '节制房事，按摩肾俞穴' },
    { name: '心', element: '火', color: 'vermilion', realm: '炉火纯青', desc: '心主火，藏神', practice: '静心养神，意守心窍' },
    { name: '肝', element: '木', color: 'spirit', realm: '出神入化', desc: '肝主木，藏魂', practice: '保持情绪舒畅，丑时熟睡' },
    { name: '脾', element: '土', color: 'gold', realm: '登峰造极', desc: '脾主土，藏意', practice: '饮食有节，辰时进食' }
  ],
  tips: [
    { title: '晨起调息', desc: '每日清晨，面向东方，静坐呼吸，可吸纳天地灵气', icon: '🌅' },
    { title: '午时养心', desc: '正午时分，阳光最盛，静心养神，效果倍增', icon: '☀️' },
    { title: '子时入定', desc: '深夜11点至1点，是修炼的黄金时段', icon: '🌙' },
    { title: '饮食有节', desc: '修仙期间，宜清淡饮食，忌荤腥油腻', icon: '🍵' },
    { title: '起居有常', desc: '日出而作，日落而息，顺应天时', icon: '⏰' },
    { title: '情志调和', desc: '保持心情愉悦，忌大喜大怒', icon: '😊' }
  ]
}

const getColorClass = (color) => {
  const colors = {
    bronze: 'border-l-amber-600',
    jade: 'border-l-emerald-600',
    vermilion: 'border-l-red-600',
    spirit: 'border-l-teal-400',
    gold: 'border-l-yellow-500'
  }
  return colors[color] || 'border-l-gray-500'
}
</script>

<template>
  <div class="health-page max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-4">养生之道</h1>
    <p class="text-center text-paper/60 mb-8">五行调和，阴阳平衡，内外兼修</p>

    <!-- 五脏对应 -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gold mb-6">五脏修炼</h2>
      <div class="grid md:grid-cols-5 gap-4">
        <div
          v-for="organ in healthData.organs"
          :key="organ.name"
          class="glass-card rounded-xl p-4 border-l-4 transition-all duration-300 hover:scale-105"
          :class="getColorClass(organ.color)"
        >
          <div class="text-center">
            <div class="text-3xl mb-2">{{ organ.element === '金' ? '🫁' : organ.element === '水' ? '🫘' : organ.element === '火' ? '❤️' : organ.element === '木' ? '🫁' : '🫃' }}</div>
            <h3 class="text-lg font-bold text-paper">{{ organ.name }}</h3>
            <p class="text-xs text-paper/50 mb-2">{{ organ.realm }}</p>
            <p class="text-sm text-paper/60 mb-2">{{ organ.desc }}</p>
            <p class="text-xs text-jade">📝 {{ organ.practice }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 养生之道 -->
    <section>
      <h2 class="text-2xl font-bold text-gold mb-6">修炼要诀</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="tip in healthData.tips"
          :key="tip.title"
          class="glass-card rounded-xl p-5 flex items-start gap-4 transition-all duration-300 hover:bg-white/5"
        >
          <div class="text-3xl">{{ tip.icon }}</div>
          <div>
            <h3 class="font-bold text-paper mb-1">{{ tip.title }}</h3>
            <p class="text-sm text-paper/60">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.health-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}
</style>
