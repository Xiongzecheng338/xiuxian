<script setup>
import { ref } from 'vue'

const newsData = [
  { id: 1, title: '天骄榜更新：年轻一代崛起', category: '热门', date: '2024-03-15', summary: '近日，天骄榜迎来重大更新，一批年轻的修仙天才脱颖而出...', hot: true },
  { id: 2, title: '秘境探索：上古遗迹现世', category: '探险', date: '2024-03-14', summary: '昆仑山脉深处发现上古遗迹，据传藏有仙帝传承...', hot: false },
  { id: 3, title: '丹药革新：新型灵丹问世', category: '技术', date: '2024-03-13', summary: '丹盟成功研制出九转还魂丹，可起死回生...', hot: false },
  { id: 4, title: '宗门大战：六大派联手', category: '战争', date: '2024-03-12', summary: '魔道势力抬头，正道六大派联手讨伐...', hot: true },
  { id: 5, title: '灵根觉醒：天生异象', category: '奇闻', date: '2024-03-11', summary: '东海之滨天生异象，有孩童觉醒极品灵根...', hot: false },
]

const categoryFilter = ref('全部')

const categories = ['全部', '热门', '探险', '技术', '战争', '奇闻']

const filteredNews = ref(newsData)

const filterNews = (category) => {
  categoryFilter.value = category
  if (category === '全部') {
    filteredNews.value = newsData
  } else {
    filteredNews.value = newsData.filter(item => item.category === category)
  }
}
</script>

<template>
  <div class="news-page max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gold mb-4">修仙资讯</h1>
    <p class="text-center text-paper/60 mb-8">掌握修仙界最新动态</p>

    <!-- 分类筛选 -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterNews(category)"
        :class="[
          'px-4 py-2 rounded-full text-sm transition-all duration-300',
          categoryFilter === category
            ? 'bg-gold text-ink font-bold'
            : 'bg-white/5 text-paper/70 hover:bg-white/10'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- 资讯列表 -->
    <div class="space-y-4">
      <div
        v-for="news in filteredNews"
        :key="news.id"
        class="news-card glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span :class="[
                'text-xs px-2 py-1 rounded',
                news.hot ? 'bg-vermilion/20 text-vermilion' : 'bg-azure/20 text-azure'
              ]">
                {{ news.hot ? '🔥' : '' }} {{ news.category }}
              </span>
              <span class="text-xs text-paper/50">{{ news.date }}</span>
            </div>
            <h3 class="text-xl font-bold text-paper mb-2">{{ news.title }}</h3>
            <p class="text-sm text-paper/60">{{ news.summary }}</p>
          </div>
          <div class="hidden sm:block text-3xl opacity-30">
            📰
          </div>
        </div>
      </div>
    </div>

    <!-- 没有更多 -->
    <div class="text-center mt-8 text-paper/40">
      <p>—— 修行之路，且行且珍惜 ——</p>
    </div>
  </div>
</template>

<style scoped>
.news-page {
  padding-bottom: 100px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 168, 83, 0.15);
}

.news-card:hover {
  border-color: rgba(212, 168, 83, 0.3);
}
</style>
